import express from "express";
import { CLIENT_ROUTE, ROOT_ROUTE } from "../config/routes";
import authenticationMiddleWareAdminPortal from "../middleware/authentication";
import {
  authorizeDelete,
  authorizeUpdate,
  authorizeWrite,
  authorizerRead,
} from "../utils/authorize";
import { policyController } from "../controllers";
const policyRouter = express.Router();
const name = "policy";

policyRouter.use(authenticationMiddleWareAdminPortal);

policyRouter
  .get(ROOT_ROUTE, authorizerRead(name), policyController.fetch)
  .post(ROOT_ROUTE, authorizeWrite(name), policyController.create)
  .put(ROOT_ROUTE, authorizeUpdate(name), policyController.update)
  .delete(ROOT_ROUTE, authorizeDelete(name), policyController.delete);

export default policyRouter;
