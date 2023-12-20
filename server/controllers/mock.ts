import { Response, Request} from "express";
import { SuccessResponse, ErrorResponse } from "../utils/responses";
import { Types } from "mongoose";
import DataService from "../services/data";
import ResourceService from "../services/resource";
import { IResource } from "../types/Resource";
import { IData } from "../types/Data";
import MockService from "../services/mock";
import { IFilterParams, IPaginateParams, IPaginatedResponse } from "../types/Mock";
const {ObjectId} = Types;

const dService = new DataService();
const rService = new ResourceService();
const mService = new MockService();

export const getx = async function(req: Request, res: Response) : Promise<any> {
 
  try{

      let resourceName : string = req.params.resourceName as string;

      const resource : IResource = await rService.findOne({resourceName: resourceName});

      if (!resource) return ErrorResponse(res, `resource ${resourceName} not found`, 400);
      
      if(!resource.features.getx) return ErrorResponse(res, `getx feature disabled`, 400);

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

      if(!resource.features.getx) return ErrorResponse(res, `getx feature disabled`, 400);

      const params : IPaginateParams = {
        page: page,
        limit: limit
      }

      const validParams = mService.isPaginated(resource.features, params);

      if (!validParams) return ErrorResponse(res, `invalid params or pagination feature disabled`, 400);

      
      const found : IPaginatedResponse = await mService.paginatedQuery({resource: resource._id}, params);

      if (!found) return ErrorResponse(found, 'datas not found', 400);

      return SuccessResponse(res, found, 'fetching datas was successful', 200)

  } catch (err){
    return ErrorResponse(res, `error ${err}`, 400);

  }

}


export const getXFilteration = async function(req: Request, res: Response) : Promise<any> {
 
  try{

      let resourceName : string = req.params.resourceName as string;
      
      let name : string = req.query.name as string;
      let value : string = req.query.value as string;

      const resource : IResource = await rService.findOne({resourceName: resourceName});

      if (!resource) return ErrorResponse(res, `resource ${resourceName} not found`, 400);

      if(!resource.features.getx) return ErrorResponse(res, `getx feature disabled`, 400);

      const params : IFilterParams = {
        name: name,
        value: value
      }


      const validParams = mService.isFilter(resource.features, params);

      if (!validParams) return ErrorResponse(res, `invalid params or filter feature disabled`, 400);

      
      const projection = {
        ["data." + params.name] : params.value,
        resource: resource._id
      }

      const found : any = await mService.filterQuery(projection);

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
    
    let resourceName : string = req.params.resourceName as string;
    
    const resource : IResource = await rService.findOne({resourceName: resourceName});

    if (!resource) return ErrorResponse(res, `resource ${resourceName} not found`, 400);

    if(!resource.features.postx) return ErrorResponse(res, `postx feature disabled`, 400);

    const dNew = await dService.create(
      {resource: resource._id, data: req.body} as IData
    );
    
    if (!dNew) return ErrorResponse(res, 'data not created', 400);

    return SuccessResponse(res, dNew, 'data created', 200);

  } catch (err){

    return ErrorResponse(res, `error ${err}`, 400);

  }
  
}

export const postXValidate = async function(req: Request, res: Response) : Promise<any> {
 
  try{
    
    let resourceName : string = req.params.resourceName as string;
    
    const resource : IResource = await rService.findOne({resourceName: resourceName});

    if (!resource) return ErrorResponse(res, `resource ${resourceName} not found`, 400);

    if(!resource.features.postx) return ErrorResponse(res, `postx feature disabled`, 400);
    if(!resource.features.validation) return ErrorResponse(res, `validation feature disabled`, 400);


    const dNew = await mService.validateAndCreateQuery(
        req.body, resource.fields, resource._id
      );
    
    if (!dNew) return ErrorResponse(res, 'data not created', 400);

    return SuccessResponse(res, dNew, 'data created', 200);

  } catch (err){

    return ErrorResponse(res, `error ${err}`, 400);

  }
  
}

export const putx = async function(req: Request, res: Response) : Promise<any> {
 
  try{
    
    let resourceName : string = req.params.resourceName as string;
    
    const resource : IResource = await rService.findOne({resourceName: resourceName});

    if (!resource) return ErrorResponse(res, `resource ${resourceName} not found`, 400);

    if(!resource.features.putx) return ErrorResponse(res, `putx feature disabled`, 400);

    const dNew = await dService.update(req.body);
    
    console.log(dNew)
    if (!dNew) return ErrorResponse(res, 'data not created', 400);

    return SuccessResponse(res, dNew, 'data created', 200);

  } catch (err){

    return ErrorResponse(res, `error ${err}`, 400);

  }
  
}

export const putXValidate = async function(req: Request, res: Response) : Promise<any> {
 
  try{
    
    let resourceName : string = req.params.resourceName as string;
    
    const resource : IResource = await rService.findOne({resourceName: resourceName});

    if (!resource) return ErrorResponse(res, `resource ${resourceName} not found`, 400);

    if(!resource.features.putx) return ErrorResponse(res, `putx feature disabled`, 400);
    if(!resource.features.validation) return ErrorResponse(res, `validation feature disabled`, 400);


    const dNew = await mService.validateAndUpdateQuery(
        req.body, resource.fields, resource._id
      );
    
    if (!dNew) return ErrorResponse(res, 'data not created', 400);

    return SuccessResponse(res, dNew, 'data created', 200);

  } catch (err){

    return ErrorResponse(res, `error ${err}`, 400);

  }
  
}
