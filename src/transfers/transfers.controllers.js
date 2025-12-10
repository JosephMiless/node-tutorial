import { deposit, findAccount, recordTransaction } from "../deposit/deposit.services.js";
import { transferSchema } from "../validators/transfrers.js";
import {comparePassword} from "../utils/bcrypt.js";
import { convertCurrency } from "../utils/currency.converter.js";


export const transferController = async (req, res) => {
    try {

        const loggedInUser = req.user;

        if(!loggedInUser) return res.status(401).json({error: `Unauthorized! Kindly login to access this endpoint.`});

        const {error, value} = transferSchema.validate(req.body);

        if(error) return res.status(400).json({error: error.message});

        let {sourceAccount, destinationAccount, note, category, status, amount, pin} = value;

        const senderAccount = await findAccount({accountNumber: sourceAccount});

        if(!senderAccount) return res.status(404).json({
            error: `Sender account not found with number: ${sourceAccount}. Kindly check the number and try again.`
        });

        const receiverAccount = await findAccount({accountNumber: destinationAccount});

        if(!receiverAccount) return res.status(404).json({
            error: `Destination account not found with number: ${destinationAccount}. Kindly check the number and try again.`
        });

        if(senderAccount.userID !== loggedInUser.id) return res.status(403).json({error: `You are not authorized to perfom this transaction; na tiff you be!`});

        if(typeof(amount) === 'string' || amount < 0) return res.status(400).json({error: `Invalid amount! Enter a numeric amount`});

        const isMAtch = await comparePassword(pin, senderAccount.pin);

        if(!isMAtch) return res.status(400).json({error: `Incorrect Pin`});

        if( parseFloat(senderAccount.balance) < parseFloat(amount)) return res.status(404).json({error: `Insufficent funds. Current balance: ${senderAccount.balance}`});

        const senderBalance = parseFloat(senderAccount.balance) - parseFloat(amount);

        // perform mutiple currency transaction

        if(senderAccount.currency !== receiverAccount.currency) {

            amount = await convertCurrency(senderAccount.currency, receiverAccount.currency, amount);

            if(!amount) return res.status(500).json({error:`Error converting currency`});

        };

        const receiverBalance = parseFloat(receiverAccount.balance) + parseFloat(amount);

        await deposit({balance: senderBalance}, {accountNumber: sourceAccount});

        await deposit({balance: receiverBalance}, {accountNumber: destinationAccount});

        value.category = 'transfer';
        value.status = 'success';
        value.sourceAccount = senderAccount.id;
        value.destinationAccount = receiverAccount.id;

        const transaction = await recordTransaction(value);

        return res.status(201).json({message: `Transaction successful! 🎉`, transaction});
        
    } catch (error) {

        console.error(`Error creating transfer. Error: ${error.message}`);
        
        return res.status(500).json({error: `Internal Server Error.`});
        
    }
};