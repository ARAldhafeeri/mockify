import { Document, Types} from "mongoose";

export interface IEvent extends Document {
  resource: Types.ObjectId;
  name: string;
  handler: string;
}

export interface IEventService {
  find(event: Object): Promise<IEvent>;
  create(event: IEvent): Promise<IEvent>;
  update(event: IEvent): Promise<IEvent>;
  delete(id: Types.ObjectId): Promise<IEvent>;
  findOne(event: Object): Promise<IEvent>;
}