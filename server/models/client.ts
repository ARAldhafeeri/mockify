import { Schema, model } from "mongoose";

import { IClient } from "../types/client";

const clientCredSchema = new Schema<IClient>({
  name: { type: String, required: true, unique: true },
  id: { type: String, required: true, unique: true },
  secret: { type: String, required: true },
  project: { type: Schema.Types.ObjectId, ref: "Project" },
})

clientCredSchema.index({name: "text", data: "text" })

export default model<IClient>("client", clientCredSchema);