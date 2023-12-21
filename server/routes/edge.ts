import express from 'express';
import {getEdge, createEdge, deleteEdge, updateEdge, runGetxFunction} from '../controllers/Edge';
import { EDGE_ROUTE, EDGE_ROUTE_WITH_PARAMS } from '../config/routes';
import authenticationMiddleWareAdminPortal from '../middleware/authentication';
import authorization, { AccessKeyAuthorization } from '../middleware/authorization';
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
    runGetxFunction,
  )

export default edgeRouter;
