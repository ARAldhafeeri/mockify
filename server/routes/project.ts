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
const name = "project";

projectRouter.use(authenticationMiddleWareAdminPortal);

projectRouter
  .get(ROOT_ROUTE, authorizerRead(name), projectController.fetch)
  .post(ROOT_ROUTE, authorizeWrite(name), projectController.create)
  .put(ROOT_ROUTE, authorizeUpdate(name), projectController.update)
  .delete(ROOT_ROUTE, authorizeDelete(name), projectController.delete);

export default projectRouter;
