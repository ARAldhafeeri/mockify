import PolicyModel from "../models/Policy";
import { Types } from "mongoose";
import { IPolicyService } from "../types/Policy";
import { IPolicy } from "../types/Policy";

class PolicyService implements IPolicyService {
  constructor() {

  }

  find = async ( projection: Object) : Promise<any> => {

    const foundPolicy = await PolicyModel.find( 
       projection
       )
    
    return foundPolicy;

  }

  create = (policy: IPolicy): Promise<any> => {

    policy.createdAt = new Date();
    const newPolicy = new PolicyModel(policy);
    const createdPolicy = newPolicy.save();
    return createdPolicy;
    
  }

  update = (policy: IPolicy): Promise<any> => {

    policy.updatedAt = new Date();
    const updated = PolicyModel.findOneAndUpdate(
      { project: policy.project },
      policy,
      {new: true}
    );
    return updated;

  }


  delete = async (id: Types.ObjectId): Promise<any> => {

    const record =  await PolicyModel.findByIdAndDelete(id);

    return record;
  
  }

  findOrCreate = async (policy: IPolicy) : Promise<any> => {
      
    const found = await PolicyModel.findOne({project: policy.project});
    
    if (found) {
      return found;
    }

    const NEW = new PolicyModel(policy);
    const created = await NEW.save();
    return created;
  }

}

export default PolicyService