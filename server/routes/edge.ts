import express from "express";
import { runFunction } from "../controllers/edge";
import {
  EDGE_PARAMS_ROUTE,
  EDGE_ROUTE,
  EDGE_ROUTE_WITH_PARAMS,
  ROOT_ROUTE,
  WITH_RESOURCE_ID_ROUTE,
} from "../config/routes";
import authenticationMiddleWareAdminPortal from "../middleware/authentication";
import { AccessKeyAuthorization } from "../middleware/authorization";
import { METHODS, FEATURES } from "../config/edge";
import {
  authorizeDelete,
  authorizeUpdate,
  authorizeWrite,
  authorizerRead,
} from "../utils/authorize";
import { edgeController } from "../controllers";
const ManagementEdgeRouter = express.Router();
const PublicEdgeRouter = express.Router();

const name = "edge";

ManagementEdgeRouter.use(authenticationMiddleWareAdminPortal);
PublicEdgeRouter.use(AccessKeyAuthorization);

ManagementEdgeRouter.get(
  WITH_RESOURCE_ID_ROUTE,
  authorizerRead(name),
  edgeController.fetch
)
  .post(ROOT_ROUTE, authorizeWrite(name), edgeController.create)
  .put(ROOT_ROUTE, authorizeUpdate(name), edgeController.update)
  .delete(ROOT_ROUTE, authorizeDelete(name), edgeController.delete);

PublicEdgeRouter.get(
  EDGE_PARAMS_ROUTE,
  AccessKeyAuthorization,
  runFunction(METHODS.GET, FEATURES.GET)
)
  .post(
    EDGE_PARAMS_ROUTE,
    AccessKeyAuthorization,
    runFunction(METHODS.POST, FEATURES.POST)
  )
  .put(
    EDGE_PARAMS_ROUTE,
    AccessKeyAuthorization,
    runFunction(METHODS.PUT, FEATURES.PUT)
  )
  .delete(
    EDGE_PARAMS_ROUTE,
    AccessKeyAuthorization,
    runFunction(METHODS.DELETE, FEATURES.DELETE)
  );

export { ManagementEdgeRouter, PublicEdgeRouter };
