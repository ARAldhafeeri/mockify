import { Response, Request} from "express";
import ProjectService from "../services/project";
import { SuccessResponse, ErrorResponse } from "../utils/responses";
import { Types } from "mongoose";
import CryptoService from "../services/crypto";
import { getUserRoleFromToken } from "../middleware/authorization";
const {ObjectId} = Types;
import { superAdmin } from "../config/roles";

const pService = new ProjectService();
const cryptoService = new CryptoService();

export const getProjects = async function(req: Request, res: Response) : Promise<any> {
 
  try{

      let token : string | undefined  = req.headers["authorization"]
      token = token?.split(" ")[1];
      let authenticatedUserData = await getUserRoleFromToken(token as string);

      let foundProjects : any;
      const isSuperAdmin = authenticatedUserData.role === superAdmin;
      if(isSuperAdmin){
        foundProjects = await pService.find({});
      } else {
        foundProjects =  await pService.find({user : new ObjectId(authenticatedUserData.id)});
      }

      if (!foundProjects) return ErrorResponse(res, 'projects not found', 400);

      return SuccessResponse(res, foundProjects, 'fetching projects was successful', 200)

  } catch (err){
    return ErrorResponse(res, `error ${err}`, 400);

  }

}

export const deleteProject = async function(req: Request, res: Response) : Promise<any> {

  try{
    const id : Types.ObjectId = new ObjectId(req.query.id as string);

    const deletedP = await pService.delete(id);

    if (!deletedP) return ErrorResponse(res, 'project not deleted', 400);

    return SuccessResponse(res, deletedP, 'project deleted', 200);

  } catch (err){
    return ErrorResponse(res, `error ${err}`, 400);

  }
  
}

export const createProject = async function(req: Request, res: Response) : Promise<any> {
 
  try{

    let  data : any = req.body;
    
    data?.apiKey = await cryptoService.generateAPIKey();

    const newP = await pService.create(req.body);
    
    if (!newP) return ErrorResponse(res, 'project not created', 400);

    return SuccessResponse(res, newP, 'project created', 200);

  } catch (err){

    return ErrorResponse(res, `error ${err}`, 400);

  }
  
}

export const updateProjects = async function(req: Request, res: Response) : Promise<any> {
 
  try{

      let data = req.body;
      
      if(data?.apiKey) return ErrorResponse(res, 'apiKey cannot be updated', 400);

      const updatedP = await pService.update(req.body);
  
      if (!updatedP) return ErrorResponse(res, 'project not updated', 400);
  
      return SuccessResponse(res, updatedP, 'project updated', 200);
  } catch (err){
    return ErrorResponse(res, `error ${err}`, 400);

  }
  
}

export const refreshProjectApiKey = async function(req: Request, res: Response) : Promise<any> {
 
  try{      
      let data = req.body;

      let apiKey = await cryptoService.generateAPIKey();

      data?.apiKey = apiKey; // refresh api key and update

      const updatedP = await pService.update(data);
  
      if (!updatedP) return ErrorResponse(res, 'project not updated', 400);
  
      return SuccessResponse(res, updatedP, 'project updated', 200);
      
  } catch (err){

    return ErrorResponse(res, `error ${err}`, 400);

  }
}
