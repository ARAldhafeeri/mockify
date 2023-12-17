import Data from "../models/Data";
import DataModel from "../models/Data";
import {Types} from "mongoose";
import { IData } from "../types/Data";
import ResourceService from "./resource";
import { IResService } from "../types/Resource";
import { IDataService } from "../types/Data";
const {ObjectId} = Types;


class DataService implements IDataService  {

  resourceService: IResService;

  constructor() {
    this.resourceService = new ResourceService();
  }

  find = async ( projection: Object) : Promise<any> => {

    const found = await DataModel.find( 
       projection
       )
    
    return found;
  }

  create = async (d: IData) : Promise<any>  => {
    
    let resource = await this.resourceService.findById(d.resource);

    if (!resource) throw new Error('resource not found');

    let fieldsNames : Array<string> = [];

    resource.fields.forEach((field : {name: string, type: string, required: string}) => {
      fieldsNames.push(field.name);
    });

    Object.keys(d.data).forEach((key) => {
      if (!fieldsNames.includes(key)) throw new Error(`field ${key} not found in schema`);
    })

    const dNew = new DataModel(d);
    const dCreated = await dNew.save();
    return dCreated;
  }

  update = async (d: IData) : Promise<any> => {
    
    const dUpdated = await DataModel.findOneAndUpdate(
      { _id: d._id },
      d,
      { new: true }
    );

    return dUpdated;
  }

  delete = async (id: Types.ObjectId) : Promise<any> => {
    
    const dDeleted = await DataModel.findByIdAndDelete(id);

    return dDeleted;
  }

  findOrCreate = async (data: IData) : Promise<any> => {
    const found = await DataModel.findOne({resource: data.resource});
    
    if (found) {
      return found;
    }

    const NEW = new DataModel(data);
    const created = await NEW.save();
    return created;
  }
  
}

export default DataService;