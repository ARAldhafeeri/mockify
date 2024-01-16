import redisClient from "../redis";
import { promisify } from 'util';

class CacheService {

  validate(key: string): boolean {
    // keys must be set like tihs "projectName:key"
    const pattern = /[a-zA-Z0-9]:[a-zA-Z0-9]/;
    const keyIsValid = pattern.test(key);
    return keyIsValid;
  }
  async get(key: string): Promise<string | boolean | null > {
    const keyIsValid = this.validate(key);
    if (!keyIsValid) {
      return false;
    }
    const getAsync = promisify(redisClient.get).bind(redisClient);
    const result = await getAsync(key);

    return result !== null ? result.toString() : null;
  }

  async set(key: string, value: string, exp=null): Promise<any> {
    const keyIsValid = this.validate(key);
    if (!keyIsValid) {
      return false;
    }
    const setAsync = promisify(redisClient.set).bind(redisClient);

    if (exp) {
      // If exp is provided, set the expiration time
      await setAsync(key, value, 'EX', exp);
    } else {
      // If exp is not provided, set the value without expiration
      await setAsync(key, value);
    }
    return true;

  }

  async del(key: string): Promise<any> {
    const keyIsValid = this.validate(key);
    if (!keyIsValid) {
      return false;
    }
    await promisify(redisClient.del).bind(redisClient)(key);
    return true;
  }

  addProjectNameToKey(projectName: string, key: string): string {
    return `${projectName}:${key}`;
  }

  async getAllProjectDataJSON(projectName: string): Promise<any> {
    let data  : any = [];
    const keys: string[] = await promisify(redisClient.keys).bind(redisClient)(`${projectName}:*`);
      

    if (!keys || keys.length === 0) {
      return data;
    }

    for (const key of keys) {
      const value = await promisify(redisClient.get).bind(redisClient)(key);
      const parsedData = { key: key.split(":")[1], value: value };
      data.push(parsedData);
    }

    if (data.length === 0) {
      return null; // Returning null instead of false when there's no data
    }

    return data;
  }

}

export default CacheService;