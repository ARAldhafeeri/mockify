import ProjectModel, {IProject} from "../models/Project";
import {Types} from "mongoose";

interface IProjectService {
  find(project: Object): Promise<any>;
  create(project: IProject): Promise<any>;
  update(project: IProject): Promise<any>;
  delete(id: Types.ObjectId): Promise<any>;
}

class ProjectService implements IProjectService  {
  constructor() {

  }

  find = async ( projection: Object) : Promise<any> => {
    const foundProject = ProjectModel.find( 
       projection
       )
    
    return foundProject;
  }

  create = async (project: IProject) : Promise<any>  => {
    
    const newProject = new ProjectModel(project);
    const createdProject = await newProject.save();
    return createdProject;
  }

  update = async (p: IProject) : Promise<any> => {
    
    const pUpdated = await ProjectModel.findOneAndUpdate(
      { _id: p._id },
      p,
      { new: false }
    );

    return pUpdated;
  }

  delete = async (id: Types.ObjectId) : Promise<any> => {
    
    const deletedUser = await ProjectModel.findByIdAndDelete(id);

    return deletedUser;
  }
  
}

export default ProjectService;