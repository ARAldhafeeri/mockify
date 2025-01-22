import express from "express";
import { CLIENT_ROUTE, ROOT_ROUTE } from "../config/routes";
import authenticationMiddleWareAdminPortal from "../middleware/authentication";
import {
  authorizeDelete,
  authorizeUpdate,
  authorizeWrite,
  authorizerRead,
} from "../utils/authorize";
import { clientController } from "../controllers";
const clientRouter = express.Router();
const name = "clientCred";

clientRouter.use(authenticationMiddleWareAdminPortal);

clientRouter
  .get(ROOT_ROUTE, authorizerRead(name), clientController.fetch)
  .post(ROOT_ROUTE, authorizeWrite(name), clientController.create)
  .put(ROOT_ROUTE, authorizeUpdate(name), clientController.update)
  .delete(ROOT_ROUTE, authorizeDelete(name), clientController.delete);

export default clientRouter;
