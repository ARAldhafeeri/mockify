import { asyncController } from "../utils/handlers";
import { SuccessResponse, ErrorResponse } from "../utils/responses";
import { Types } from "mongoose";
import Controller from "./generic";
import {
  IMockController,
  IMockService,
  IPaginateParams,
} from "../entities/mock";
import { IResService } from "../entities/resource";

const { ObjectId } = Types;

class MockController
  extends Controller<IMockService>
  implements IMockController
{
  resourceService: IResService;
  mockService: IMockService;
  constructor(mockService: IMockService, resourceService: IResService) {
    super(mockService);
    this.resourceService = resourceService;
    this.mockService = mockService;
  }

  getx = asyncController(async (req, res) => {
    const resourceId = req.params.resourceId;
    const resource = await this.resourceService.findById(
      new ObjectId(resourceId)
    );

    if (!resource) ErrorResponse(res, "resource not found", 400);
    if (!resource.features.getx)
      ErrorResponse(res, "getx feature disabled", 400);

    const data = await this.service.findOne({ resource: resource._id });
    if (!data) ErrorResponse(res, "datas not found", 400);

    return SuccessResponse(res, data, "fetching datas was successful", 200);
  });

  getXPagination = asyncController(async (req, res) => {
    const resourceId = req.params.resourceId;
    const { page, limit } = req.query;

    const resource = await this.resourceService.findById(
      new ObjectId(resourceId)
    );
    if (!resource) return ErrorResponse(res, "resource not found", 400);
    if (!resource.features.getx)
      return ErrorResponse(res, "getx feature disabled", 400);

    const params = { page, limit } as IPaginateParams;
    const validParams = this.mockService.isPaginated(resource.features, params);

    if (!validParams)
      return ErrorResponse(
        res,
        "invalid params or pagination feature disabled",
        400
      );

    const data = await this.mockService.paginatedQuery(
      { resource: resource._id },
      params
    );
    if (!data) return ErrorResponse(res, "datas not found", 400);

    return SuccessResponse(res, data, "fetching datas was successful", 200);
  });

  getXFilteration = asyncController(async (req, res) => {
    const resourceId = req.params.resourceId;
    const { name, value } = req.query;

    const resource = await this.resourceService.findById(
      new ObjectId(resourceId)
    );
    if (!resource) return ErrorResponse(res, "resource not found", 400);
    if (!resource.features.getx)
      return ErrorResponse(res, "getx feature disabled", 400);

    const params = { name, value } as any;
    const validParams = this.mockService.isFilter(resource.features, params);

    if (!validParams)
      return ErrorResponse(
        res,
        "invalid params or filter feature disabled",
        400
      );

    const projection = {
      [`data.${params.name}`]: params.value,
      resource: resource._id,
    };

    const data = await this.mockService.filterQuery(projection as any);
    if (!data) return ErrorResponse(res, "datas not found", 400);

    return SuccessResponse(res, data, "fetching datas was successful", 200);
  });

  delx = asyncController(async (req, res) => {
    const deleted = await this.service.delete(req.query.id as string);

    if (!deleted) return ErrorResponse(res, "data not deleted", 400);

    return SuccessResponse(res, deleted, "data deleted", 200);
  });

  postx = asyncController(async (req, res) => {
    const resourceId = req.params.resourceId;
    const resource = await this.resourceService.findById(
      new ObjectId(resourceId)
    );

    if (!resource) ErrorResponse(res, "resource not found", 400);
    if (!resource.features.postx)
      ErrorResponse(res, "postx feature disabled", 400);

    const newData = await this.service.create({
      resource: resource._id,
      data: req.body,
    });
    if (!newData) ErrorResponse(res, "data not created", 400);

    return SuccessResponse(res, newData, "data created", 200);
  });

  postXValidate = asyncController(async (req, res) => {
    const resourceId = req.params.resourceId;
    const resource = await this.resourceService.findById(
      new ObjectId(resourceId)
    );

    if (!resource) return ErrorResponse(res, "resource not found", 400);
    if (!resource.features.postx || !resource.features.validation) {
      return ErrorResponse(res, "postx or validation feature disabled", 400);
    }

    const validatedData = await this.mockService.validateAndCreateQuery(
      req.body,
      resource.fields,
      resource._id?.toString() as string
    );

    if (!validatedData) return ErrorResponse(res, "data not created", 400);

    return SuccessResponse(res, validatedData, "data created", 200);
  });

  putx = asyncController(async (req, res) => {
    const resourceId = req.params.resourceId;
    const resource = await this.resourceService.findById(
      new ObjectId(resourceId)
    );

    if (!resource) ErrorResponse(res, "resource not found", 400);
    if (!resource.features.putx)
      ErrorResponse(res, "putx feature disabled", 400);

    const updatedData = await this.service.update(req.body);
    if (!updatedData) ErrorResponse(res, "data not updated", 400);

    return SuccessResponse(res, updatedData, "data updated", 200);
  });

  putXValidate = asyncController(async (req, res) => {
    const resourceId = req.params.resourceId;
    const resource = await this.resourceService.findById(
      new ObjectId(resourceId)
    );

    if (!resource) return ErrorResponse(res, "resource not found", 400);
    if (!resource.features.putx || !resource.features.validation) {
      return ErrorResponse(res, "putx or validation feature disabled", 400);
    }

    const validatedUpdate = await this.mockService.validateAndUpdateQuery(
      req.body,
      resource.fields,
      resource._id?.toString() as string
    );

    if (!validatedUpdate) return ErrorResponse(res, "data not updated", 400);

    return SuccessResponse(res, validatedUpdate, "data updated", 200);
  });
}

export default MockController;
