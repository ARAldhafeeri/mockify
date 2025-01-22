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
const name = "resource";

resourceRouter.use(authenticationMiddleWareAdminPortal);

resourceRouter
  .get(ROOT_ROUTE, authorizerRead(name), resourceController.fetch)
  .post(ROOT_ROUTE, authorizeWrite(name), resourceController.create)
  .put(ROOT_ROUTE, authorizeUpdate(name), resourceController.update)
  .delete(ROOT_ROUTE, authorizeDelete(name), resourceController.delete);

export default resourceRouter;
