import { Document, Types } from "mongoose";
import { IBaseEntity, IController, IRepository, IService } from "./generic";

export interface IPolicy extends IBaseEntity {
  project: string;
  resources: string[];
  actions: string[];
  roles: string[];
  policies: Array<{ role: string; can: string[]; on: string[] }>;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPolicyRepository extends IRepository<IPolicy> {}

export interface IPolicyService extends IService<IPolicy> {}

export interface IPolicyController extends IController {}
