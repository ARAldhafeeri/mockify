import ResourceModel from "../models/resource";
import DataModel from "../models/data";
import PolicyModel from "../models/policy";
import EventModel from "../models/event";
import EdgeModel from "../models/edge";
import { faker } from "@faker-js/faker";
import { AccessControl, GrantQuery } from "gatewatch";
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
    status: null,
  },
  CacheSet,
  CacheGet,
  Emit,
  eventData: {},
};

export default CONTEXT;
