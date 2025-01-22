import express from "express";
import { CLIENT_ROUTE, ROOT_ROUTE } from "../config/routes";
import authenticationMiddleWareAdminPortal from "../middleware/authentication";
import {
  authorizeDelete,
  authorizeUpdate,
  authorizeWrite,
  authorizerRead,
} from "../utils/authorize";
import { userController } from "../controllers";
const userRouter = express.Router();
const resourceName = "user";

userRouter.use(authenticationMiddleWareAdminPortal);

userRouter
  .get(ROOT_ROUTE, authorizerRead(resourceName), userController.getUsers)
  .post(ROOT_ROUTE, authorizeWrite(resourceName), userController.createUser)
  .put(ROOT_ROUTE, authorizeUpdate(resourceName), userController.updateUser)
  .delete(ROOT_ROUTE, authorizeDelete(resourceName), userController.deleteUser);

export default userRouter;
