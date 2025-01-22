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

const name = "clientCred";

dataRouter.use(authenticationMiddleWareAdminPortal);

dataRouter
  .get(ROOT_ROUTE, authorizerRead(name), dataController.fetch)
  .post(ROOT_ROUTE, authorizeWrite(name), dataController.create)
  .put(ROOT_ROUTE, authorizeUpdate(name), dataController.update)
  .delete(ROOT_ROUTE, authorizeDelete(name), dataController.delete);

export default dataRouter;
