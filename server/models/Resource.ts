import { Document, Schema, model} from "mongoose";

export interface IResource extends Document {
  resourceName: string;
  project: Schema.Types.ObjectId;
  endpoint: string;
  filter: boolean;
  pagination: boolean;
  search: boolean;
  validation: boolean;
  webhook: boolean;
  sse: boolean;
  wss: boolean;
  getx: boolean;
  postx: boolean;
  putx: boolean;
  deletex: boolean;
  consumer: boolean;
  producer: boolean;
  funcs: Array<Object>;
}

const resourceSchema = new Schema<IResource>({
  resourceName: {type: String, required: true},
  endpoint: {type: String, required: true},
  filter: {type: Boolean, default: false},
  pagination: {type: Boolean, default: false},
  search: {type: Boolean, default: false},
  validation: {type: Boolean, default: false},
  webhook: {type: Boolean, default: false},
  sse: {type: Boolean, default: false},
  wss: {type: Boolean, default: false},
  getx: {type: Boolean, default: false},
  postx: {type: Boolean, default: false},
  putx: {type: Boolean, default: false},
  deletex: {type: Boolean, default: false},
  producer: {type: Boolean, default: false},
  consumer: {type: Boolean, default: false},
  project: {type: Schema.Types.ObjectId , ref: "Project", required: true},
  funcs: {type: [Object], required: true},
})

export default model<IResource>("Resource", resourceSchema);