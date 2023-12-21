import express from 'express';
import {getEdge, createEdge, deleteEdge, updateEdge} from '../controllers/Edge';
import { EDGE_ROUTE } from '../config/routes';
import authenticationMiddleWareAdminPortal from '../middleware/authentication';
import authorization from '../middleware/authorization';
const edgeRouter = express.Router();

edgeRouter.get( 
    EDGE_ROUTE, 
    getEdge, 
    authenticationMiddleWareAdminPortal, 
    authorization(["edge"], ["read", "write", "delete", "update"])
  )
  .post( 
      EDGE_ROUTE, 
      createEdge, 
      authorization(["edge"], 
      ["read", "write", "delete", "update"])
    )
  .put( 
      EDGE_ROUTE, 
      updateEdge, 
      authorization(["edge"], 
      ["read", "write", "delete", "update"])
    )
  .delete( 
      EDGE_ROUTE, 
      deleteEdge, 
      authorization(["edge"], 
      ["read", "write", "delete", "update"])
    )

export default edgeRouter;
