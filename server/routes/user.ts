import express from 'express';
import {getUsers, createUser, deleteUser, updateUser} from '../controllers/user';
import { USER_ROUTE } from '../config/routes';
import authenticationMiddleWareAdminPortal from '../middleware/authentication';
import authorization from '../middleware/authorization';
const userRouter = express.Router();

userRouter.use(authenticationMiddleWareAdminPortal)
userRouter.use(authorization(["user"], ["read", "write", "delete", "update"]))
userRouter.get( USER_ROUTE, getUsers)
  .post( USER_ROUTE, createUser)
  .put( USER_ROUTE, updateUser)
  .delete( USER_ROUTE, deleteUser);

export default userRouter;
