import { Document, Schema, Types, model} from "mongoose";

import { IData } from "../types/Data";

const dataSchema = new Schema<IData>({
  data: {type: Object, required: true},
  resource: {type: Schema.Types.ObjectId , ref: "Resource", required: true},

})

dataSchema.index({name: "text", data: "text" })

export default model<IData>("Data", dataSchema);