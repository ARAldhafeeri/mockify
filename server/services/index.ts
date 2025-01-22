import redisClient from "../config/redis";
import {
  clientRepository,
  dataRepository,
  edgeRepository,
  eventRepository,
  policyRepository,
  projectRepository,
  resourceRepository,
  userRepository,
} from "../repositories";
import CacheService from "./cache";
import ClientService from "./client";
import CryptoService from "./crypto";
import DataService from "./data";
import EdgeService from "./edge";
import EndpointService from "./endpoint";
import EventService from "./event";
import MockService from "./mock";
import PolicyService from "./policy";
import ProjectService from "./project";
import ResourceService from "./resource";
import SwaggerService from "./swagger";
import UserService from "./user";

export const projectService = new ProjectService(projectRepository);
export const cryptoService = new CryptoService();
export const cacheService = new CacheService(redisClient);
export const clientService = new ClientService(clientRepository, cryptoService);
export const resourceService = new ResourceService(resourceRepository);
export const edgeService = new EdgeService(resourceService, edgeRepository);
export const endpointService = new EndpointService(edgeService, clientService);
export const eventService = new EventService(
  resourceService,
  edgeService,
  eventRepository
);
export const dataService = new DataService(resourceService, dataRepository);
export const mockService = new MockService(resourceService, dataRepository);
export const policyService = new PolicyService(
  projectService,
  policyRepository
);
export const swaggerService = new SwaggerService(endpointService);
export const userService = new UserService(userRepository);
