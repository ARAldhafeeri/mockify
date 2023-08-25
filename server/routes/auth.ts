import express from 'express';
import {userLoginController} from '../controllers/auth';
import { USER_LOGIN_ROUTE } from '../config/routes';

const authRouter = express.Router();

authRouter.post( USER_LOGIN_ROUTE, userLoginController);

export default authRouter;
