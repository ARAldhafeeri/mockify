import { cacheService, clientService } from "../services";
import CacheController from "./cache";
import ClientController from "./client";

export const cacheController = new CacheController(cacheService);

export const clientController = new ClientController(clientService);
