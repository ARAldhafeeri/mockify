'use strict'
import assert from "assert";
import crypto from "crypto";
import { IPassword } from "../types/Auth"

class PasswordService implements IPassword {

    /**
     * 
     * one-way password hashing and verifiction only user know its password
     */
    async createPassword(string : string) : Promise<{hashedPassword: string, salt: string}> {

        var salt = crypto.randomBytes(16).toString('hex');

        const hmac = crypto.createHmac('sha256', salt);

        hmac.update(string);
        const hashedPassword = hmac.digest('hex');

        return {hashedPassword, salt}
    }

    async createHashedPassword(password : string, salt : string) : Promise<string> {
        const hmac = crypto.createHmac('sha256', salt);

        hmac.update(password);
        const hashedPassword = hmac.digest('hex');

        return hashedPassword
    }

    async verifyPassword(password: string, hashedPassword: string, salt: string): Promise<boolean> {

        if (typeof password !== 'string') return false;
        if (typeof hashedPassword !== 'string') return false;


        const hmac = crypto.createHmac('sha256', salt);

        hmac.update(password);
        const passwordHash = hmac.digest('hex');

        if (passwordHash !== hashedPassword) return false;

        return true;

    }
}

export default PasswordService;