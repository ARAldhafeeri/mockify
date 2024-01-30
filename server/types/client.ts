import { Document, Types} from "mongoose";

export interface IClient extends Document {
  name?: string;
  id: string;
  secret: string;
  project: Types.ObjectId;
}

export interface IClientInputDTO {
  name: string;
  project: Types.ObjectId;
}

export interface IClientService {
  find(data: Object): Promise<IClient>;
  create(data : IClientInputDTO): Promise<IClient>;
  update(data : IClientInputDTO): Promise<IClient>;
  delete(id: Types.ObjectId): Promise<IClient>;
  findOne(data: Object): Promise<IClient>;
  generateClientCredentials(): Promise<IClient> ;
}