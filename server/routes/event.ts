import express from "express";
import { ROOT_ROUTE } from "../config/routes";
import authenticationMiddleWareAdminPortal from "../middleware/authentication";
import {
  authorizeDelete,
  authorizeUpdate,
  authorizeWrite,
  authorizerRead,
} from "../utils/authorize";
import { eventController } from "../controllers";
const eventRouter = express.Router();
const name = "event";

eventRouter.use(authenticationMiddleWareAdminPortal);

eventRouter
  .get(ROOT_ROUTE, authorizerRead(name), eventController.fetch)
  .post(ROOT_ROUTE, authorizeWrite(name), eventController.create)
  .put(ROOT_ROUTE, authorizeUpdate(name), eventController.update)
  .delete(ROOT_ROUTE, authorizeDelete(name), eventController.delete);

export default eventRouter;
