import { Document, Schema, model } from "mongoose";
import { IProject } from "../entities/project";

const projectSchema = new Schema<IProject>(
  {
    name: { type: String },
    apiKey: { type: String },
    userUID: { type: String, maxlength: 100 },
  },
  { timestamps: true }
);
export default model<IProject>("Project", projectSchema);
