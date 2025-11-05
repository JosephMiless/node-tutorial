import dotenv from 'dotenv';

dotenv.config();

export const config = {
    port: process.env.PORT,
    access: process.env.ACCESS_SECRET
};