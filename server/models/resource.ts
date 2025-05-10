import { Document, Schema, Types, model } from "mongoose";

import { IResource, ISchemaField } from "../entities/resource";

const resourceSchema = new Schema<IResource>(
  {
    name: { type: String },
    features: {
      filter: { type: Boolean },
      pagination: { type: Boolean },
      search: { type: Boolean },
      validation: { type: Boolean },
      getx: { type: Boolean },
      postx: { type: Boolean },
      putx: { type: Boolean },
      deletex: { type: Boolean },
      functions: { type: Boolean },
    },
    fields: [
      {
        name: { type: String },
        type: { type: String },
        required: { type: Boolean },
      },
    ],
    userUID: { type: String, maxlength: 100 },
    project: { type: String },
  },
  { timestamps: true }
);

export default model<IResource>("Resource", resourceSchema);
