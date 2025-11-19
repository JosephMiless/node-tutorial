import { Sequelize } from "sequelize";
import { config } from "./env.js";

export const sequelize = new Sequelize(config.db.name, config.db.user, config.db.pass, {
  host: config.db.host,
  dialect: 'postgres'
//   logging: false
});