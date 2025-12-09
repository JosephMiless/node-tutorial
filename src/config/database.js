import { config } from './env.js';

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
        use_env_variable: "DATABASE_URL",
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