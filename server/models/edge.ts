import { Document, Schema, model, Types } from "mongoose";
import { IEdge } from "../entities/edge";

const edgeSchema = new Schema<IEdge>(
  {
    resource: { type: Schema.Types.ObjectId, ref: "Resource", required: true },
    name: { type: String },
    code: { type: String },
    method: { type: String },
    userUID: { type: String, maxlength: 100 },
  },
  { timestamps: true }
);
export default model<IEdge>("Edge", edgeSchema);
