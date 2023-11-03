import Resource from "../models/Resource";
import ResourceModel, {IResource} from "../models/Resource";
import {Types} from "mongoose";

interface IResService {
  find(reosource: Object): Promise<any>;
  create(reosource: IResource): Promise<any>;
  update(reosource: IResource): Promise<any>;
  delete(id: Types.ObjectId): Promise<any>;
}

class ResourceService implements IResService  {
  constructor() {

  }

  find = async ( projection: Object) : Promise<any> => {
    const foundRes = ResourceModel.find( 
       projection
       )
    
    return foundRes;
  }

  create = async (project: IResource) : Promise<any>  => {
    
    const newRes = new ResourceModel(project);
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
  
}

export default ResourceService;