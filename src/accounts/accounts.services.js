import { BankAccount } from "../models/bankaccount.js"

export const findAccount = async (attritbute) => {
    return await BankAccount.findOne({where: attritbute});
};

export const createAccount = async (data) => {
    return await BankAccount.create(data);
};

export const getAccounts = async (attritbute) => {
    return await BankAccount.findAll({where: attritbute});
};