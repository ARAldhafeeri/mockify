export interface IPassword {
  createPassword(string : string) : Promise<{hashedPassword: string, salt: string}>;
  createHashedPassword(password : string, salt : string) : Promise<string>;
  verifyPassword(password: string, hashedPassword: string, salt: string): Promise<boolean>;
}


export interface ICryptoService {
  encrypt(toEncrypt: string): Promise<string>;
  decrypt(toDecrypt: string): Promise<string>;
  decryptObj(encryptedObj: string): Promise<any>;
  encryptObj(obj: any): Promise<string>;
  generateAPIKey(): Promise<string>;
}

export interface IToken {
  secret : string,
  iat: number,
  exp: number,
  id: string
}

export interface ITokenPayload {
  id: string,
  role: string
}