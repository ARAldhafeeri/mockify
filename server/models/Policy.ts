import { Document, Schema, model, Types } from "mongoose";
import { IPolicy } from "../types/Policy";

const policySchema = new Schema<IPolicy>({
    project: {type: Schema.ObjectId, required: true, unique: true},
    resources: {type: [String], required: true},
    actions: {type: [String], required: true},
    roles: {type: [String], required: true},
    policies: {type: [], required: true},
    createdAt: {type: Date, required: false},
    updatedAt: {type: Date, required: false},
   
});

export default model<IPolicy>('Policy', policySchema);