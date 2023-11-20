import { Document, Schema, Types, model} from "mongoose";

export interface IResource extends Document {
  resourceName: string;
  project: Types.ObjectId;
  fields: Array<Object>;
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
}

const resourceSchema = new Schema<IResource>({
  resourceName: {type: String, required: true},
  project: {type: Schema.Types.ObjectId , ref: "Project", required: true},
  features: {type: Object, required: true},
  fields: {type: [Object], required: true},
})

export default model<IResource>("Resource", resourceSchema);