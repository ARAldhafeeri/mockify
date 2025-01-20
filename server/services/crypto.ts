import crypto from "crypto-js";
import { SECRET_KEY, SECRET_KEY_FILES_256BIT } from "../getEnv";
import { ICryptoService } from "../entities/auth";

class CryptoService implements ICryptoService {
  private encryption_key: string;
  private algorithm: string;
  constructor() {
    this.encryption_key = SECRET_KEY;
    this.algorithm = "aes-256-ctr";
  }

  async encrypt(toEncrypt: string): Promise<string> {
    const key = this.encryption_key;

    let encrypted = crypto.AES.encrypt(toEncrypt, key.toString().trim());

    return encrypted.toString();
  }

  async decrypt(toDecrypt: string): Promise<string> {
    const key = this.encryption_key;

    let decrypted = crypto.AES.decrypt(toDecrypt, key.toString().trim());

    return decrypted.toString(crypto.enc.Utf8);
  }

  async decryptObj(encryptedObj: string): Promise<Object> {
    let decrypted = await this.decrypt(encryptedObj);
    const obj = JSON.parse(decrypted);
    return obj;
  }

  async encryptObj(obj: Object): Promise<string> {
    let encode = JSON.stringify(obj);
    const secret = await this.encrypt(encode);
    return secret;
  }

  async generateAPIKey(): Promise<string> {
    const key = SECRET_KEY;
    const iv = crypto.lib.WordArray.random(16);
    const salt = crypto.lib.WordArray.random(128 / 8);
    const iterations = 1000;
    const hash = crypto.PBKDF2(key, salt, {
      keySize: 128 / 32,
      iterations: iterations,
    });
    const encrypted = crypto.AES.encrypt(key, hash, { iv: iv });
    const transitmessage =
      salt.toString() + iv.toString() + encrypted.toString();
    return transitmessage;
  }

  async verifyAPIKey(key: string): Promise<boolean> {
    const key1 = SECRET_KEY;
    const iv = crypto.lib.WordArray.random(16);
    const salt = crypto.lib.WordArray.random(128 / 8);
    const iterations = 1000;
    const hash = crypto.PBKDF2(key1, salt, {
      keySize: 128 / 32,
      iterations: iterations,
    });
    const encrypted = crypto.AES.encrypt(key1, hash, { iv: iv });
    const transitmessage =
      salt.toString() + iv.toString() + encrypted.toString();
    return transitmessage === key;
  }
}

export default CryptoService;
