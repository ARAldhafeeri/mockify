import express from 'express';
import { getResources, deleteResource, updateResources, createResource } from '../controllers/resource';
import { RESOURCE_ROUTE } from '../config/routes';
import authenticationMiddleWareAdminPortal from '../middleware/authentication';
import authorization from '../middleware/authorization';
const resourceRouter = express.Router();

resourceRouter
  .get( 
    RESOURCE_ROUTE,
    authenticationMiddleWareAdminPortal,
    authorization(["policy"], ["read", "write", "delete", "update"]), 
    getResources,
  )
  .post( 
    RESOURCE_ROUTE, 
    authenticationMiddleWareAdminPortal,
    authorization(["policy"], ["read", "write", "delete", "update"]),
    createResource,
  )
  .put( 
    RESOURCE_ROUTE, 
    authenticationMiddleWareAdminPortal,
    authorization(["policy"], ["read", "write", "delete", "update"]),
    updateResources,
  )
  .delete( 
    RESOURCE_ROUTE, 
    authenticationMiddleWareAdminPortal,
    authorization(["policy"], ["read", "write", "delete", "update"]),
    deleteResource,
  );

export default resourceRouter;
