import {
  cacheService,
  clientService,
  cryptoService,
  dataService,
  edgeService,
  eventService,
  mockService,
  passwordService,
  policyService,
  projectService,
  resourceService,
  userService,
} from "../services";
import CacheController from "./cache";
import ClientController from "./client";
import DataController from "./data";
import EdgeController from "./edge";
import EventController from "./event";
import MockController from "./mock";
import PolicyController from "./policy";
import ProjectController from "./project";
import ResourceController from "./resource";
import UserController from "./user";

export const cacheController = new CacheController(cacheService);
export const clientController = new ClientController(clientService);
export const dataController = new DataController(dataService);
export const edgeController = new EdgeController(edgeService);
export const eventController = new EventController(eventService);
export const mockController = new MockController(mockService, resourceService);
export const policyController = new PolicyController(policyService);
export const projectController = new ProjectController(
  projectService,
  cryptoService
);
export const resourceController = new ResourceController(resourceService);
export const userController = new UserController(userService, passwordService);
