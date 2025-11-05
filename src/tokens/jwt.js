import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';

export const aToken = (payload) => {
    return jwt.sign(payload, config.access, {expiresIn: '5s'});
};