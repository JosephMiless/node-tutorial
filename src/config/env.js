import dotenv from 'dotenv';

dotenv.config();

export const config = {
    port: process.env.PORT,
    access: process.env.ACCESS_SECRET,
    apiKey:process.env.API_KEY,
    db: {
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        name: process.env.DB_NAME,
        pass: process.env.DB_PASSWORD,
        host: process.env.DB_HOST
    }
};