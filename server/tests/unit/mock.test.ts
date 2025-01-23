import { IEndpointFeatures } from "../../entities/resource";
import { DATABASE_URL } from "../../getEnv";
import mongoose from "mongoose";
import { generateDataBasedOnType } from "../utils";
import { mockService, resourceService } from "../../services";

describe("Mock service ", () => {
  beforeEach(async () => {
    await mongoose.connect(DATABASE_URL);
  });

  /**
   * testing MockService class
   * IMockService {
      find(data: Object): Promise<IData>;
      isPaginated(data: IEndpointFeatures, params: IPaginateParams): boolean;
      isSearch(data: IEndpointFeatures, params: ISearchParams): boolean;
      isFilter(data: IEndpointFeatures, params: IFilterParams): boolean;
      isValidate(data: IEndpointFeatures, params: IValidateParams ): boolean;
      paginatedQuery(data: Object, params: IPaginateParams): Promise<IPaginatedResponse>;
      searchQuery(data: Object, params: ISearchParams): Promise<IPaginatedResponse>;
      filterQuery(data: Object, params: IFilterParams): Promise<IPaginatedResponse>;
      validateAndMutateQuery(data: IData, schema: IResource["fields"]): Promise<IPaginatedResponse>;
      find(data: Object): Promise<IData>;
      create(data: IData): Promise<IData>;
      update(data: IData): Promise<IData>;
      delete(id: Types.ObjectId): Promise<IData>;
      }
   */

  test("mockService.isNumber should return true if the value is a number", () => {
    expect(mockService.isNumber("1")).toEqual(true);
  });

  test("mockService.isNumber should return false if the value is not a number", () => {
    expect(mockService.isNumber("a")).toEqual(false);
  });

  test("mockService.isPaginated should return true if the data has pagination and params are numbers", () => {
    const endpointFeatures: IEndpointFeatures = {
      filter: true,
      pagination: true,
      search: true,
      validation: true,
      getx: true,
      postx: true,
      putx: true,
      deletex: true,
      functions: true,
    };
    const params = {
      page: "1",
      limit: "1",
    };
    expect(mockService.isPaginated(endpointFeatures, params)).toBeTruthy();
  });

  test("mockService.isPaginated should return false if the data has pagination and params are not numbers", () => {
    const endpointFeatures: IEndpointFeatures = {
      filter: true,
      pagination: true,
      search: true,
      validation: true,
      getx: true,
      postx: true,
      putx: true,
      deletex: true,
      functions: true,
    };
    const params = {
      page: "a",
      limit: "a",
    };
    expect(mockService.isPaginated(endpointFeatures, params)).toBeFalsy();
  });

  test("mockService.isPaginated should return false if the data has no pagination and params are numbers", () => {
    const endpointFeatures: IEndpointFeatures = {
      filter: true,
      pagination: false,
      search: true,
      validation: true,
      getx: true,
      postx: true,
      putx: true,
      deletex: true,
      functions: true,
    };
    const params = {
      page: "1",
      limit: "1",
    };
    expect(mockService.isPaginated(endpointFeatures, params)).toBeFalsy();
  });

  test("mockService.isSearch should return true if the data has search and params are not empty", () => {
    const endpointFeatures: IEndpointFeatures = {
      filter: true,
      pagination: true,
      search: true,
      validation: true,
      getx: true,
      postx: true,
      putx: true,
      deletex: true,
      functions: true,
    };
    const params = {
      search: "a",
    };
    expect(mockService.isSearch(endpointFeatures, params)).toBeTruthy();
  });

  test("mockService.isSearch should return false if the data has search and params are empty", () => {
    const endpointFeatures: IEndpointFeatures = {
      filter: true,
      pagination: true,
      search: true,
      validation: true,
      getx: true,
      postx: true,
      putx: true,
      deletex: true,
      functions: true,
    };
    const params = {
      search: "",
    };
    expect(mockService.isSearch(endpointFeatures, params)).toBeFalsy();
  });

  test("mockservice.isFilter should return true if the data has filter and params are not empty", () => {
    const endpointFeatures: IEndpointFeatures = {
      filter: true,
      pagination: true,
      search: true,
      validation: true,
      getx: true,
      postx: true,
      putx: true,
      deletex: true,
      functions: true,
    };
    const params = {
      name: "a",
      value: "a",
    };
    expect(mockService.isFilter(endpointFeatures, params)).toBeTruthy();
  });

  test("mockservice.isFilter should return false if the data has filter and params are empty", () => {
    const endpointFeatures: IEndpointFeatures = {
      filter: true,
      pagination: true,
      search: true,
      validation: true,
      getx: true,
      postx: true,
      putx: true,
      deletex: true,
      functions: true,
    };
    const params = {
      name: "",
      value: "",
    };
    expect(mockService.isFilter(endpointFeatures, params)).toBeFalsy();
  });

  test("mockservice.paginatedQuery should return a paginated response", async () => {
    const projection = {};
    const params = {
      page: "1",
      limit: "1",
    };
    const response = await mockService.paginatedQuery(projection, params);
    expect(response).toHaveProperty("total");
    expect(response).toHaveProperty("page");
    expect(response).toHaveProperty("limit");
    expect(response).toHaveProperty("data");
  });

  test("mockservice.searchQuery should return a search response", async () => {
    const data = "a";
    const response = await mockService.searchQuery(data);
    expect(response).toBeDefined();
  });

  test("mockservice.filterQuery should return a filter response", async () => {
    const projection = { name: "a" };
    const response = await mockService.filterQuery(projection);
    expect(response).toBeDefined();
  });

  test("mockservice.validateAndMutateQuery should return a validate response", async () => {
    let res = await resourceService.findOne({ name: "default" });
    let fields = res.fields;
    const fieldNames = fields.map(
      (field: { name: string; type: string; required: boolean }) => field.name
    );
    const data: any = {};
    const map = mockService.getSchemaFieldTypeMap(fields);

    fieldNames.forEach((fieldName: string) => {
      data[fieldName] = generateDataBasedOnType(map.get(fieldName));
    });

    const response = await mockService.validateAndCreateQuery(
      data,
      fields,
      res._id.toString()
    );
    expect(response).toBeDefined();
  });

  afterEach(async () => {
    await mongoose.connection.close();
  });
});
