import express from 'express';
import {getData, createData, deleteData, updateData} from '../controllers/data';
import { DATA_ROUTE } from '../config/routes';
import authenticationMiddleWareAdminPortal from '../middleware/authentication';
import authorization from '../middleware/authorization';
const dataRouter = express.Router();

dataRouter.use(authenticationMiddleWareAdminPortal)
dataRouter.use(authorization(["data"], ["read", "write", "delete", "update"]));
dataRouter.get( DATA_ROUTE, getData)
  .post( DATA_ROUTE, createData)
  .put( DATA_ROUTE, updateData)
  .delete( DATA_ROUTE, deleteData);

export default dataRouter;
