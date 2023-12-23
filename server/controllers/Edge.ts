import { Response, Request} from "express";
import { SuccessResponse, ErrorResponse } from "../utils/responses";
import { Types } from "mongoose";
import EdgeService from "../services/Edge";
import ResourceService from "../services/resource";
import { IResource } from "../types/Resource";
import { IEdge } from "../types/Edge";
const {ObjectId} = Types;

const edgeService = new EdgeService();
const rService = new ResourceService();

export const getEdge = async function(req: Request, res: Response) : Promise<any> {
 
  try{

      let resourceName : string = req.query.resourceName as string;

      const resource : IResource = await rService.findOne({resourceName: resourceName});

      if (!resource) return ErrorResponse(res, `resource ${resourceName} not found`, 400);
      
      const found : IEdge = await edgeService.find({resource: resource._id});

      if (!found) return ErrorResponse(found, 'datas not found', 400);

      return SuccessResponse(res, found, 'fetching datas was successful', 200)

  } catch (err){
    return ErrorResponse(res, `error ${err}`, 400);

  }

}

export const deleteEdge = async function(req: Request, res: Response) : Promise<any> {

  try{
    const id : Types.ObjectId = new ObjectId(req.query.id as string);

    const deleted = await edgeService.delete(id);

    if (!deleted) return ErrorResponse(res, 'edge not deleted', 400);

    return SuccessResponse(res, deleted, 'edge deleted', 200);

  } catch (err){
    return ErrorResponse(res, `error ${err}`, 400);

  }
  
}

export const createEdge = async function(req: Request, res: Response) : Promise<any> {
 
  try{
    
    const dNew = await edgeService.create(req.body);
    
    if (!dNew) return ErrorResponse(res, 'edge not created', 400);

    return SuccessResponse(res, dNew, 'edge created', 200);

  } catch (err){

    return ErrorResponse(res, `error ${err}`, 400);

  }
  
}

export const updateEdge = async function(req: Request, res: Response) : Promise<any> {
 
  try{

      const dUpdated = await edgeService.update(req.body);
  
      if (!dUpdated) return ErrorResponse(res, 'edge not updated', 400);
  
      return SuccessResponse(res, dUpdated, 'edge updated', 200);

  } catch (err){
    return ErrorResponse(res, `error ${err}`, 400);

  }
  
}


export const runFunction = (method : string, featureName : string) => {
  return  async function(req: Request, res: Response) : Promise<any> {
   
    try{
  
        const resourceName : string = req.params.resourceName as string;
        const functionName : string = req.params.functionName as string;
        const queries : any = req.query;
        const headers : any = req.headers;
        const body : any = req.body;
        const params : any = req.params;
  
        const additionalContext = {
          queries,
          headers,
          body,
          params
        }
  
        const resource : IResource = await rService.findOne({resourceName: resourceName});
  
        if (!resource) return ErrorResponse(res, `resource ${resourceName} not found`, 400);
        
        const found : IEdge = await edgeService.findOne({resource: resource._id, name: functionName, method: method});
  
        if (!found) return ErrorResponse(found, 'function does not exists', 400);
  
        if(!(resource.features as any)[featureName] && !resource.features.functions) return ErrorResponse(res, `${featureName} and/or function are disabled`, 400)
        const {code} = found;
  
        const result = await edgeService.runFunctionInContext(code, true, additionalContext);
  
        return SuccessResponse(res, result, 'fetching data was successful', 200)
  
    } catch (err){
      return ErrorResponse(res, `error ${err}`, 400);
  
    }
  
  }
}
