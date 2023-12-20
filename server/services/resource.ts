import ResourceModel from "../models/Resource";
import {Types} from "mongoose";
import { IResService } from "../types/Resource";
import { IResource } from "../types/Resource";



class ResourceService implements IResService  {
  constructor() {

  }

  find = async ( projection: Object) : Promise<any> => {
    const foundRes = await ResourceModel.find( 
       projection
       ).lean();
    
    return foundRes;
  }

  findById = async (id: Types.ObjectId) : Promise<any> => {
    const foundRes = await ResourceModel.findById( 
       id
       ).lean();
    
    return foundRes;
  }

  findOne = async ( projection: Object) : Promise<any> => {
    const foundRes = await ResourceModel.findOne( 
       projection
       ).lean();
    
    return foundRes;
  }

  create = async (r: IResource) : Promise<any>  => {
    
    const newRes = new ResourceModel(r);
    const createdRes = await newRes.save();
    return createdRes;
  }

  update = async (r: IResource) : Promise<any> => {
    
    const rUpdated = await ResourceModel.findOneAndUpdate(
      { _id: r._id },
      r,
      { new: true }
    );

    return rUpdated;
  }

  delete = async (id: Types.ObjectId) : Promise<any> => {
    
    const deletedUser = await ResourceModel.findByIdAndDelete(id);

    return deletedUser;
  }
  
  findOrCreate = async (resource: IResource) : Promise<any> => {
      
    const found = await ResourceModel.findOne({resourceName: resource.resourceName});
    
    if (found) {
      return found;
    }

    const NEW = new ResourceModel(resource);
    const created = await NEW.save();
    return created;
  }
}

export default ResourceService;