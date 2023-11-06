import { IResource } from "../models/Resource";
import EndpointService from "../services/endpoint";
import { ErrorResponse, SuccessResponse } from "../utils/responses";
import { Request, Response } from "express";

export const endpointCreateController = async (req: Request, res: Response) : Promise<any> => {
  try {
    const data : IResource = req.body
    const result = await EndpointService.create(data.features, data.resourceName);

    return SuccessResponse(res, result, "Endpoints fetched successfully", 200);
  } catch (err) {

    return ErrorResponse(res, `error ${err}`, 400);

  }
}