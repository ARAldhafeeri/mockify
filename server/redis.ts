import { REDIS_URL, REDIS_PASSWORD } from "./getEnv";
import * as redis from 'redis';

let redisClient = redis.createClient({
  url: REDIS_URL,
  password: REDIS_PASSWORD,
  legacyMode: true,
});

redisClient.on('error', (err) => {
  console.log('Redis error: ', err);
});

redisClient.on('connect', () => {
  console.log('Redis client connected');
});


export default redisClient;