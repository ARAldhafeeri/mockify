import express from 'express';
import {getData, createData, deleteData, updateData} from '../controllers/data';
import { DATA_ROUTE } from '../config/routes';
import authenticationMiddleWareAdminPortal from '../middleware/authentication';
const dataRouter = express.Router();

dataRouter.use(authenticationMiddleWareAdminPortal)
dataRouter.get( DATA_ROUTE, getData)
  .post( DATA_ROUTE, createData)
  .put( DATA_ROUTE, updateData)
  .delete( DATA_ROUTE, deleteData);

export default dataRouter;
