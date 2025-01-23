import Data from "../models/data";
import { Types } from "mongoose";
import { IData, IDataRepository } from "../entities/data";
import {
  IEndpointFeatures,
  IResService,
  IResource,
  ISchemaField,
} from "../entities/resource";
import {
  IFilterParams,
  IMockService,
  IPaginateParams,
  IPaginatedResponse,
  ISearchParams,
  IMockFieldsMap,
} from "../entities/mock";
import { Service } from "./generic";

class MockService extends Service<IData> implements IMockService {
  /**
   * keep in mind that this service provide multiple services for /mock
   * 1. should be queried separately
   * 2. should not be queried together
   * 3. filter will return all data that match the filter
   * 4. search will return all data that match the search
   * 5. paginate will return all data that match the pagination
   * 6. validate will validate the data against the schema defined in the resource
   * 7. requests should have params only for the feature they are querying
   */

  resourceService: IResService;

  constructor(resourceService: IResService, repository: IDataRepository) {
    super(repository);
    this.resourceService = resourceService;
    this.repository = this.repository;
  }

  isNumber = (value: string): boolean => {
    return isNaN(parseInt(value)) == false;
  };

  isPaginated = (data: IEndpointFeatures, params: IPaginateParams): boolean => {
    return (
      data?.pagination &&
      this.isNumber(params.page) &&
      this.isNumber(params.limit)
    );
  };

  isFilter = (data: IEndpointFeatures, params: IFilterParams): boolean => {
    return data?.filter && Boolean(params.name) && Boolean(params.value);
  };

  isSearch(data: IEndpointFeatures, params: ISearchParams): boolean {
    return data?.search && Boolean(params.search);
  }

  paginatedQuery = async (
    projection: Object,
    params: IPaginateParams
  ): Promise<IPaginatedResponse> => {
    const page = parseInt(params.page);
    const limit = parseInt(params.limit);
    const startIndex = (page - 1) * limit;

    const results = await this.repository.find(projection, {});

    const total = await this.repository.count(projection);

    return Promise.resolve({
      total: total,
      page: page,
      limit: limit,
      data: results,
    });
  };

  searchQuery = async (data: string): Promise<any> => {
    return this.search(data);
  };

  filterQuery = async (projection: Object): Promise<any> => {
    // projection is {filterName: filterValue}
    return this.repository.find(projection, {});
  };

  getSchemaFieldTypeMap = (schema: IResource["fields"]): IMockFieldsMap => {
    const fieldTypesMap: IMockFieldsMap = new Map();
    schema.forEach((field: any) => {
      fieldTypesMap.set(field.name, field.type);
    });

    return fieldTypesMap;
  };

  validateMockData = async (
    data: any,
    fields: IResource["fields"],
    resource: string
  ): Promise<any> => {
    let fieldsTypes: IMockFieldsMap = this.getSchemaFieldTypeMap(fields);
    // missing required fields, incorrect types
    let status: boolean = true;
    fieldsTypes.forEach((value: string, key: any) => {
      let fieldIsRequired = (
        fields.find((field: any) => field.name == key) as any
      ).required;
      let fieldIsRequiredAndDoesNotExist = !(key in data) && fieldIsRequired;
      if (fieldIsRequiredAndDoesNotExist) status = false;
      if (typeof data[key] != fieldsTypes.get(key)) status = false;
    });

    // extra fields
    Object.keys(data ?? {}).forEach((key) => {
      let fieldExists = fieldsTypes.has(key);
      if (!fieldExists) status = false;
    });
    return status;
  };

  validateAndCreateQuery = async (
    data: IData,
    fields: IResource["fields"],
    resource: string
  ): Promise<any> => {
    let dataIsValid = await this.validateMockData(data, fields, resource);

    if (!dataIsValid) return false;

    const results = await this.repository.create({
      data: data,
      resource: resource,
    });
    return results;
  };

  validateAndUpdateQuery = async (
    data: any,
    fields: IResource["fields"],
    resource: string
  ): Promise<any> => {
    let dataIsValid = await this.validateMockData(data, fields, resource);

    if (!dataIsValid) return false;

    const results = await this.repository.create({
      data: data,
      resource: resource,
    });
    return results;
  };
}

export default MockService;
