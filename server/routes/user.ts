import express from 'express';
import {getUsers, createUser, deleteUser, updateUser} from '../controllers/user';
import { USER_ROUTE } from '../config/routes';
import authenticationMiddleWareAdminPortal from '../middleware/authentication';
import authorization from '../middleware/authorization';
const userRouter = express.Router();


userRouter
  .get( 
    USER_ROUTE, getUsers,
    authenticationMiddleWareAdminPortal,
    authorization(["user"], ["read", "write", "delete", "update"])
  )
  .post( 
    USER_ROUTE, createUser,
    authenticationMiddleWareAdminPortal,
    authorization(["user"], ["read", "write", "delete", "update"])
  )
  .put(
     USER_ROUTE, updateUser,
     authenticationMiddleWareAdminPortal,
     authorization(["user"], ["read", "write", "delete", "update"])
  )
  .delete(
    USER_ROUTE, deleteUser,
    authenticationMiddleWareAdminPortal,
    authorization(["user"], ["read", "write", "delete", "update"])
  );

export default userRouter;
