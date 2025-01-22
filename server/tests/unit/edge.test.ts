import { edgeService } from "../../services";

describe("Edge run sandbox services ", () => {
  /**
   * only testing the sandbox services
   * curd methods are tested in e2e tests
   * going to add more tests for the sandbox services endpoints in e2e tests
   */
  test("edgeService.runFunctionInContext simple test", async () => {
    let code = "data = 1+1";
    const data = await edgeService.runFunctionInContext(code);
    expect(data).toEqual(2);
  });

  test("edgeService.runFunctionInContext with context faker", async () => {
    let code = "data = faker.person.firstName('female')";
    const data = await edgeService.runFunctionInContext(code);
    expect(data).not.toEqual(null);
  });
});
