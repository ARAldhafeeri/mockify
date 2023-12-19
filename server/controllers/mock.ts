import { Response, Request} from "express";
import { SuccessResponse, ErrorResponse } from "../utils/responses";
import { Types } from "mongoose";
import DataService from "../services/data";
import ResourceService from "../services/resource";
import { IResource } from "../types/Resource";
import { IData } from "../types/Data";
import MockService from "../services/mock";
import { IPaginateParams, IPaginatedResponse } from "../types/Mock";
const {ObjectId} = Types;

const dService = new DataService();
const rService = new ResourceService();
const mService = new MockService();

export const getx = async function(req: Request, res: Response) : Promise<any> {
 
  try{

      let resourceName : string = req.params.resourceName as string;

      const resource : IResource = await rService.findOne({resourceName: resourceName});

      if (!resource) return ErrorResponse(res, `resource ${resourceName} not found`, 400);
      
      const found : IData = await dService.find({resource: resource._id});

      if (!found) return ErrorResponse(found, 'datas not found', 400);

      return SuccessResponse(res, found, 'fetching datas was successful', 200)

  } catch (err){
    return ErrorResponse(res, `error ${err}`, 400);

  }

}

export const getXPagination = async function(req: Request, res: Response) : Promise<any> {
 
  try{

      let resourceName : string = req.params.resourceName as string;
      
      let page : string = req.query.page as string;
      let limit : string = req.query.limit as string;


      const resource : IResource = await rService.findOne({resourceName: resourceName});

      if (!resource) return ErrorResponse(res, `resource ${resourceName} not found`, 400);

      const params : IPaginateParams = {
        page: page,
        limit: limit
      }

      const validParams = mService.isPaginated(resource.features, params);

      if (!validParams) return ErrorResponse(res, `invalid params or pagination feature is not enabled for this resource`, 400);

      
      const found : IPaginatedResponse = await mService.paginatedQuery({resource: resource._id}, params);

      if (!found) return ErrorResponse(found, 'datas not found', 400);

      return SuccessResponse(res, found, 'fetching datas was successful', 200)

  } catch (err){
    return ErrorResponse(res, `error ${err}`, 400);

  }

}

export const delx = async function(req: Request, res: Response) : Promise<any> {

  try{
    const id : Types.ObjectId = new ObjectId(req.query.id as string);

    const deleted = await dService.delete(id);

    if (!deleted) return ErrorResponse(res, 'data not deleted', 400);

    return SuccessResponse(res, deleted, 'data deleted', 200);

  } catch (err){
    return ErrorResponse(res, `error ${err}`, 400);

  }
  
}

export const postx = async function(req: Request, res: Response) : Promise<any> {
 
  try{
    
    const dNew = await dService.create(req.body);
    
    if (!dNew) return ErrorResponse(res, 'data not created', 400);

    return SuccessResponse(res, dNew, 'data created', 200);

  } catch (err){

    return ErrorResponse(res, `error ${err}`, 400);

  }
  
}

export const putx = async function(req: Request, res: Response) : Promise<any> {
 
  try{

      const dUpdated = await dService.update(req.body);
  
      if (!dUpdated) return ErrorResponse(res, 'data not updated', 400);
  
      return SuccessResponse(res, dUpdated, 'data updated', 200);

  } catch (err){
    return ErrorResponse(res, `error ${err}`, 400);

  }
  
}