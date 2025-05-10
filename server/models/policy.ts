import { Document, Schema, model, Types } from "mongoose";

import { IPolicy } from "../entities/policy";

const policySchema = new Schema<IPolicy>(
  {
    project: { type: String },
    resources: { type: [String], required: true },
    actions: { type: [String], required: true },
    roles: { type: [String], required: true },
    policies: { type: [], required: true },
    createdAt: { type: Date, required: false },
    updatedAt: { type: Date, required: false },
    userUID: { type: String, maxlength: 100 },
  },
  { timestamps: true }
);

export default model<IPolicy>("Policy", policySchema);
