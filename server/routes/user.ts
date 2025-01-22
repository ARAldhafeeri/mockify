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
const name = "user";

userRouter.use(authenticationMiddleWareAdminPortal);

userRouter
  .get(ROOT_ROUTE, authorizerRead(name), userController.getUsers)
  .post(ROOT_ROUTE, authorizeWrite(name), userController.createUser)
  .put(ROOT_ROUTE, authorizeUpdate(name), userController.updateUser)
  .delete(ROOT_ROUTE, authorizeDelete(name), userController.deleteUser);

export default userRouter;
