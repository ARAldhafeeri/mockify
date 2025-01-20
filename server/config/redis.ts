import { REDIS_URL, REDIS_PASSWORD } from "../getEnv";
import * as redis from "redis";

let redisClient = redis.createClient({
  url: REDIS_URL,
  legacyMode: true,
});

export default redisClient;
