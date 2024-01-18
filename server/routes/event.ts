import express from 'express';
import {getEvent, createEvent, deleteEvent, updateEvent} from '../controllers/event';
import { EVENT_ROUTE } from '../config/routes';
import authenticationMiddleWareAdminPortal from '../middleware/authentication';
import authorization from '../middleware/authorization';
const eventRouter = express.Router();

eventRouter.get( 
    EVENT_ROUTE,
    authenticationMiddleWareAdminPortal, 
    authorization(["event"], ["read", "write", "delete", "update"]),
    getEvent, 
  )
  .post( 
      EVENT_ROUTE, 
      authenticationMiddleWareAdminPortal, 
      authorization(["event"], ["read", "write", "delete", "update"]),
      createEvent, 
    )
  .put( 
      EVENT_ROUTE, 
      authenticationMiddleWareAdminPortal, 
      authorization(["event"], ["read", "write", "delete", "update"]),
      updateEvent, 
    )
  .delete( 
      EVENT_ROUTE, 
      authenticationMiddleWareAdminPortal, 
      authorization(["event"], ["read", "write", "delete", "update"]),
      deleteEvent, 
    )

export default eventRouter;
