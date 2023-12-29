import PolicyModel from "../models/Policy";
import { Types } from "mongoose";
import { IPolicyService } from "../types/Policy";
import { IPolicy } from "../types/Policy";
import ProjectService from "./project";
import { IProjectService } from "../types/Project";

const ObjectId = Types.ObjectId;

class PolicyService implements IPolicyService {
   projectService : IProjectService;
  constructor() {
    this.projectService = new ProjectService();
  }

  find = async ( projection: Object) : Promise<any> => {

    const foundPolicy = await PolicyModel.find( 
       projection
       )
    
    return foundPolicy;

  }

  create = async (policy: IPolicy): Promise<any> => {

    if (await this.projectExistsForThisProject(policy.project)) return false;

    policy.createdAt = new Date();
    const newPolicy = new PolicyModel(policy);
    const createdPolicy = newPolicy.save();
    return createdPolicy;
    
  }

 projectExistsForThisProject = async (id: Types.ObjectId): Promise<any> => {
  const projectPolicy = await PolicyModel.findOne({project: new ObjectId(id) });
  if (projectPolicy) return true;
  return false;
 }

  findOne = async ( projection: Object) : Promise<any> => {
    const foundPolicy = await PolicyModel.findOne( 
       projection
       ).lean();
    
    return foundPolicy;
  }

 update = async (policy: IPolicy): Promise<any> => {

  if (await this.projectExistsForThisProject(policy.project)) return false;

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
    
    if (await this.projectExistsForThisProject(policy.project)) return false;

    if (found) {
      return found;
    }

    const NEW = new PolicyModel(policy);
    const created = await NEW.save();
    return created;
  }

}

export default PolicyService