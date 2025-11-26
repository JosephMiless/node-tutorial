import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/sequelize.js";

export class BankAccount extends Model {}

BankAccount.init(
  {
    id: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    userID: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {model: "Users", key: "id"}
      },
      bankName: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Horizon'
      }, 
      accountNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }, 
      accountType: {
        type: DataTypes.ENUM('savings', 'checking'),
        allowNull: false
      },
      balance: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0.00
      }, 
      currency: {
        type: DataTypes.STRING,
        defaultValue: 'USD'
      }
  },
  {
    sequelize,
    modelName: "bankAccount"
  }
);