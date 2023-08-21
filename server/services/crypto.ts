import crypto from "crypto-js";
import { SECRET_KEY, SECRET_KEY_FILES_256BIT } from '../getEnv';


interface Crypto {
    encrypt(toEncrypt: string): Promise<string>;
    decrypt(toDecrypt: string): Promise<string>;
    decryptObj(encryptedObj: string): Promise<any>;
    encryptObj(obj: any): Promise<string>;
}

class CryptoService implements Crypto {
    private encryption_key: string;
    private algorithm: string;
    constructor(){
        this.encryption_key = SECRET_KEY
        this.algorithm = 'aes-256-ctr'
    }

    async encrypt (toEncrypt : string): Promise<string> {

        const key = this.encryption_key;

        let encrypted = crypto.AES.encrypt(toEncrypt, key.toString().trim());

        return encrypted.toString()
    }

    async decrypt (toDecrypt: string) : Promise<string> {

        const key = this.encryption_key;

        let decrypted = crypto.AES.decrypt(toDecrypt, key.toString().trim());

        return decrypted.toString(crypto.enc.Utf8)
    }

    async decryptObj(encryptedObj : string): Promise<Object> {
        let decrypted = await this.decrypt(encryptedObj)
        const obj = JSON.parse(decrypted)
        return obj
    }

    async encryptObj(obj : Object): Promise<string> {
        let encode = JSON.stringify(obj)
        const secret = await this.encrypt(encode)
        return secret
    }
}

export default CryptoService;