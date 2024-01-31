import { Response, Request} from "express";
import { SuccessResponse, ErrorResponse } from "../utils/responses";
import { Types } from "mongoose";
import ClientService from "../services/client";
import { IClient } from "../types/client";
const {ObjectId} = Types;

const cService = new ClientService();

export const getClient = async function(req: Request, res: Response) : Promise<any> {
 
  try{

      let projectId = req.query.projectId as string;

      const found : IClient = await cService.find({project: new ObjectId(projectId)});

      if (!found) return ErrorResponse(found, 'datas not found', 400);

      return SuccessResponse(res, found, 'fetching datas was successful', 200)

  } catch (err){
    return ErrorResponse(res, `error ${err}`, 400);

  }

}

export const deleteClient = async function(req: Request, res: Response) : Promise<any> {

  try{
    const id : Types.ObjectId = new ObjectId(req.query.id as string);

    const deleted = await cService.delete(id);

    if (!deleted) return ErrorResponse(res, 'data not deleted', 400);

    return SuccessResponse(res, deleted, 'data deleted', 200);

  } catch (err){
    return ErrorResponse(res, `error ${err}`, 400);

  }
  
}

export const createClient = async function(req: Request, res: Response) : Promise<any> {
 
  try{
    
    const dNew = await cService.create(req.body);
    
    if (!dNew) return ErrorResponse(res, 'data not created', 400);

    return SuccessResponse(res, dNew, 'data created', 200);

  } catch (err){

    return ErrorResponse(res, `error ${err}`, 400);

  }
  
}

export const updateClient = async function(req: Request, res: Response) : Promise<any> {
 
  try{

      let data = req.body;

      if (data._id || data.id || data.secret) return ErrorResponse(res, 'update information should contain only name, project', 400);

      const dUpdated = await cService.update(req.body);
  
      if (!dUpdated) return ErrorResponse(res, 'data not updated', 400);
  
      return SuccessResponse(res, dUpdated, 'data updated', 200);

  } catch (err){
    return ErrorResponse(res, `error ${err}`, 400);

  }
  
}