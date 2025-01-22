import { Document, Types } from "mongoose";
import { IBaseEntity, IRepository, IService } from "./generic";

export interface IEvent extends IBaseEntity {
  resource: Types.ObjectId;
  name: string;
  handler: string;
}

export interface IEventService extends IService<IEvent> {}

export interface IEventRepository extends IRepository<IEvent> {}
