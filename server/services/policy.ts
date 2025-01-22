import PolicyModel from "../models/policy";
import { Types } from "mongoose";
import { IPolicyRepository, IPolicyService } from "../entities/policy";
import { IPolicy } from "../entities/policy";
import ProjectService from "./project";
import { IProjectService } from "../entities/project";
import { Service } from "./generic";

const ObjectId = Types.ObjectId;

class PolicyService extends Service<IPolicy> implements IPolicyService {
  projectService: IProjectService;
  constructor(projectService: IProjectService, repository: IPolicyRepository) {
    super(repository);
    this.projectService = projectService;
  }

  projectExistsForThisProject = async (id: Types.ObjectId): Promise<any> => {
    const projectPolicy = await PolicyModel.findOne({
      project: new ObjectId(id),
    });
    if (projectPolicy) return true;
    return false;
  };
}

export default PolicyService;
