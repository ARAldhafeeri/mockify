import { Document, ObjectId, Types } from "mongoose";
import { IBaseEntity, IController, IRepository, IService } from "./generic";

export interface IEdge extends IBaseEntity {
  resource: Types.ObjectId;
  name: string;
  code: string;
  method: string;
}

export interface IEdgeRepository extends IRepository<IEdge> {}

export interface IEdgeService extends IService<IEdge> {
  findEdgeFunctionsBYresourceId(resourceId: string): Promise<IEdge[]>;
  addImmediatelyInvokedAsync(code: string): string;
  runFunctionInContext(
    code: string,
    asyncc: boolean,
    additionalContext: any
  ): Promise<any>;
}

type additionalContext = {
  [key: string]: any;
};

export interface IEdgeController extends IController {}
