import { IResource } from "../entities/resource";
import { endpointService, projectService } from "../services";
import { ErrorResponse, SuccessResponse } from "../utils/responses";
import { Request, Response } from "express";
import { Types } from "mongoose";

const ObjectId = Types.ObjectId;

export const endpointCreateController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const data: IResource = req.body;
    const project = await projectService.findOne({
      _id: new ObjectId(data?.project),
    });

    if (!project) return ErrorResponse(res, "Project not found", 404);

    const result = await endpointService.create(data);

    return SuccessResponse(res, result, "Endpoints fetched successfully", 200);
  } catch (err) {
    return ErrorResponse(res, `error ${err}`, 400);
  }
};
