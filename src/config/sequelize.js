import { Sequelize } from "sequelize";
import { config } from "./env.js";

// export const sequelize = new Sequelize(config.db.name, config.db.user, config.db.pass, {
//   host: config.db.host,
//   dialect: 'postgres'
// //   logging: false
// });

const isProduction = config.nodeEnv === 'production';
// const isLocalDevelopment = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV;

export const sequelize = new Sequelize(config.databaseURI, {
    logging: false,
    dialect: 'postgres',
    dialectOptions: {
        ssl: isProduction ? {
            require: true,
            rejectUnauthorized: false
        } : false // Disable SSL for local development
    }
});