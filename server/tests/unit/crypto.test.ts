import { cryptoService } from "../../services";

describe("Crypto", () => {
  test("should encrypt and decrypt", async () => {
    const encrypted = await cryptoService.encrypt("test");
    const decrypted = await cryptoService.decrypt(encrypted);
    expect(decrypted).toEqual("test");
  });

  test("should encrypt and decrypt object", async () => {
    const obj = { test: "test" };
    const encrypted = await cryptoService.encryptObj(obj);
    const decrypted = await cryptoService.decryptObj(encrypted);
    expect(decrypted).toEqual(obj);
  });
});
