import { Schema, model } from "mongoose";
import { IClient } from "../entities/client";

const clientCredSchema = new Schema<IClient>(
  {
    name: { type: String },
    id: { type: String, unique: true },
    secret: { type: String },
    userUID: { type: String, maxlength: 100 },
    project: { type: String },
  },
  { timestamps: true }
);

clientCredSchema.index({ name: "text", data: "text" });

export default model<IClient>("client", clientCredSchema);
