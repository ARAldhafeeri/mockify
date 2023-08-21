import express from 'express';
import {userLoginController} from '../controllers/user';
import { USER_ROUTE } from '../config/routes';

const userRouter = express.Router();

userRouter.get( USER_ROUTE, userLoginController);

export default userRouter;
