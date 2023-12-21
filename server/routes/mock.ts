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


mockRouter.get(MOCK_ROUTE + MOCK_ROUTE_RESOURCE_PARAM, AccessKeyAuthorization,  getx)
mockRouter.get(MOCK_ROUTE  + MOCK_ROUTE_RESOURCE_PARAM + MOCK_ROUTE_PAGINATE, AccessKeyAuthorization, getXPagination)
mockRouter.get(MOCK_ROUTE  + MOCK_ROUTE_RESOURCE_PARAM + MOCK_ROUTE_FILTER, AccessKeyAuthorization, getXFilteration)

mockRouter.post(MOCK_ROUTE + MOCK_ROUTE_RESOURCE_PARAM, AccessKeyAuthorization, postx )
mockRouter.post(MOCK_ROUTE + MOCK_ROUTE_RESOURCE_PARAM + MOCK_ROUTE_VALIDATE, AccessKeyAuthorization,  postXValidate )

mockRouter.put(MOCK_ROUTE + MOCK_ROUTE_RESOURCE_PARAM, AccessKeyAuthorization, putx,  )
mockRouter.put(MOCK_ROUTE + MOCK_ROUTE_RESOURCE_PARAM + MOCK_ROUTE_VALIDATE, AccessKeyAuthorization,  putXValidate)

mockRouter.delete(MOCK_ROUTE + MOCK_ROUTE_RESOURCE_PARAM, AccessKeyAuthorization,  delx )
export default mockRouter;
