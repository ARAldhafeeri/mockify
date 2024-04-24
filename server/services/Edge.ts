import EdgeModel from "../models/Edge";
import { IEdge } from "../types/Edge";
import { IEdgeService } from "../types/Edge";
import { IResource, IResService } from "../types/Resource";
import ResourceService from "./resource";
import mongoose, { Types } from "mongoose";
import CONTEXT from "../sandbox/context";
const {ObjectId} = Types;
import vm from 'vm';


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
    const found = await EdgeModel.findOne({name: data?.name});
    
    if (found) {
      return found;
    }

    const NEW = new EdgeModel(data);
    const created = await NEW.save();
    return created;
  }

  findEdgeFunctionsBYResourceName = async (resourceName: string) : Promise<any> => {
    const res : IResource = await this.rService.findOne({resourceName: resourceName});

    if (!res) return false;
    
    const found = await EdgeModel.find({resource: res._id });

    return found;
  }

    

  addImmediatelyInvokedAsync = (code: string) : string => {
    /**
     * recieve a code
     * add Immediately Invoked Async Function Expression
     * return the new code
     */
    const newCode = `(async () => { ${code} })()`
    return newCode;
  }

  cleanUpData = (data: any, projectId: string, resourceId: string) : any => {
    /**
     * recieve a data object
     * remove all records that do not relate to resourceId or resourceProjectId
     * return the new data object
     */
    let newData : Array<any> = [];

    for (let i = 0; i < data.length; i++) {
      let entity = data[i];
      if (entity.project) {
        if (entity.project.toString() === projectId) {
          newData.push(entity);
        }
      }
      if (entity.resource) {
        if (entity.resource.toString() === resourceId) {
          newData.push(entity);
        }
      }
    }
    return newData;
  }


  runFunctionInContext = async ( code : string, asyncc = false, additionalContext : any =null ) : Promise<any> => {
    /**
     * recieve a context and code
     * run the code in the context sandbox
     * return the data in the context
     * which is i/o user wants from the code 
     * user have access to this context :
     * 1- ResourceModel
     * 2- DataModel
     * 3- ProjectModel
     * 4- PolicyModel
     * 5- and node js modules
     * this might be a security issue - to be tested and hardened
     * but for now we want to give the user the ability to do anything
     * to cover all use cases
     */
    if (additionalContext) {
      Object.assign(CONTEXT, additionalContext);
    }

    if (asyncc) {
      code = this.addImmediatelyInvokedAsync(code);
      vm.createContext(CONTEXT);
      await vm.runInContext(code, CONTEXT);
      let data = CONTEXT.data;
      let safeRes = CONTEXT.safeRes;
      // reset context 
      CONTEXT.data = {};
      CONTEXT.safeRes = {
        headers: null,
        httpStatus: null,
        message: null,
        status: null
      }
      return {data : data, safeRes: safeRes}
    } else {
      vm.createContext(CONTEXT);
      vm.runInContext(code, CONTEXT);
      let data = CONTEXT.data;
      if(code.includes("Model")){
        data = this.cleanUpData(CONTEXT.data, additionalContext?.projectId, additionalContext?.resourceId);
      }
      return data;
  }
}
  
}

export default EdgeService;