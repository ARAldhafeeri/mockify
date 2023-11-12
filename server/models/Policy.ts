import { Document, Schema, model, Types } from "mongoose";

export interface IPolicy extends Document {
    project: Types.ObjectId;
    resources: Types.Array<string>;
    actions: Array<string>;
    roles: Array<string>;
    policies: Array<{role : string,
        can : string[],
        on : string[]}>;
    createdAt: Date;
    updatedAt: Date;
}

const policySchema = new Schema<IPolicy>({
    project: {type: Schema.ObjectId, required: true},
    resources: {type: [String], required: true},
    actions: {type: [String], required: true},
    roles: {type: [String], required: true},
    policies: {type: [], required: true},
    createdAt: {type: Date, required: false},
    updatedAt: {type: Date, required: false},
   
});

export default model<IPolicy>('Policy', policySchema);