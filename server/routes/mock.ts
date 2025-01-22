import express from "express";

import {
  MOCK_ROUTE,
  MOCK_ROUTE_FILTER,
  MOCK_ROUTE_PAGINATE,
  MOCK_ROUTE_RESOURCE_PARAM,
  MOCK_ROUTE_VALIDATE,
} from "../config/routes";
import { AccessKeyAuthorization } from "../middleware/authorization";
import { mockController } from "../controllers";
const mockRouter = express.Router();

mockRouter.get(
  MOCK_ROUTE_RESOURCE_PARAM,
  AccessKeyAuthorization,
  mockController.getx
);
mockRouter.get(
  MOCK_ROUTE_RESOURCE_PARAM + MOCK_ROUTE_PAGINATE,
  AccessKeyAuthorization,
  mockController.getXPagination
);
mockRouter.get(
  MOCK_ROUTE_RESOURCE_PARAM + MOCK_ROUTE_FILTER,
  AccessKeyAuthorization,
  mockController.getXFilteration
);

mockRouter.post(
  MOCK_ROUTE_RESOURCE_PARAM,
  AccessKeyAuthorization,
  mockController.postx
);
mockRouter.post(
  MOCK_ROUTE_RESOURCE_PARAM + MOCK_ROUTE_VALIDATE,
  AccessKeyAuthorization,
  mockController.postXValidate
);

mockRouter.put(
  MOCK_ROUTE_RESOURCE_PARAM,
  AccessKeyAuthorization,
  mockController.putx
);
mockRouter.put(
  MOCK_ROUTE_RESOURCE_PARAM + MOCK_ROUTE_VALIDATE,
  AccessKeyAuthorization,
  mockController.putXValidate
);

mockRouter.delete(
  MOCK_ROUTE_RESOURCE_PARAM,
  AccessKeyAuthorization,
  mockController.delx
);
export default mockRouter;
