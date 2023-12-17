import { Document, Schema, Types, model} from "mongoose";
import { IResource } from "../types/Resource";

const resourceSchema = new Schema<IResource>({
  resourceName: {type: String, required: true},
  project: {type: Schema.Types.ObjectId , ref: "Project", required: true},
  features: {type: Object, required: true},
  fields: {type: [Object], required: true},
})

export default model<IResource>("Resource", resourceSchema);