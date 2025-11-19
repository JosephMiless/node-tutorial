import { sequelize } from "../config/sequelize.js";
import { BankAccount } from "./bankaccount.js";
import { Transaction } from "./transaction.js";
import { User } from "./user.js";

// Associations

// One user can have many bank accounts
User.hasMany(BankAccount, {
  foreignKey: "userID",
  as: "accounts"
});

BankAccount.belongsTo(User, {
  foreignKey: "userID",
  as: "owner"
});

BankAccount.hasMany(Transaction, {
  foreignKey: "sourceAcount",
  as: "outgoingTransactions"
});

BankAccount.hasMany(Transaction, {
  foreignKey: "destinationAcount",
  as: "incomingTransactions"
});

Transaction.belongsTo(BankAccount, {
  foreignKey: "sourceAccount",
  as: "sender"
});

Transaction.belongsTo(BankAccount, {
  foreignKey: "destinationAccount",
  as: "receiver"
});

export const initDB = async () => {
  try {

    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // await sequelize.sync({ alter: true });
    // console.log("✅ Database synced successfully!");
    
  } catch (error) {
    console.error(`Database conneection error ${error}`);
  }
};

export {User, BankAccount};