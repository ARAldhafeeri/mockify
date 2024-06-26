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

      if (!found) return ErrorResponse(found, 'client not found', 400);

      return SuccessResponse(res, found, 'fetching client was successful', 200)

  } catch (err){
    return ErrorResponse(res, `error ${err}`, 400);

  }

}

export const deleteClient = async function(req: Request, res: Response) : Promise<any> {

  try{
    const id : Types.ObjectId = new ObjectId(req.query.id as string);

    const deleted = await cService.delete(id);

    if (!deleted) return ErrorResponse(res, 'client not deleted', 400);

    return SuccessResponse(res, deleted, 'client deleted', 200);

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
  
      if (!dUpdated) return ErrorResponse(res, 'client not updated', 400);
  
      return SuccessResponse(res, dUpdated, 'client updated', 200);

  } catch (err){
    return ErrorResponse(res, `error ${err}`, 400);

  }
  
}

export const verifyClientCredentials = async function(req: Request, res: Response) : Promise<any> {

  try {
    let data  = req.body;

    if (!data.clientId || data.clientSecret)return ErrorResponse(res, 'request body must have clientId, clientSecret to verify', 400);

    const found = await cService.findOne({id: data.clientId, secret: data.clientSecret})
    
    if (!found) return ErrorResponse(res, 'incorrect client credintiaals', 400);

    return SuccessResponse(res, true, 'client verified', 200);


  } catch (err){

  }
}
