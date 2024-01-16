import ResourceModel from "../models/Resource"
import DataModel from "../models/Data"
import ProjectModel from "../models/Project"
import PolicyModel from "../models/Policy"
import mongoose, { Types } from "mongoose";
import EdgeModel from "../models/Edge";
import { faker } from '@faker-js/faker';
import {AccessControl , GrantQuery} from "gatewatch"
import CacheService from "../services/cache";

const cacheService = new CacheService();
const CacheSet = cacheService.set.bind(cacheService);
const CacheGet = cacheService.get.bind(cacheService);

const CONTEXT = {
  mongoose,
  ResourceModel,
  DataModel,
  ProjectModel,
  PolicyModel,
  EdgeModel,
  data: {},
  faker, 
  AccessControl,
  GrantQuery,
  safeRes: {
    headers: null,
    httpStatus: null,
    message: null,
    status: null
  }, 
  CacheSet,
  CacheGet,
};

export default CONTEXT;