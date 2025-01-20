import { Document, Types } from "mongoose";
import { IBaseEntity } from "./generic";

export interface IData extends IBaseEntity {
  resource: string;
  data: Object;
}

export interface IDataService {
  find(data: Object): Promise<IData>;
  create(data: IData): Promise<IData>;
  update(data: IData): Promise<IData>;
  delete(id: Types.ObjectId): Promise<IData>;
  findOne(data: Object): Promise<IData>;
}
