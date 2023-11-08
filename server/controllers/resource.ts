import { Response, Request} from "express";
import { SuccessResponse, ErrorResponse } from "../utils/responses";
import { Types } from "mongoose";
import ResourceService from "../services/resource";
const {ObjectId} = Types;

const rService = new ResourceService();

export const getResources = async function(req: Request, res: Response) : Promise<any> {
 
  try{
      
      const foundResources = await rService.find({});

      if (!foundResources) return ErrorResponse(res, 'resources not found', 400);

      return SuccessResponse(res, foundResources, 'fetching resources was successful', 200)

  } catch (err){
    return ErrorResponse(res, `error ${err}`, 400);

  }

}

export const deleteResource = async function(req: Request, res: Response) : Promise<any> {

  try{
    const id : Types.ObjectId = new ObjectId(req.query.id as string);

    const deleted = await rService.delete(id);

    if (!deleted) return ErrorResponse(res, 'resource not deleted', 400);

    return SuccessResponse(res, deleted, 'resource deleted', 200);

  } catch (err){
    return ErrorResponse(res, `error ${err}`, 400);

  }
  
}

export const createResource = async function(req: Request, res: Response) : Promise<any> {
 
  try{
    
    const newP = await rService.create(req.body);
    
    if (!newP) return ErrorResponse(res, 'resource not created', 400);

    return SuccessResponse(res, newP, 'resource created', 200);

  } catch (err){

    return ErrorResponse(res, `error ${err}`, 400);

  }
  
}

export const updateResources = async function(req: Request, res: Response) : Promise<any> {
 
  try{

      const updatedP = await rService.update(req.body);
  
      if (!updatedP) return ErrorResponse(res, 'resource not updated', 400);
  
      return SuccessResponse(res, updatedP, 'resource updated', 200);

  } catch (err){
    return ErrorResponse(res, `error ${err}`, 400);

  }
  
}