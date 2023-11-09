import { Document, Schema, model, Types } from "mongoose";

export interface IPolicy extends Document {
    project: Types.ObjectId;
    resources: Types.Array<string>;
    actions: Array<string>;
    roles: Array<string>;
    policies: Array<string>;
    createdAt: Date;
    updatedAt: Date;

}

const policySchema = new Schema<IPolicy>({
    project: {type: Schema.ObjectId, required: true, unique: true},
    resources: {type: [String], required: true},
    actions: {type: [String], required: true},
    roles: {type: [String], required: true},
    policies: {type: [String], required: true},
    createdAt: {type: Date, required: true},
    updatedAt: {type: Date, required: true},
   
});

export default model<IPolicy>('Policy', policySchema);