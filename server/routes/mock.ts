import express from 'express';
import {
  getXFilteration,
  getXPagination,
 getx, 
 postXValidate,
 postx
} from '../controllers/mock';
import { MOCK_ROUTE, MOCK_ROUTE_FILTER, MOCK_ROUTE_PAGINATE, MOCK_ROUTE_RESOURCE_PARAM, MOCK_ROUTE_VALIDATE} from '../config/routes';
import { AccessKeyAuthorization } from '../middleware/authorization';
const mockRouter = express.Router();

mockRouter.use(AccessKeyAuthorization);

mockRouter.get(MOCK_ROUTE + MOCK_ROUTE_RESOURCE_PARAM, getx)
mockRouter.get(MOCK_ROUTE  + MOCK_ROUTE_RESOURCE_PARAM + MOCK_ROUTE_PAGINATE, getXPagination)
mockRouter.get(MOCK_ROUTE  + MOCK_ROUTE_RESOURCE_PARAM + MOCK_ROUTE_FILTER, getXFilteration)

mockRouter.post(MOCK_ROUTE + MOCK_ROUTE_RESOURCE_PARAM, postx )
mockRouter.post(MOCK_ROUTE + MOCK_ROUTE_RESOURCE_PARAM + MOCK_ROUTE_VALIDATE, postXValidate )
export default mockRouter;
