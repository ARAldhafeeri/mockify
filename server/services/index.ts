import redisClient from "../config/redis";
import { clientRepository } from "../repositories";
import CacheService from "./cache";
import ClientService from "./client";
import CryptoService from "./crypto";
import ProjectService from "./project";

const projectService = new ProjectService();
const cryptoService = new CryptoService();

export const cacheService = new CacheService(redisClient);

export const clientService = new ClientService(clientRepository, cryptoService);
