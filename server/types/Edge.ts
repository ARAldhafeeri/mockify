import { Document, ObjectId, Types } from "mongoose";

export interface IEdge extends Document {
    resource: Types.ObjectId;
    name: string;
    code: string;
    method: string;
}


export interface IEdgeService {
    find(projection: Object): Promise<IEdge>;
    create(data: IEdge): Promise<IEdge>;
    update(data: IEdge): Promise<IEdge>;
    delete(id: Types.ObjectId): Promise<IEdge>;
    findOne(data: Object): Promise<IEdge>;
    findEdgeFunctionsBYresourceId(resourceId: string): Promise<IEdge>;
    addImmediatelyInvokedAsync(code: string): string;
    runFunctionInContext(code: string, asyncc : boolean, additionalContext: any): Promise<any>;
  }


type additionalContext = {
    [key: string]: any;
  }