import { IBaseEntity, IController, IRepository, IService } from "./generic";

export interface IProject extends IBaseEntity {
  name: string;
  apiKey: string;
}

export interface IProjectRepository extends IRepository<IProject> {}

export interface IProjectService extends IService<IProject> {}

export interface IProjectController extends IController {}
