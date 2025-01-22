import { IBaseEntity, IController, IRepository, IService } from "./generic";

export interface IData extends IBaseEntity {
  resource: string;
  data: Object;
}

export interface IDataService extends IService<IData> {}

export interface IDataRepository extends IRepository<IData> {}

export interface IDataController extends IController {}
