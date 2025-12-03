import { createAccountScherma } from "../validators/accounts.js";
import { createAccount, getAccounts } from "./accounts.services.js";
import {generateUniqueNumber} from "../utils/accountNumber.js";
import { BankAccount } from "../models/bankaccount.js";


export const createAccountController = async (req, res) => {
    try {

        const loggedInUser = req.user;

        if(!loggedInUser) return res.status(401).json({error: `Unauthorized! Kindly login to access this endpoint`});

        const {error, value} = createAccountScherma.validate(req.body);

        if(error) return res.status(400).json({error: error.message});

        let {accountType, currency, userID, accountNumber} = value;

        value.accountNumber = await generateUniqueNumber(10, BankAccount);

        value.userID = loggedInUser.id;

        const account = await createAccount(value);

        return res.status(201).json({account});
        
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