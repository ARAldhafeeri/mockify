import express from 'express';
import {getEdge, createEdge, deleteEdge, updateEdge, runFunction} from '../controllers/Edge';
import { EDGE_ROUTE, EDGE_ROUTE_WITH_PARAMS } from '../config/routes';
import authenticationMiddleWareAdminPortal from '../middleware/authentication';
import authorization, { AccessKeyAuthorization } from '../middleware/authorization';
import { METHODS, FEATURES } from '../config/edge';
const edgeRouter = express.Router();

edgeRouter.get( 
    EDGE_ROUTE,
    authenticationMiddleWareAdminPortal, 
    authorization(["edge"], ["read", "write", "delete", "update"]), 
    getEdge, 
  )
  .post( 
      EDGE_ROUTE, 
      authenticationMiddleWareAdminPortal, 
      authorization(["edge"], ["read", "write", "delete", "update"]), 
      createEdge, 
    )
  .put( 
      EDGE_ROUTE, 
      authenticationMiddleWareAdminPortal, 
      authorization(["edge"], ["read", "write", "delete", "update"]), 
      updateEdge, 
    )
  .delete( 
      EDGE_ROUTE, 
      authenticationMiddleWareAdminPortal, 
      authorization(["edge"], ["read", "write", "delete", "update"]), 
      deleteEdge, 
    )
  .get(
    EDGE_ROUTE_WITH_PARAMS,
    AccessKeyAuthorization, 
    runFunction(METHODS.GET, FEATURES.GET)
  )
  .post(
    EDGE_ROUTE_WITH_PARAMS,
    AccessKeyAuthorization, 
    runFunction(METHODS.POST, FEATURES.POST)
  )
  .put(
    EDGE_ROUTE_WITH_PARAMS,
    AccessKeyAuthorization, 
    runFunction(METHODS.PUT, FEATURES.PUT)
  )
  .delete(
    EDGE_ROUTE_WITH_PARAMS,
    AccessKeyAuthorization, 
    runFunction(METHODS.DELETE, FEATURES.DELETE)
  )

export default edgeRouter;
