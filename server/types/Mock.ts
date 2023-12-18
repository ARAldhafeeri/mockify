import { IData } from "./Data";
import { Types} from "mongoose";
import { IEndpointFeatures, IResource } from "./Resource";

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
  filterName: string;
  filterValue: string;
}

export interface IValidateParams {
  validate: string; // parsed boolean true or false
}

export interface IMockService {
  find(data: Object): Promise<IData>;
  isPaginated(data: IEndpointFeatures, params: IPaginateParams): boolean;
  isSearch(data: IEndpointFeatures, params: ISearchParams): boolean;
  isFilter(data: IEndpointFeatures, params: IFilterParams): boolean;
  isValidate(data: IEndpointFeatures, params: IValidateParams ): boolean;
  paginatedQuery(data: Object, params: IPaginateParams): Promise<IPaginatedResponse>;
  searchQuery(data: Object, params: ISearchParams): Promise<IPaginatedResponse>;
  filterQuery(data: Object, params: IFilterParams): Promise<IPaginatedResponse>;
  validateAndMutateQuery(data: IData, schema: IResource["fields"], resource: string): Promise<IPaginatedResponse>;
  find(data: Object): Promise<IData>;
  create(data: IData): Promise<IData>;
  update(data: IData): Promise<IData>;
  delete(id: Types.ObjectId): Promise<IData>;
}

export interface IMockFieldsMap {
  [key: string]: any;

}