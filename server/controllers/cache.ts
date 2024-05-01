import { Response, Request } from "express";
import CacheService from "../services/cache";
import { Types } from "mongoose";
import { ErrorResponse, SuccessResponse } from "../utils/responses";
const {ObjectId} = Types;

const cacheService = new CacheService();

const getCache = async function(req : Request, res: Response) : Promise<any> {
  try {

    let projectId = req.params.projectId as string;
    
    let key = req.query.key as string;


    let tenantKey = cacheService.addProjectNameToKey(projectId, key);
    let data : any;
    if (key){
        
      data = await cacheService.get(tenantKey);

    } else {

      data = await cacheService.getAllProjectDataJSON(projectId);

    }

    if (!data) return ErrorResponse(res, "Cache key not found", 404);

    return SuccessResponse(res, data, "Cache key retrieved", 200);

  } catch (err){

      res.status(400).send({status: false, message: ` error ${err}`})

  }
}

const setCacheKey = async function(req : Request, res: Response) : Promise<any> {
  try {

    let key = req.query.key as string;

    let body : any = req.body;

    let projectId = req.params.projectId as string;

    let tenantKey = cacheService.addProjectNameToKey(projectId, key);

    const seted = await cacheService.set(tenantKey, body.value);

    if (!seted) return ErrorResponse(res, "Error updating cache key", 400)
    return SuccessResponse(res, {key: key, value: body.value}, "Cache updated", 200);


  } catch (err){

      res.status(400).send({status: false, message: ` error ${err}`})

  }

}

const deleteCacheKey = async function(req : Request, res: Response) : Promise<any> {
  try {
    
    let key = req.query.key as string;

    let projectId = req.params.projectId as string;

    let tenantKey = cacheService.addProjectNameToKey(projectId, key);

    const deleted = await cacheService.del(tenantKey);

    if (!deleted) return ErrorResponse(res, "Error deleting cache key", 400)

    return SuccessResponse(res, key, "Cache deleted", 200);

  } catch (err){

      res.status(400).send({status: false, message: ` error ${err}`})

  }

}

export { getCache, setCacheKey, deleteCacheKey };

    

