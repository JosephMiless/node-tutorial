import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/sequelize.js";

export class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    modelName: "User"
  }
);