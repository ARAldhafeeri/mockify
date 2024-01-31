import Data from "../models/Data";
import ClientCredModel from "../models/client";
import {ObjectId, Types} from "mongoose";
import { IClient, IClientInputDTO, IClientService } from "../types/client";
import { ICryptoService } from "../types/Auth";
import CryptoService from "./crypto";
import ProjectService from "./project";
import { IProjectService } from "../types/Project";

const {ObjectId} = Types;


class ClientService implements IClientService  {

  CryptoService : ICryptoService;
  ProjectService : IProjectService
  constructor() {
    this.CryptoService = new CryptoService();
    this.ProjectService = new ProjectService();
  }

  find = async ( projection: Object) : Promise<any> => {

    const found = await ClientCredModel.find( 
       projection
       )
    
    return found;
  }

  findOne = async ( projection: Object) : Promise<any> => {
    const foundRes = await ClientCredModel.findOne( 
       projection
       ).lean();
    
    return foundRes;
  }


  create = async (data : IClientInputDTO) : Promise<any>  => {
    let cred = await this.generateClientCredentials();
    let c = {
      ...data,
      id : cred.id,
      secret : cred.secret
    }
    const NEW = new ClientCredModel(c);
    const created = await NEW.save();
    return created;
  }

  update = async (data : IClientInputDTO) : Promise<any> => {
    
    const dUpdated = await ClientCredModel.findOneAndUpdate(
      { project : new ObjectId(data.project)},
      { $set: data },
      { new: true }
    );

    return dUpdated;
  }

  delete = async (id: Types.ObjectId) : Promise<any> => {
    
    const dDeleted = await ClientCredModel.findByIdAndDelete(id);

    return dDeleted;
  }

  findOrCreate = async (data: IClient) : Promise<any> => {
    const found = await ClientCredModel.findOne({_id: new ObjectId(data._id)});
    
    if (found) {
      return found;
    }

    const NEW = new ClientCredModel(data);
    const created = await NEW.save();
    return created;
  }    

  generateClientCredentials = async (): Promise<any> => {
      return {
        id: (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).toString(),
        secret: await this.CryptoService.generateAPIKey()
      }
  }
  
}

export default ClientService;