import { Response, Request} from "express";
import { SuccessResponse, ErrorResponse } from "../utils/responses";
import { Types } from "mongoose";
import EventService from "../services/event";
import ResourceService from "../services/resource";
import { IResource } from "../types/Resource";
import { IEvent } from "../types/Event";
const {ObjectId} = Types;

const eService = new EventService();
const rService = new ResourceService();

export const getEvent = async function(req: Request, res: Response) : Promise<any> {
 
  try{

      let resourceName : string = req.query.resourceName as string;

      const resource : IResource = await rService.findOne({resourceName: resourceName});

      if (!resource) return ErrorResponse(res, `resource ${resourceName} not found`, 400);
      
      const found : IEvent = await eService.find({resource: resource._id});

      if (!found) return ErrorResponse(found, 'events not found', 400);

      return SuccessResponse(res, found, 'fetching events was successful', 200)

  } catch (err){
    return ErrorResponse(res, `error ${err}`, 400);

  }

}

export const deleteEvent = async function(req: Request, res: Response) : Promise<any> {

  try{
    const id : Types.ObjectId = new ObjectId(req.query.id as string);

    const found : IEvent = await eService.findOne({_id : new ObjectId(id)});
    const deleted = await eService.delete(id);

    if (!deleted) return ErrorResponse(res, 'event not deleted', 400);

    // remove registered event
    await eService.dynamicallyRemoveEvent(found)

    return SuccessResponse(res, deleted, 'event deleted', 200);

  } catch (err){
    return ErrorResponse(res, `error ${err}`, 400);

  }
  
}

export const createEvent = async function(req: Request, res: Response) : Promise<any> {
 
  try{
    
    const eNew = await eService.create(req.body);
    
    if (!eNew) return ErrorResponse(res, 'event not created', 400);
    
    // add registered event 
    await eService.dynamicallyAddEvent(eNew)
    return SuccessResponse(res, eNew, 'event created', 200);

  } catch (err){

    return ErrorResponse(res, `error ${err}`, 400);

  }
  
}

export const updateEvent = async function(req: Request, res: Response) : Promise<any> {
 
  try{

      const dUpdated = await eService.update(req.body);
  
      if (!dUpdated) return ErrorResponse(res, 'event not updated', 400);
      
      // update registered event
      await eService.dyamicallyUpdateEventInRunTime(dUpdated, req.body);

      return SuccessResponse(res, dUpdated, 'event updated', 200);

  } catch (err){
    return ErrorResponse(res, `error ${err}`, 400);

  }
  
}