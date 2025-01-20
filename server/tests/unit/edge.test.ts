import EdgeService from "../../services/edge";
import ResourceService from "../../services/resource";

const edgeService = new EdgeService();

const resService = new ResourceService();

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
