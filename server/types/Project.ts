import { Document, Schema } from "mongoose";
import {Types} from "mongoose";

export interface IProject extends Document {
  name: string;
  user: Schema.Types.ObjectId;
  apiKey: string;
}

export interface IProjectService {
  find(project: Object): Promise<any>;
  create(project: IProject): Promise<any>;
  update(project: IProject): Promise<any>;
  delete(id: Types.ObjectId): Promise<any>;
  findOne(project: Object): Promise<any>;
}