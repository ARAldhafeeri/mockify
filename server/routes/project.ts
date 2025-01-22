import express from "express";
import { CLIENT_ROUTE, ROOT_ROUTE } from "../config/routes";
import authenticationMiddleWareAdminPortal from "../middleware/authentication";
import {
  authorizeDelete,
  authorizeUpdate,
  authorizeWrite,
  authorizerRead,
} from "../utils/authorize";
import { projectController } from "../controllers";
const projectRouter = express.Router();
const resourceName = "project";

projectRouter.use(authenticationMiddleWareAdminPortal);

projectRouter
  .get(ROOT_ROUTE, authorizerRead(resourceName), projectController.fetch)
  .post(ROOT_ROUTE, authorizeWrite(resourceName), projectController.create)
  .put(ROOT_ROUTE, authorizeUpdate(resourceName), projectController.update)
  .delete(ROOT_ROUTE, authorizeDelete(resourceName), projectController.delete);

export default projectRouter;
