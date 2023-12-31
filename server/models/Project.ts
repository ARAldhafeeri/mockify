import { Document, Schema, model} from "mongoose";
import { IProject } from "../types/Project";

const projectSchema = new Schema<IProject>({
  name: {type: String, required: true, unique: true},
  apiKey: {type: String },
  user: {type: Schema.Types.ObjectId , ref: "User", required: true},

})

export default model<IProject>("Project", projectSchema);