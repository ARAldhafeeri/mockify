import CryptoService from 'services/crypto';

describe('Crypto', () => {
  test('should encrypt and decrypt', async () => {

    const crypto = new CryptoService();
    const encrypted = await crypto.encrypt('test');
    const decrypted = await crypto.decrypt(encrypted);
    expect(decrypted).toEqual('test');

  });

  test('should encrypt and decrypt object', async () => {
      
      const crypto = new CryptoService();
      const obj = {test: 'test'};
      const encrypted = await crypto.encryptObj(obj);
      const decrypted = await crypto.decryptObj(encrypted);
      expect(decrypted).toEqual(obj);
  
    });
});