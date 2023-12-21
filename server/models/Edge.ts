import { Document, Schema, model, Types } from "mongoose";
import { IEdge } from "../types/Edge";

const edgeSchema = new Schema<IEdge>({
    resource: {type: Schema.Types.ObjectId , ref: "Resource", required: true},
    name: {type: String, required: true, unique: true},
    code: {type: String, required: true},
    method: {type: String, required: true}, // getx, putx, postx, deletex
});

export default model<IEdge>('Edge', edgeSchema);