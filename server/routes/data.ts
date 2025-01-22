import express from "express";
import { DATA_ROUTE, ROOT_ROUTE } from "../config/routes";
import authenticationMiddleWareAdminPortal from "../middleware/authentication";
import authorization from "../middleware/authorization";
import {
  authorizeDelete,
  authorizeUpdate,
  authorizeWrite,
  authorizerRead,
} from "../utils/authorize";
import { dataController } from "../controllers";
const dataRouter = express.Router();

const resourceName = "clientCred";

dataRouter.use(authenticationMiddleWareAdminPortal);

dataRouter
  .get(ROOT_ROUTE, authorizerRead(resourceName), dataController.fetch)
  .post(ROOT_ROUTE, authorizeWrite(resourceName), dataController.create)
  .put(ROOT_ROUTE, authorizeUpdate(resourceName), dataController.update)
  .delete(ROOT_ROUTE, authorizeDelete(resourceName), dataController.delete);

export default dataRouter;
