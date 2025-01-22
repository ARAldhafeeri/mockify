import express from "express";
import {  ROOT_ROUTE } from "../config/routes";
import authenticationMiddleWareAdminPortal from "../middleware/authentication";
import {
  authorizeDelete,
  authorizeUpdate,
  authorizeWrite,
  authorizerRead,
} from "../utils/authorize";
import { eventController } from "../controllers";
const eventRouter = express.Router();
const resourceName = "event";

eventRouter.use(authenticationMiddleWareAdminPortal);

eventRouter
  .get(ROOT_ROUTE, authorizerRead(resourceName), eventController.fetch)
  .post(ROOT_ROUTE, authorizeWrite(resourceName), eventController.create)
  .put(ROOT_ROUTE, authorizeUpdate(resourceName), eventController.update)
  .delete(ROOT_ROUTE, authorizeDelete(resourceName), eventController.delete);

export default eventRouter;
