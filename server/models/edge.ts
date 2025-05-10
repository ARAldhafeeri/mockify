import { Document, Schema, model, Types } from "mongoose";
import { IEdge } from "../entities/edge";

const edgeSchema = new Schema<IEdge>(
  {
    resource: { type: Schema.Types.ObjectId, ref: "Resource", required: true },
    name: { type: String, required: true },
    code: { type: String, required: true },
    method: { type: String, required: true },
    userUID: { type: String, maxlength: 100 },
  },
  { timestamps: true }
);
export default model<IEdge>("Edge", edgeSchema);
