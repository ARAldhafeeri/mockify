import express from 'express';
import {getData, createData, deleteData, updateData} from '../controllers/data';
import { DATA_ROUTE } from '../config/routes';
import authenticationMiddleWareAdminPortal from '../middleware/authentication';
import authorization from '../middleware/authorization';
const dataRouter = express.Router();

dataRouter.get( 
    DATA_ROUTE, 
    getData, 
    authenticationMiddleWareAdminPortal, 
    authorization(["data"], ["read", "write", "delete", "update"])
  )
  .post( 
      DATA_ROUTE, 
      createData, 
      authorization(["data"], 
      ["read", "write", "delete", "update"])
    )
  .put( 
      DATA_ROUTE, 
      updateData, 
      authorization(["data"], 
      ["read", "write", "delete", "update"])
    )
  .delete( 
      DATA_ROUTE, 
      deleteData, 
      authorization(["data"], 
      ["read", "write", "delete", "update"])
    )

export default dataRouter;
