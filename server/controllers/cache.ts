import { Response, Request } from "express";
import CacheService from "../services/cache";
import { Types } from "mongoose";
import { ErrorResponse, SuccessResponse } from "../utils/responses";
const {ObjectId} = Types;

const cacheService = new CacheService();

const getCache = async function(req : Request, res: Response) : Promise<any> {
  try {

    let projectName = req.params.projectName as string;
    
    let key = req.query.key as string;

    let tenantKey = await cacheService.addProjectNameToKey(projectName, key);

    if (key){
        
      const data = await cacheService.get(tenantKey);
      return res.status(200).send({status: true, data: data, message : "Cache retrieved"});

    } else {

      const data = await cacheService.getAllProjectDataJSON(projectName);
      return res.status(200).send({status: true, data: data,  message : "Cache retrieved"});

    }

  } catch (err){

      res.status(400).send({status: false, message: ` error ${err}`})

  }
}

const setCacheKey = async function(req : Request, res: Response) : Promise<any> {
  try {

    let key = req.query.key as string;

    let value : any = req.body;

    value = JSON.stringify(value);

    let projectName = req.params.projectName as string;

    let tenantKey = await cacheService.addProjectNameToKey(projectName, key);

    const data = await cacheService.set(tenantKey, value);

    return SuccessResponse(res, data, "Cache updated", 200);


  } catch (err){

      res.status(400).send({status: false, message: ` error ${err}`})

  }

}

const deleteCacheKey = async function(req : Request, res: Response) : Promise<any> {
  try {
    
    let key = req.query.key as string;

    let projectName = req.params.projectName as string;

    let tenantKey = await cacheService.addProjectNameToKey(projectName, key);

    const deleted = await cacheService.del(tenantKey);

    if (!deleted) return ErrorResponse(res, "Error deleting cache key", 400)

    return SuccessResponse(res, deleted, "Cache deleted", 200);

  } catch (err){

      res.status(400).send({status: false, message: ` error ${err}`})

  }

}

export { getCache, setCacheKey, deleteCacheKey };

    

