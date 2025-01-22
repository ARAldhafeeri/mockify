import { Document, Types } from "mongoose";
import { IBaseEntity, IRepository, IService } from "./generic";

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

export interface ISchemaField extends Document {
  name: string;
  type: string;
  required: boolean;
}

export interface IResource extends IBaseEntity {
  name: string;
  fields: ISchemaField[];
  features: IEndpointFeatures;
  project: string;
}

export interface IResourceRepository extends IRepository<IResource> {}

export interface IResService extends IService<IResource> {}
