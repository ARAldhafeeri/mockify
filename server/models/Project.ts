import { Document, Schema, model} from "mongoose";

export interface IProject extends Document {
  name: string;
  user: Schema.Types.ObjectId;
  apiKey: string;
}

const projectSchema = new Schema<IProject>({
  name: {type: String, required: true, unique: true},
  apiKey: {type: String },
  user: {type: Schema.Types.ObjectId , ref: "User", required: true},

})

export default model<IProject>("Project", projectSchema);