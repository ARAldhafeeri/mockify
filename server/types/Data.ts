import { Document, Types} from "mongoose";

export interface IData extends Document {
  resource: Types.ObjectId;
  data: Object;
}
