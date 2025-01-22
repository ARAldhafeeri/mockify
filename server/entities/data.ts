import { Document, Types } from "mongoose";
import { IBaseEntity, IRepository, IService } from "./generic";

export interface IData extends IBaseEntity {
  resource: string;
  data: Object;
}

export interface IDataService extends IService<IData> {}

export interface IDataRepository extends IRepository<IData> {}
