import express from 'express';
import {userLoginController} from '../controllers/auth';
import { ROOT_ROUTE, USER_LOGIN_ROUTE } from '../config/routes';

const authRouter = express.Router();

authRouter.post( ROOT_ROUTE, userLoginController);

export default authRouter;
