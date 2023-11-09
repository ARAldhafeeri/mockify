import express from 'express';
import { ENDPOINT_ROUTE } from '../config/routes';
import authenticationMiddleWareAdminPortal from '../middleware/authentication';
import { endpointCreateController } from '../controllers/endpoint';
import authorization from '../middleware/authorization';
const endpointRouter = express.Router();

endpointRouter.use(authenticationMiddleWareAdminPortal)
endpointRouter.use(authorization(["endpoint"], ["read", "write", "delete", "update"]))
endpointRouter.post( ENDPOINT_ROUTE,  endpointCreateController )

export default endpointRouter;