import { DATABASE_URL } from "../../getEnv";
import mongoose from "mongoose";
import { endpointService, resourceService } from "../../services";

describe("EndpointService", () => {
  beforeEach(async () => {
    await mongoose.connect(DATABASE_URL);
  });

  test("should create curd endpoints for resource", async () => {
    const res = await resourceService.findOne({ name: "default" });

    const endpoint = await endpointService.create(res);
    expect(endpoint).toBeDefined();

    // generic endpoints
    let getx = endpoint.find((e: any) => e.method === "GET");
    let postx = endpoint.find((e: any) => e.method === "POST");
    let putx = endpoint.find((e: any) => e.method === "PUT");
    let deletex = endpoint.find((e: any) => e.method === "DELETE");

    // get search, filter, pagination
    let searchx = endpoint.find(
      (e: any) => e.method === "GET" && e.url.includes("search")
    );
    let filterx = endpoint.find(
      (e: any) => e.method === "GET" && e.url.includes("filter")
    );
    let paginatex = endpoint.find(
      (e: any) => e.method === "GET" && e.url.includes("paginate")
    );

    // let validation put and post
    let postValidate = endpoint.filter(
      (e: any) => e.method === "POST" && e.url.includes("validate")
    );
    let putValidate = endpoint.filter(
      (e: any) => e.method === "PUT" && e.url.includes("validate")
    );

    // funcs
    let getXFunction = endpoint.filter((e: any) => e.method === "GET");
    let postXFunction = endpoint.filter((e: any) => e.method === "POST");
    let putXFunction = endpoint.filter((e: any) => e.method === "PUT");
    let deleteXFunction = endpoint.filter((e: any) => e.method === "DELETE");

    expect(getx).toBeDefined();
    expect(postx).toBeDefined();
    expect(putx).toBeDefined();
    expect(deletex).toBeDefined();
    // getx features
    expect(searchx).toBeDefined();
    expect(filterx).toBeDefined();
    expect(paginatex).toBeDefined();
    // validate
    expect(postValidate).toBeDefined();
    expect(putValidate).toBeDefined();

    // functions
    expect(getXFunction.length > 0).toBeTruthy();
    expect(postXFunction.length > 0).toBeTruthy();
    expect(putXFunction.length > 0).toBeTruthy();
    expect(deleteXFunction.length > 0).toBeTruthy();
  });

  afterEach(async () => {
    await mongoose.connection.close();
  });
});
