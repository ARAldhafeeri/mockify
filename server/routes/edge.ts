import express from "express";
import { runFunction } from "../controllers/edge";
import {
  EDGE_ROUTE,
  EDGE_ROUTE_WITH_PARAMS,
  ROOT_ROUTE,
} from "../config/routes";
import authenticationMiddleWareAdminPortal from "../middleware/authentication";
import authorization, {
  AccessKeyAuthorization,
} from "../middleware/authorization";
import { METHODS, FEATURES } from "../config/edge";
import {
  authorizeDelete,
  authorizeUpdate,
  authorizeWrite,
  authorizerRead,
} from "../utils/authorize";
import { edgeController } from "../controllers";
const edgeRouter = express.Router();
const resourceName = "edge";

edgeRouter.use(authenticationMiddleWareAdminPortal);

edgeRouter
  .get(ROOT_ROUTE, authorizerRead(resourceName), edgeController.fetch)
  .post(ROOT_ROUTE, authorizeWrite(resourceName), edgeController.create)
  .put(ROOT_ROUTE, authorizeUpdate(resourceName), edgeController.update)
  .delete(ROOT_ROUTE, authorizeDelete(resourceName), edgeController.delete)
  .get(
    EDGE_ROUTE_WITH_PARAMS,
    AccessKeyAuthorization,
    runFunction(METHODS.GET, FEATURES.GET)
  )
  .post(
    EDGE_ROUTE_WITH_PARAMS,
    AccessKeyAuthorization,
    runFunction(METHODS.POST, FEATURES.POST)
  )
  .put(
    EDGE_ROUTE_WITH_PARAMS,
    AccessKeyAuthorization,
    runFunction(METHODS.PUT, FEATURES.PUT)
  )
  .delete(
    EDGE_ROUTE_WITH_PARAMS,
    AccessKeyAuthorization,
    runFunction(METHODS.DELETE, FEATURES.DELETE)
  );

export default edgeRouter;
