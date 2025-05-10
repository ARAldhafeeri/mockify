import { Document, Schema, Types, model } from "mongoose";

import { IData } from "../entities/data";

const dataSchema = new Schema<IData>(
  {
    resource: { type: String, ref: "Resource" },
    data: { type: Object, required: true },
    userUID: { type: String, maxlength: 100 },
  },
  { timestamps: true }
);

dataSchema.index({ name: "text", data: "text" });

export default model<IData>("Data", dataSchema);
