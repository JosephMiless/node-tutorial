import { findAccount, recordTransaction, deposit } from "./deposit.services.js";
import { createDepositSchema } from "../validators/deposits.js";

export const createDepositController = async (req, res) => {

    try {

        const loggedInUser = req.user;

        if(!loggedInUser) return res.status(401).json({error: `Unauthorized! Kindly login to access this endpoint.`});

        const {error, value} = createDepositSchema.validate(req.body);

        if(error) return res.status(400).json({error: error.message});

        let {accountNumber, amount, balance, destinationAccount, status, category} = value;

        if(typeof(value.amount) === 'string') return res.status(400).json({error: `Enter a valid amount.`});

        const accountExists = await findAccount({accountNumber});

        if(!accountExists) return res.status(404).json({errror: `Account not found with account number: ${accountNumber}. Kindly re-check and try again.`});
      
        if(loggedInUser.id !== accountExists.userID) return res.status(403).json({error: `You do not have access to perform this transaction.`});
        
        value.balance = parseFloat(accountExists.balance) + parseFloat(value.amount);

        value.destinationAccount = accountExists.id;

        value.status = 'success';

        value.category = 'deposit';

        await deposit({balance: value.balance}, {accountNumber});

        const transaction = await recordTransaction(value);

        return res.status(201).json({message: `Transaction Successful!`, transaction});
        
    } catch (error) {

        console.error(`Error creating deposit. Error: ${error.message}`);
        
        return res.status(500).json({error: `Internal Server Error.`});
        
    }
};