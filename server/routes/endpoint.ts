import express from 'express';
import { ENDPOINT_ROUTE } from '../config/routes';
import authenticationMiddleWareAdminPortal from '../middleware/authentication';
import { endpointCreateController } from '../controllers/endpoint';
import authorization from '../middleware/authorization';
const endpointRouter = express.Router();

endpointRouter.post( 
    ENDPOINT_ROUTE,  
    endpointCreateController, 
    authenticationMiddleWareAdminPortal, 
    authorization(["endpoint"], ["read", "write", "delete", "update"])
)

export default endpointRouter;