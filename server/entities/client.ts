import { Document, Types } from "mongoose";
import { IBaseEntity, IController, IRepository, IService } from "./generic";

export interface IClient extends IBaseEntity {
  name?: string;
  id: string;
  secret: string;
  project: string;
}

export interface IClientInputDTO {
  name: string;
  project: Types.ObjectId;
}

export interface IClientRepository extends IRepository<IClient> {}

export interface IClientService extends IService<IClient> {
  generateClientCredentials(): Promise<IClient>;
  findClientsByPorjectId(id: Types.ObjectId): Promise<IClient[]>;
}

export interface IClientController extends IController {}
