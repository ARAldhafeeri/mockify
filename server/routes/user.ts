import express from 'express';
import {getUsers, createUser, deleteUser, updateUser} from '../controllers/user';
import { USER_ROUTE } from '../config/routes';
import authenticationMiddleWareAdminPortal from '../middleware/authentication';
import authorization from '../middleware/authorization';
const userRouter = express.Router();


userRouter
  .get( 
    USER_ROUTE, 
    authenticationMiddleWareAdminPortal,
    authorization(["policy"], ["read", "write", "delete", "update"]),
    getUsers,
  )
  .post( 
    USER_ROUTE, 
    authenticationMiddleWareAdminPortal,
    authorization(["policy"], ["read", "write", "delete", "update"]),
    createUser,
  )
  .put(
     USER_ROUTE, 
     authenticationMiddleWareAdminPortal,
     authorization(["policy"], ["read", "write", "delete", "update"]),
     updateUser,
  )
  .delete(
    USER_ROUTE,
    authenticationMiddleWareAdminPortal,
    authorization(["policy"], ["read", "write", "delete", "update"]), 
    deleteUser,
      );

export default userRouter;
