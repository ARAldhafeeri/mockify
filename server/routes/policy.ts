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
const resourceName = "policy";

policyRouter.use(authenticationMiddleWareAdminPortal);

policyRouter
  .get(ROOT_ROUTE, authorizerRead(resourceName), policyController.fetch)
  .post(ROOT_ROUTE, authorizeWrite(resourceName), policyController.create)
  .put(ROOT_ROUTE, authorizeUpdate(resourceName), policyController.update)
  .delete(ROOT_ROUTE, authorizeDelete(resourceName), policyController.delete);

export default policyRouter;
