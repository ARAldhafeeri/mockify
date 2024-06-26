import { Response, Request} from "express";
import { SuccessResponse, ErrorResponse } from "../utils/responses";
import { Types } from "mongoose";
import DataService from "../services/data";
import ResourceService from "../services/resource";
import { IResource } from "../types/Resource";
import { IData } from "../types/Data";
const {ObjectId} = Types;

const dService = new DataService();
const rService = new ResourceService();

export const getData = async function(req: Request, res: Response) : Promise<any> {
 
  try{

      let resourceId : string = req.query.resourceId as string;

      const resource : IResource = await rService.findById(new ObjectId(resourceId));

      if (!resource) return ErrorResponse(res, `resource not found`, 400);
      
      const found : IData = await dService.find({resource: resource._id});

      if (!found) return ErrorResponse(found, 'datas not found', 400);

      return SuccessResponse(res, found, 'fetching datas was successful', 200)

  } catch (err){
    return ErrorResponse(res, `error ${err}`, 400);

  }

}

export const deleteData = async function(req: Request, res: Response) : Promise<any> {

  try{
    const id : Types.ObjectId = new ObjectId(req.query.id as string);

    const deleted = await dService.delete(id);

    if (!deleted) return ErrorResponse(res, 'data not deleted', 400);

    return SuccessResponse(res, deleted, 'data deleted', 200);

  } catch (err){
    return ErrorResponse(res, `error ${err}`, 400);

  }
  
}

export const createData = async function(req: Request, res: Response) : Promise<any> {
 
  try{
    
    const dNew = await dService.create(req.body);
    
    if (!dNew) return ErrorResponse(res, 'data not created', 400);

    return SuccessResponse(res, dNew, 'data created', 200);

  } catch (err){

    return ErrorResponse(res, `error ${err}`, 400);

  }
  
}

export const updateData = async function(req: Request, res: Response) : Promise<any> {
 
  try{

      const dUpdated = await dService.update(req.body);
  
      if (!dUpdated) return ErrorResponse(res, 'data not updated', 400);
  
      return SuccessResponse(res, dUpdated, 'data updated', 200);

  } catch (err){
    return ErrorResponse(res, `error ${err}`, 400);

  }
  
}