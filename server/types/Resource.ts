import { Document, Types} from "mongoose";


export interface IEndpointFeatures {
  filter: boolean;
  pagination: boolean;
  search: boolean;
  validation: boolean;
  getx: boolean;
  postx: boolean;
  putx: boolean;
  deletex: boolean;
  functions: boolean;
}

export interface ISchemaField extends Document{
  name : string;
  type : string;  
  required : boolean;
}

export interface IResource extends Document {
  resourceName: string;
  project: Types.ObjectId;
  fields: Array<Object>;
  features: IEndpointFeatures
}


export interface IResService {
  find(reosource: Object): Promise<any>;
  create(reosource: IResource): Promise<any>;
  update(reosource: IResource): Promise<any>;
  delete(id: Types.ObjectId): Promise<any>;
  findById(id: Types.ObjectId): Promise<any>;
  findOne(reosource: Object): Promise<any>;
}
