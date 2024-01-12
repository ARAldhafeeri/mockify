import ProjectModel from "../models/Project";
import {Types} from "mongoose";
import { IProjectService } from "../types/Project";
import { IProject } from "../types/Project";


class ProjectService implements IProjectService  {
  constructor() {

  }

  find = async ( projection: Object) : Promise<any> => {
    const foundProject = await ProjectModel.find( 
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
      { new: true }
    );

    return pUpdated;
  }

  delete = async (id: Types.ObjectId) : Promise<any> => {
    
    const record = await ProjectModel.findByIdAndDelete(id);

    return record;
  }

  
  findOne = async ( projection: Object) : Promise<any> => {
    const foundRes = await ProjectModel.findOne( 
       projection
       ).lean();
    
    return foundRes;
  }


  findOrCreate = async (project: IProject) : Promise<any> => {
      
      const foundProject = await ProjectModel.findOne({name: project.name});
      
      if (foundProject) {
        return foundProject;
      }
  
      const newProject = new ProjectModel(project);
      const createdProject = await newProject.save();
      return createdProject;
    }
  
}

export default ProjectService;