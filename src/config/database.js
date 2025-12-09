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
    // test: {
    //     username: config.db.user,
    //     password: config.db.pass,
    //     database: config.db.name,
    //     host: config.db.host,
    //     port: config.db.port,
    //     dialect: "postgres",
    // },
    // production: {
    //     username: config.db.user,
    //     password: config.db.pass,
    //     database: config.db.name,
    //     host: config.db.host,
    //     port: config.db.port,
    //     dialect: "postgres",
    // }
};