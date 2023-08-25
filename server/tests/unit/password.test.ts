import PasswordService from "../../services/password";

describe('Password', () => {

  test('should create password', async () => {
      
      const password = new PasswordService();
      const {hashedPassword, salt} = await password.createPassword('test');
      expect(hashedPassword).toBeDefined();
      expect(salt).toBeDefined();
  
    });

  test('should create hashed password', async () => {

    const password = new PasswordService();
    const {hashedPassword, salt} = await password.createPassword('test');
    const hashed = await password.createHashedPassword('test', salt);
    expect(hashed).toEqual(hashedPassword);

  });

  test('should verify password', async () => {
      
      const password = new PasswordService();
      const {hashedPassword, salt} = await password.createPassword('test');
      const hashed = await password.createHashedPassword('test', salt);
      const verified = await password.verifyPassword('test', hashed, salt);
      expect(verified).toEqual(true);
  
    });


});
