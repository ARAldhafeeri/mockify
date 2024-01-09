import { config } from 'dotenv';

config();

export const   SECRET_KEY =  `${process.env.SECRET_KEY}`;

export const SECRET_KEY_FILES_256BIT = `${process.env.SECRET_KEY_FILES_256BIT}`;

export const DATABASE_URL = `${process.env.DATABASE_URL}`;

export const SUPER_ADMIN_USERNAME = `${process.env.SUPER_ADMIN_USERNAME}`;

export const SUPER_ADMIN_PSWD = `${process.env.SUPER_ADMIN_PSWD}`;

export const SUPER_ADMIN_EMAIL = `${process.env.SUPER_ADMIN_EMAIL}`;

export const JWT_EXPIRES_IN = `${process.env.JWT_EXPIRES_IN}`;

export const domain = `${process.env.DOMAIN}`

export const ADMIN_USERNAME = `${process.env.ADMIN_USERNAME}`

export const ADMIN_PSWD = `${process.env.ADMIN_PSWD}`