import { Op } from "sequelize";
import { BankAccount } from "../models/bankaccount.js"
import { Transaction } from "../models/transaction.js";

export const findAccount = async (attritbute) => {
    return await BankAccount.findOne({where: attritbute});
};

export const createAccount = async (data, options = {}) => {
    return await BankAccount.create(data, options);
};

export const getAccounts = async (attritbute) => {
    return await BankAccount.findAll({where: attritbute});
};

export const getTransactions = async (accountID) => {
    return await Transaction.findAll({
        where: {
            [Op.or]: [{sourceAccount: accountID}, {destinationAccount: accountID}]
        }
    })
};