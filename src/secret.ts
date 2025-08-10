import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 5000;
export const DEFAULT_PW_USER = process.env.DEFAULT_PW_USER || 'Pass1234';
