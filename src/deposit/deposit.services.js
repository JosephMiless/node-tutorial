import { BankAccount } from "../models/bankaccount.js"
import { Transaction } from "../models/transaction.js";


export const deposit = async (balance, accountNumber) => {
    return await BankAccount.update(balance, {where: accountNumber});
};

export const findAccount = async (attribute) => {
    return await BankAccount.findOne({where: attribute});
};

export const recordTransaction = async (data) => {
    return await Transaction.create(data);
};