import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/sequelize.js";


export class Transaction extends Model {};

Transaction.init(
  {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4
      },
      sourceAccount: {
        type: DataTypes.STRING,
        references: {model: "bankAccounts", key: 'id'},
        onDelete: "SET NULL",
        onUpdate: "CASCADE"
      },
      destinationAccount: {
        type: DataTypes.STRING,
        references: {model: "bankAccounts", key: 'id'},
        onDelete: "SET NULL",
        onUpdate: "CASCADE"
      },
      recipientEmail: {
        type: DataTypes.STRING
      },
      note: {
        type: DataTypes.STRING
      }, amount: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      status: {
        allowNull: false,
        type: DataTypes.ENUM("processing", "success", "failed"),
        defaultValue: "processing"
      }, 
      category: {
        type: DataTypes.ENUM("deposit", "withdrawal", "transfer"),
        allowNull: false
      }
  },
  {
    sequelize,
    modelName: 'Transaction'
  }
)