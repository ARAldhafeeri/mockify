import express from "express";
import { ROOT_ROUTE } from "../config/routes";
import authenticationMiddleWareAdminPortal from "../middleware/authentication";
import {
  authorizeDelete,
  authorizeUpdate,
  authorizeWrite,
  authorizerRead,
} from "../utils/authorize";
import { resourceController } from "../controllers";
const resourceRouter = express.Router();
const resourceName = "resource";

resourceRouter.use(authenticationMiddleWareAdminPortal);

resourceRouter
  .get(ROOT_ROUTE, authorizerRead(resourceName), resourceController.fetch)
  .post(ROOT_ROUTE, authorizeWrite(resourceName), resourceController.create)
  .put(ROOT_ROUTE, authorizeUpdate(resourceName), resourceController.update)
  .delete(ROOT_ROUTE, authorizeDelete(resourceName), resourceController.delete);

export default resourceRouter;
