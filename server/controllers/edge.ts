import { Response, Request } from "express";
import { SuccessResponse, ErrorResponse } from "../utils/responses";
import { Types } from "mongoose";
import EdgeService from "../services/edge";
import { IResource } from "../entities/resource";
import { IEdge, IEdgeController, IEdgeService } from "../entities/edge";
import Controller from "./generic";
import { edgeService, resourceService } from "../services";

const { ObjectId } = Types;

class EdgeController
  extends Controller<EdgeService>
  implements IEdgeController {}

export const runFunction = (method: string, featureName: string) => {
  return async function (req: Request, res: Response): Promise<any> {
    try {
      const resourceId: string = req.params.resourceId as string;
      const edgeId: string = req.params.edgeId as string;
      const queries: any = req.query;
      const headers: any = req.headers;
      const body: any = req.body;
      const params: any = req.params;

      const additionalContext = {
        queries,
        headers,
        body,
        params,
        resourceId: "",
        projectId: "",
      };

      const resource: IResource = await resourceService.findOne(
        new ObjectId(resourceId)
      );

      if (!resource) return ErrorResponse(res, `resource not found`, 400);

      const found: IEdge = await edgeService.findById(new ObjectId(edgeId));

      if (!found) return ErrorResponse(found, "function does not exists", 400);

      if (
        !(resource.features as any)[featureName] &&
        !resource.features.functions
      )
        return ErrorResponse(
          res,
          `${featureName} and/or function are disabled`,
          400
        );
      const { code } = found;

      additionalContext.resourceId = resource._id?.toString() as string;
      additionalContext.projectId = resource.project.toString();

      const { data, safeRes } = await edgeService.runFunctionInContext(
        code,
        true,
        additionalContext
      );

      let message = safeRes.message ?? "fetching data was successful";
      if (safeRes.headers) {
        for (const [key, value] of Object.entries(safeRes.headers)) {
          res.setHeader(key, value as string);
        }
      }
      let status = safeRes.httpStatus ?? 200;

      return SuccessResponse(res, data, message, status);
    } catch (err) {
      return ErrorResponse(res, `error ${err} `, 400);
    }
  };
};

export default EdgeController;
