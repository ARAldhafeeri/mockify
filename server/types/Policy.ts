import { Document, Types } from "mongoose";

export interface IPolicy extends Document {
    project: Types.ObjectId;
    resources: Types.Array<string>;
    actions: Array<string>;
    roles: Array<string>;
    policies: Array<{role : string,
        can : string[],
        on : string[]}>;
    createdAt: Date;
    updatedAt: Date;
}

export interface IPolicyService {

    find(projection: Object): Promise<any>;
    create(policy: IPolicy): Promise<any>;
    update(policy: IPolicy): Promise<any>;
    delete(id: Types.ObjectId): Promise<any>;
    findOrCreate(policy: IPolicy): Promise<any>;
  
  }