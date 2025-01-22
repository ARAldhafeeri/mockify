import { passwordService } from "../../services";

passwordService;
describe("Password", () => {
  test("should create password", async () => {
    const { hashedPassword, salt } = await passwordService.createPassword(
      "test"
    );
    expect(hashedPassword).toBeDefined();
    expect(salt).toBeDefined();
  });

  test("should create hashed password", async () => {
    const { hashedPassword, salt } = await passwordService.createPassword(
      "test"
    );
    const hashed = await passwordService.createHashedPassword("test", salt);
    expect(hashed).toEqual(hashedPassword);
  });

  test("should verify password", async () => {
    const { hashedPassword, salt } = await passwordService.createPassword(
      "test"
    );
    const hashed = await passwordService.createHashedPassword("test", salt);
    const verified = await passwordService.verifyPassword("test", hashed, salt);
    expect(verified).toEqual(true);
  });
});
