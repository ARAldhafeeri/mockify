import EdgeModel from "../models/Edge";
import {Types} from "mongoose";
import { IEdge } from "../types/Edge";
import { IEdgeService } from "../types/Edge";
import { IResource, IResService } from "../types/Resource";
import ResourceService from "./resource";
const {ObjectId} = Types;


class EdgeService implements IEdgeService  {

  rService : IResService;

  constructor() {
    this.rService = new ResourceService();
  }

  find = async ( projection: Object) : Promise<any> => {

    const found = await EdgeModel.find( 
       projection
       )
    
    return found;
  }

  create = async (record: IEdge) : Promise<any>  => {
    const dNew = new EdgeModel(record);
    const dCreated = await dNew.save();
    return dCreated;
  }

  update = async (record: IEdge) : Promise<any> => {
    
    const dUpdated = await EdgeModel.findOneAndUpdate(
      { _id: record._id },
      record,
      { new: true }
    );

    return dUpdated;
  }

  delete = async (id: Types.ObjectId) : Promise<any> => {
    
    const dDeleted = await EdgeModel.findByIdAndDelete(id);

    return dDeleted;
  }

  findOne = async ( projection: Object) : Promise<any> => {
    const foundRes = await EdgeModel.findOne( 
       projection
       ).lean();
    
    return foundRes;
  }

  findOrCreate = async (data: IEdge) : Promise<any> => {
    const found = await EdgeModel.findOne({resource: data.resource});
    
    if (found) {
      return found;
    }

    const NEW = new EdgeModel(data);
    const created = await NEW.save();
    return created;
  }

  findEdgeFunctionsBYResourceName = async (resourceName: string) : Promise<any> => {
    const res : IResource = await this.rService.findOne({resourceName: resourceName});
    
    if (!res) throw new Error("resource not found");

    const found = await EdgeModel.find({resource: res._id});

    return found;
  }

  
}

export default EdgeService;