import express from 'express';
import {
 getx 
} from '../controllers/mock';
import { MOCK_ROUTE, MOCK_ROUTE_RESOURCE_PARAM} from '../config/routes';
import authenticationMiddleWareAdminPortal from '../middleware/authentication';
import authorization from '../middleware/authorization';
const mockRouter = express.Router();

mockRouter.use(authenticationMiddleWareAdminPortal)
mockRouter.use(authorization(["data"], ["read", "write", "delete", "update"]));
mockRouter.get( MOCK_ROUTE + MOCK_ROUTE_RESOURCE_PARAM, getx)

export default mockRouter;
