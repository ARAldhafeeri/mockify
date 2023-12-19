import { Document, Schema, Types, model} from "mongoose";
import { IResource, ISchemaField } from "../types/Resource";

const resourceSchema = new Schema<IResource>({
  resourceName: {type: String, required: true, unique: true},
  project: {type: Schema.Types.ObjectId , ref: "Project", required: true},
  features: {
    filter: {type: Boolean, required: true},
    pagination: {type: Boolean, required: true},
    search: {type: Boolean, required: true},
    validation: {type: Boolean, required: true},
    getx: {type: Boolean, required: true},
    postx: {type: Boolean, required: true},
    putx: {type: Boolean, required: true},
    deletex: {type: Boolean, required: true},
  
  },
  fields: [{
    name: {type: String, required: true},
    type: {type: String, required: true},
    required: {type: Boolean, required: true},
  
  }],
})

export default model<IResource>("Resource", resourceSchema);