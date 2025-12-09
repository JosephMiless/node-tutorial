import dotenv from 'dotenv';
import { config } from './env.js';
dotenv.config();

export default {
    development: {
        username: config.db.user,
        password: config.db.pass,
        database: config.db.name,
        host: config.db.host,
        port: config.db.port,
        dialect: "postgres",
    },
    production: {
        use_env_variable: config.databaseURI,
        dialect: "postgres",
        dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
}
    // test: {
    //     username: config.db.user,
    //     password: config.db.pass,
    //     database: config.db.name,
    //     host: config.db.host,
    //     port: config.db.port,
    //     dialect: "postgres",
    // },
};