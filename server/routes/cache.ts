import express from 'express';
import {getCache, setCacheKey, deleteCacheKey} from '../controllers/cache';
import { CACHE_ROUTE } from '../config/routes';
import authenticationMiddleWareAdminPortal from '../middleware/authentication';
const cacheRouter = express.Router();

cacheRouter
  .get(
    CACHE_ROUTE,
    authenticationMiddleWareAdminPortal, 
    getCache
  )
  .post(
    CACHE_ROUTE,
    authenticationMiddleWareAdminPortal, 
    setCacheKey
  )
  .delete(
    CACHE_ROUTE,
    authenticationMiddleWareAdminPortal, 
    deleteCacheKey
  )

export default cacheRouter;
