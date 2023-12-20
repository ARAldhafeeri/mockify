import express from 'express';
import {
  delx,
  getXFilteration,
  getXPagination,
 getx, 
 postXValidate,
 postx,
 putXValidate,
 putx
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

mockRouter.put(MOCK_ROUTE + MOCK_ROUTE_RESOURCE_PARAM, putx )
mockRouter.put(MOCK_ROUTE + MOCK_ROUTE_RESOURCE_PARAM + MOCK_ROUTE_VALIDATE, putXValidate)

mockRouter.delete(MOCK_ROUTE + MOCK_ROUTE_RESOURCE_PARAM, delx )
export default mockRouter;
