import express from 'express';
import {
  getXPagination,
 getx 
} from '../controllers/mock';
import { MOCK_ROUTE, MOCK_ROUTE_RESOURCE_PARAM} from '../config/routes';
import { AccessKeyAuthorization } from '../middleware/authorization';
const mockRouter = express.Router();

mockRouter.use(AccessKeyAuthorization);
mockRouter.get( MOCK_ROUTE + MOCK_ROUTE_RESOURCE_PARAM, getx)
mockRouter.get( MOCK_ROUTE  + MOCK_ROUTE_RESOURCE_PARAM + '/paginate', getXPagination)

export default mockRouter;
