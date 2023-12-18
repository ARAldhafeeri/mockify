import express from 'express';
import { getResources, deleteResource, updateResources, createResource } from '../controllers/resource';
import { RESOURCE_ROUTE } from '../config/routes';
import authenticationMiddleWareAdminPortal from '../middleware/authentication';
import authorization from '../middleware/authorization';
const resourceRouter = express.Router();

resourceRouter
  .get( 
    RESOURCE_ROUTE, getResources,
    authenticationMiddleWareAdminPortal,
    authorization(["resource"], ["read", "write", "delete", "update"])
  )
  .post( 
    RESOURCE_ROUTE, createResource,
    authenticationMiddleWareAdminPortal,
    authorization(["resource"], ["read", "write", "delete", "update"])
  )
  .put( 
    RESOURCE_ROUTE, updateResources,
    authenticationMiddleWareAdminPortal,
    authorization(["resource"], ["read", "write", "delete", "update"])
  )
  .delete( 
    RESOURCE_ROUTE, deleteResource,
    authenticationMiddleWareAdminPortal,
    authorization(["resource"], ["read", "write", "delete", "update"])
  );

export default resourceRouter;
