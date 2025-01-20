import express from "express";
import { ROOT_ROUTE } from "../config/routes";
import authenticationMiddleWareAdminPortal from "../middleware/authentication";
import { cacheController } from "../controllers";
const cacheRouter = express.Router();

cacheRouter.use(authenticationMiddleWareAdminPortal);

cacheRouter
  .get(ROOT_ROUTE, cacheController.getCache)
  .post(ROOT_ROUTE, cacheController.setCacheKey)
  .delete(
    ROOT_ROUTE,
    authenticationMiddleWareAdminPortal,
    cacheController.deleteCacheKey
  );

export default cacheRouter;
