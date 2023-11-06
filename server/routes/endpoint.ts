import express from 'express';
import { ENDPOINT_ROUTE } from '../config/routes';
import authenticationMiddleWareAdminPortal from '../middleware/authentication';
import { endpointCreateController } from '../controllers/endpoint';
const endpointRouter = express.Router();

endpointRouter.use(authenticationMiddleWareAdminPortal)
endpointRouter.post( ENDPOINT_ROUTE,  endpointCreateController )

export default endpointRouter;