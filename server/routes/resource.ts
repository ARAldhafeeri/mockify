import express from 'express';
import { getResources, deleteResource, updateResources, createResource } from '../controllers/resource';
import { RESOURCE_ROUTE } from '../config/routes';
import authenticationMiddleWareAdminPortal from '../middleware/authentication';
const resourceRouter = express.Router();

resourceRouter.use(authenticationMiddleWareAdminPortal)
resourceRouter.get( RESOURCE_ROUTE, getResources)
  .post( RESOURCE_ROUTE, createResource)
  .put( RESOURCE_ROUTE, updateResources)
  .delete( RESOURCE_ROUTE, deleteResource);

export default resourceRouter;
