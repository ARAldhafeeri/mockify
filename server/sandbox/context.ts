import ResourceModel from "../models/Resource"
import DataModel from "../models/Data"
import PolicyModel from "../models/Policy"
import EventModel from "../models/Event"
import EdgeModel from "../models/Edge";
import { faker } from '@faker-js/faker';
import {AccessControl , GrantQuery} from "gatewatch"
import CacheService from "../services/cache";
import events from "../events";

const cacheService = new CacheService();
const CacheSet = cacheService.set.bind(cacheService);
const CacheGet = cacheService.get.bind(cacheService);
const Emit = events.emit.bind(events);

const CONTEXT = {
  ResourceModel,
  DataModel,
  PolicyModel,
  EdgeModel,
  EventModel,
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
  Emit,
  eventData: {},
};

export default CONTEXT;