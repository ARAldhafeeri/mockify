import { Schema, model} from "mongoose";

import { IEvent } from "../types/Event";

const eventSchema = new Schema<IEvent>({
  resource: {type: Schema.Types.ObjectId , ref: "Resource", required: true},
  name: {type: String, required: true},
  handler: {type: String, required: true},
})

eventSchema.index({name: "text", event: "text" })

export default model<IEvent>("Event", eventSchema);