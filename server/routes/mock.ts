import express from 'express';
import {
  getXFilteration,
  getXPagination,
 getx 
} from '../controllers/mock';
import { MOCK_ROUTE, MOCK_ROUTE_FILTER, MOCK_ROUTE_PAGINATE, MOCK_ROUTE_RESOURCE_PARAM} from '../config/routes';
import { AccessKeyAuthorization } from '../middleware/authorization';
const mockRouter = express.Router();

mockRouter.use(AccessKeyAuthorization);
mockRouter.get( MOCK_ROUTE + MOCK_ROUTE_RESOURCE_PARAM, getx)
mockRouter.get( MOCK_ROUTE  + MOCK_ROUTE_RESOURCE_PARAM + MOCK_ROUTE_PAGINATE, getXPagination)
mockRouter.get(MOCK_ROUTE  + MOCK_ROUTE_RESOURCE_PARAM + MOCK_ROUTE_FILTER, getXFilteration)
export default mockRouter;
