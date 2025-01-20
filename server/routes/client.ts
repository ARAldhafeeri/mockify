import express from "express";
import { CLIENT_ROUTE, ROOT_ROUTE } from "../config/routes";
import authenticationMiddleWareAdminPortal from "../middleware/authentication";
import authorization from "../middleware/authorization";
import {
  authorizeDelete,
  authorizeUpdate,
  authorizeWrite,
  authorizerRead,
} from "../utils/authorize";
import { clientController } from "../controllers";
const clientRouter = express.Router();
const resourceName = "clientCred";

clientRouter.use(authenticationMiddleWareAdminPortal);

clientRouter
  .get(ROOT_ROUTE, authorizerRead(resourceName), clientController.fetch)
  .post(ROOT_ROUTE, authorizeWrite(resourceName), clientController.create)
  .put(ROOT_ROUTE, authorizeUpdate(resourceName), clientController.update)
  .delete(ROOT_ROUTE, authorizeDelete(resourceName), clientController.delete);

export default clientRouter;
