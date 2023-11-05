import Data from "../models/Data";
import DataModel, {IData} from "../models/Data";
import {Types} from "mongoose";

interface IResService {
  find(reosource: Object): Promise<any>;
  create(reosource: IData): Promise<any>;
  update(reosource: IData): Promise<any>;
  delete(id: Types.ObjectId): Promise<any>;
}

class DataService implements IResService  {
  constructor() {

  }

  find = async ( projection: Object) : Promise<any> => {
    const foundData = DataModel.find( 
       projection
       )
    
    return foundData;
  }

  create = async (project: IData) : Promise<any>  => {
    
    const dNew = new DataModel(project);
    const dCreated = await dNew.save();
    return dCreated;
  }

  update = async (r: IData) : Promise<any> => {
    
    const dUpdated = await DataModel.findOneAndUpdate(
      { _id: r._id },
      r,
      { new: true }
    );

    return dUpdated;
  }

  delete = async (id: Types.ObjectId) : Promise<any> => {
    
    const dDeleted = await DataModel.findByIdAndDelete(id);

    return dDeleted;
  }
  
}

export default DataService;