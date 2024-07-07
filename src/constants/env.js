import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT;
export const HOST = process.env.HOST;
export const SERVER_HOST = process.env.SERVER_HOST;
export const CLIENT_VERSION = process.env.CLIENT_VERSION;

export const DB1_NAME = process.env.DB1_NAME || 'database1';
export const DB1_USER = process.env.DB1_USER || 'user1';
export const DB1_PASSWORD = process.env.DB1_PASSWORD || 'password1';
export const DB1_HOST = process.env.DB1_HOST || 'localhost';
export const DB1_PORT = process.env.DB1_PORT || 3306;
