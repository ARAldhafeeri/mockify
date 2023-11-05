import { Document, Schema, model} from "mongoose";

export interface IResource extends Document {
  resourceName: string;
  project: Schema.Types.ObjectId;
  endpoint: string;
  features: {
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
  }
  funcs: Array<string>;
}

const resourceSchema = new Schema<IResource>({
  resourceName: {type: String, required: true},
  endpoint: {type: String, required: true},
  features: {type: Object, required: true},
  funcs: {type: [String], required: true},
})

export default model<IResource>("Resource", resourceSchema);