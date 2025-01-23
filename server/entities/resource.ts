import { Document } from "mongoose";
import { IBaseEntity, IController, IRepository, IService } from "./generic";

export interface IEndpointFeatures {
  filter: boolean;
  pagination: boolean;
  search: boolean;
  validation: boolean;
  getx: boolean;
  postx: boolean;
  putx: boolean;
  deletex: boolean;
  functions: boolean;
}

export interface ISchemaField {
  name: string;
  type: string;
  required: boolean;
}

export interface IResource extends IBaseEntity {
  name: string;
  fields: ISchemaField[];
  features: IEndpointFeatures;
  funcs: string[];
  project: string;
}

export interface IResourceRepository extends IRepository<IResource> {}

export interface IResService extends IService<IResource> {}

export interface IResourceController extends IController {}
