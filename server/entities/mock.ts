import { IData } from "./data";
import { IEndpointFeatures, IResource } from "./resource";
import { IController, IService } from "./generic";

export interface IPaginatedResponse {
  total: number;
  page: number;
  limit: number;
  data: Array<Object>;
}

export interface IPaginateParams {
  page: string; // parsed as int
  limit: string; // parsed as int
}

export interface ISearchParams {
  search: string;
}

export interface IFilterParams {
  name: string;
  value: string;
}

export interface IValidateParams {
  validate: string; // parsed boolean true or false
}

export interface IMockService extends IService<any> {
  isPaginated(data: IEndpointFeatures, params: IPaginateParams): boolean;
  isSearch(data: IEndpointFeatures, params: ISearchParams): boolean;
  isFilter(data: IEndpointFeatures, params: IFilterParams): boolean;
  paginatedQuery(
    data: Object,
    params: IPaginateParams
  ): Promise<IPaginatedResponse>;
  searchQuery(data: string): Promise<IPaginatedResponse>;
  filterQuery(params: IFilterParams): Promise<IPaginatedResponse>;
  validateAndCreateQuery(
    data: IData,
    schema: IResource["fields"],
    resource: string
  ): Promise<IPaginatedResponse>;
  validateAndUpdateQuery(
    data: IData,
    schema: IResource["fields"],
    resource: string
  ): Promise<IPaginatedResponse>;
}

export interface IMockFieldsMap {
  [key: string]: any;
}

export interface IMockController extends IController {}
