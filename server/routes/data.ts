import express from 'express';
import {getData, createData, deleteData, updateData} from '../controllers/data';
import { DATA_ROUTE } from '../config/routes';
import authenticationMiddleWareAdminPortal from '../middleware/authentication';
import authorization from '../middleware/authorization';
const dataRouter = express.Router();

dataRouter.get( 
    DATA_ROUTE,
    authenticationMiddleWareAdminPortal, 
    authorization(["data"], ["read", "write", "delete", "update"]),
    getData, 
  )
  .post( 
      DATA_ROUTE, 
      authenticationMiddleWareAdminPortal, 
      authorization(["data"], ["read", "write", "delete", "update"]),
      createData, 
    )
  .put( 
      DATA_ROUTE, 
      authenticationMiddleWareAdminPortal, 
      authorization(["data"], ["read", "write", "delete", "update"]),
      updateData, 
    )
  .delete( 
      DATA_ROUTE, 
      authenticationMiddleWareAdminPortal, 
      authorization(["data"], ["read", "write", "delete", "update"]),
      deleteData, 
    )

export default dataRouter;
