import { Document, Types} from "mongoose";

export interface IData extends Document {
  resource: Types.ObjectId;
  data: Object;
}

export interface IDataService {
  find(data: Object): Promise<IData>;
  create(data: IData): Promise<IData>;
  update(data: IData): Promise<IData>;
  delete(id: Types.ObjectId): Promise<IData>;
  findOne(data: Object): Promise<IData>;
}