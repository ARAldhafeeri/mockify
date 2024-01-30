import express from 'express';
import {getClient, createClient, deleteClient, updateClient} from '../controllers/client';
import { CLIENT_ROUTE } from '../config/routes';
import authenticationMiddleWareAdminPortal from '../middleware/authentication';
import authorization from '../middleware/authorization';
const clientRouter = express.Router();

clientRouter.get( 
  CLIENT_ROUTE,
    authenticationMiddleWareAdminPortal, 
    authorization(["client"], ["read", "write", "delete", "update"]),
    getClient, 
  )
  .post( 
    CLIENT_ROUTE, 
      authenticationMiddleWareAdminPortal, 
      authorization(["client"], ["read", "write", "delete", "update"]),
      createClient, 
    )
  .put( 
    CLIENT_ROUTE, 
      authenticationMiddleWareAdminPortal, 
      authorization(["client"], ["read", "write", "delete", "update"]),
      updateClient, 
    )
  .delete( 
    CLIENT_ROUTE, 
      authenticationMiddleWareAdminPortal, 
      authorization(["client"], ["read", "write", "delete", "update"]),
      deleteClient, 
    )

export default clientRouter;
