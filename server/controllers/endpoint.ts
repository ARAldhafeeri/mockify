import { IResource } from "../models/Resource";
import EndpointService from "../services/endpoint";
import ProjectService from "../services/project";
import { ErrorResponse, SuccessResponse } from "../utils/responses";
import { Request, Response } from "express";
import { Types } from "mongoose";

const projectService = new ProjectService();

export const endpointCreateController = async (req: Request, res: Response) : Promise<any> => {
  try {
    const data : IResource = req.body
    const project  = await projectService.find({_id: new Types.ObjectId(data.project) })
    
    if (!project) return ErrorResponse(res, "Project not found", 404)

    const result = await EndpointService.create(data.features, project[0].name,  data.resourceName);

    return SuccessResponse(res, result, "Endpoints fetched successfully", 200);
  } catch (err) {

    return ErrorResponse(res, `error ${err}`, 400);

  }
}