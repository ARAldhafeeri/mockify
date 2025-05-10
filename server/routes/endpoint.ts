import express from "express";
import { ENDPOINT_ROUTE, ROOT_ROUTE } from "../config/routes";
import authenticationMiddleWareAdminPortal from "../middleware/authentication";
import { endpointCreateController } from "../controllers/endpoint";
import { authorizeWrite } from "../utils/authorize";
const endpointRouter = express.Router();

endpointRouter.post(
  ROOT_ROUTE,
  authenticationMiddleWareAdminPortal,
  authorizeWrite("endpoint"),
  endpointCreateController
);

export default endpointRouter;
