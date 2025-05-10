import { Schema, model } from "mongoose";
import { IEvent } from "../entities/event";

const eventSchema = new Schema<IEvent>(
  {
    resource: { type: Schema.Types.ObjectId, ref: "Resource" },
    name: { type: String },
    handler: { type: String },
    userUID: { type: String, maxlength: 100 },
  },
  { timestamps: true }
);

export default model<IEvent>("Event", eventSchema);
