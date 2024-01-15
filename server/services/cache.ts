import redisClient from "../redis";

class CacheService {

  async validate(key: string): Promise<boolean> {
    // keys must be set like tihs "projectName:key"
    const pattern = /[a-zA-Z0-9]:[a-zA-Z0-9]/;
    const keyIsValid = pattern.test(key);
    return keyIsValid;
  }
  async get(key: string): Promise<string | boolean | null > {
    const keyIsValid = await this.validate(key);
    if (!keyIsValid) {
      return false;
    }
    const res = await redisClient.get(key);
    return res;
  }

  async set(key: string, value: string): Promise<any> {
    const keyIsValid = await this.validate(key);
    if (!keyIsValid) {
      return false;
    }
    await redisClient.set(key, value);
  }

  async del(key: string): Promise<any> {
    const keyIsValid = await this.validate(key);
    if (!keyIsValid) {
      return false;
    }
    await redisClient.del(key);
    return true;
  }

  async addProjectNameToKey(projectName: string, key: string): Promise<string> {
    return `${projectName}:${key}`;
  }

  async getAllProjectDataJSON(projectName: string): Promise<any> {
    return await redisClient.get(`${projectName}:*`);
  }

}

export default CacheService;