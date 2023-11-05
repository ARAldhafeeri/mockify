import { Document, Schema, model} from "mongoose";

export interface IData extends Document {
  resource: Schema.Types.ObjectId;
  data: Object;
}

const dataSchema = new Schema<IData>({
  data: {type: Object, required: true},
  resource: {type: Schema.Types.ObjectId , ref: "Resource", required: true},

})

export default model<IData>("Data", dataSchema);