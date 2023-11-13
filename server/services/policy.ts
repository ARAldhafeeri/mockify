import PolicyModel, {IPolicy } from "../models/Policy";

interface IPolicyService {

  findAll(projection: Object): Promise<any>;
  createPolicy(policy: IPolicy): Promise<any>;
  updatePolicy(policy: IPolicy): Promise<any>;
  deletePolicy(policy: string): Promise<any>;

}

class PolicyService implements IPolicyService {
  constructor() {

  }

  findAll = async ( projection: Object) : Promise<any> => {

    const foundPolicy = PolicyModel.find( 
       projection
       )
    
    return foundPolicy;

  }

  createPolicy(policy: IPolicy): Promise<any> {

    policy.createdAt = new Date();
    const createdPolicy = PolicyModel.create(policy);
    return createdPolicy;
    
  }

  updatePolicy(policy: IPolicy): Promise<any> {

    policy.updatedAt = new Date();
    const updatedPolicy = PolicyModel.updateOne(
      {project: policy.project},
      policy
    );
    return updatedPolicy;

  }


  deletePolicy(policy: string): Promise<any> {

    const deletedPolicy = PolicyModel.deleteOne(
      {project: policy}
    );
    return deletedPolicy;
  
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