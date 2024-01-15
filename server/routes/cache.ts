import express from 'express';
import {getCache, setCacheKey, deleteCacheKey} from '../controllers/cache';
import { CACHE_ROUTE } from '../config/routes';
import { AccessKeyAuthorization } from '../middleware/authorization';
const cacheRouter = express.Router();

cacheRouter
  .get(
    CACHE_ROUTE,
    AccessKeyAuthorization, 
    getCache
  )
  .post(
    CACHE_ROUTE,
    AccessKeyAuthorization, 
    setCacheKey
  )
  .delete(
    CACHE_ROUTE,
    AccessKeyAuthorization, 
    deleteCacheKey
  )

export default cacheRouter;
