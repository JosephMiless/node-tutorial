import { createAccountScherma } from "../validators/accounts.js";
import { createAccount, findAccount, getAccounts, getTransactions } from "./accounts.services.js";
import {generateUniqueNumber} from "../utils/accountNumber.js";
import { BankAccount } from "../models/bankaccount.js";
import {hashPassword} from "../utils/bcrypt.js";
import { deposit } from "../deposit/deposit.services.js";


export const createAccountController = async (req, res) => {
    try {

        const loggedInUser = req.user;

        if(!loggedInUser) return res.status(401).json({error: `Unauthorized! Kindly login to access this endpoint`});

        const {error, value} = createAccountScherma.validate(req.body);

        if(error) return res.status(400).json({error: error.message});

        let {accountType, currency, userID, accountNumber, pin} = value;

        if(!['USD','NGN', 'EUR'].includes(currency)) return res.status(400).json({error: `Enter one of USD, or NGN`});

        value.accountNumber = await generateUniqueNumber(10, BankAccount);

        value.userID = loggedInUser.id;

        value.pin = await hashPassword(pin);

        const account = await createAccount(value);

        return res.status(201).json({message:`Account created successfully! 🎉`,account});
        
    } catch (error) {

        console.error(`Error creating bank account. Error: ${error}`);

        return res.status(500).json({error: `Internal Server Error`});
        
    }
};

export const viewAccountsController = async (req, res) => {
    try {

        const loggedInUser = req.user;

        if(!loggedInUser) return res.status(401).json({error: `Unauthorized! Kindly login to access this endpoint`});

        const accounts = await getAccounts({userID: loggedInUser.id});

        if(!accounts) return res.status(404).json({error: `There are currently no accounts to display`});

        return res.status(200).json({accounts});
        
    } catch (error) {

        console.error(`Error viewing accounts. Error: ${error}`);

        return res.status(500).json({error: `Internal Server Error.`});
        
    }
};

export const updatepin = async (req, res) => {
    try {

        const loggedInUser = req.user;

        if(!loggedInUser) return res.status(401).json({error: `Unauthorized!`});

        let {pin, accountNumber} = req.body;

        if(!pin || pin.length < 4) return res.status(400).json({error: `4 digits pin is required`});
        if(!accountNumber) return res.status(400).json({error: `accountNumber is required`});

        const accountExists = await findAccount({accountNumber});

        if(!accountExists) return res.status(404).json({error: `No account foundd with number: ${accountNumber}`});

        if(accountExists.userID !== loggedInUser.id) return res.status*(403).json({error: `Unauthorized!!!`});

        pin = await hashPassword(pin);

        await deposit({pin}, {accountNumber});

        return res.status(200).json({message: `Pin updatd successfully!`});
        
    } catch (error) {

        console.error(`Error updating pin. Error: ${error}`);

        return res.status(500).json({error: `Internal Server Error.`});
        
    }
};

export const getTransactionsController = async (req, res) => {
    try {

        const loggedInUser = req.user;

        if(!loggedInUser) return res.status(401).json({error: `Unauthorized!`});        

        let accountID = req.params.id;

        if(!accountID) return res.status(400).json({error: `accountID is required`});

        const accountExists = await findAccount({id: accountID});
        
        if(!accountExists) return res.status(404).json({
            error: `Account not found with id: ${accountID}. Kindly check the number and try again.`
        });

        if(accountExists.userID !== loggedInUser.id) return res.status(403).json({error: `You are not authorized to perfom this transaction; na tiff you be!`});

        const transactions = await getTransactions(accountID);

        if(transactions.length === 0) return res.status(404).json({message: `No transdaction record found for this account.`});

        return res.status(200).json({transactions});
        
    } catch (error) {

        console.error(`Error getting transactions. Error: ${error}`);

        return res.status(500).json({error: `Internal Server Error.`});
        
    }
};