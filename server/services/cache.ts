import { ICacheService } from "../entities/cache";

class CacheService implements ICacheService {
  private client: any;

  constructor(client: any) {
    this.client = client;
  }

  validate(key: string): boolean {
    // Keys must be in the format "name:key"
    const pattern = /^[a-zA-Z0-9]+:[a-zA-Z0-9]+$/;
    return pattern.test(key);
  }

  async get(key: string): Promise<string | null | boolean> {
    if (!this.validate(key)) {
      return false;
    }
    return this.client.get(key);
  }

  async set(
    key: string,
    value: string,
    exp: number | null = null
  ): Promise<boolean> {
    if (!this.validate(key)) return false;
    if (exp) {
      return this.client.set(key, value, { EX: exp });
    } else {
      return this.client.set(key, value);
    }
  }

  async del(key: string): Promise<boolean> {
    if (!this.validate(key)) return false;

    return this.client.del(key);
  }

  addnameToKey(name: string, key: string): string {
    return `${name}:${key}`;
  }

  async getAllProjectDataJSON(name: string): Promise<Array<any> | null> {
    const keys = await this.client.keys(`${name}:*`);
    if (!keys || keys.length === 0) {
      return [];
    }

    const data = await Promise.all(
      keys.map(async (key: string) => {
        const value = await this.client.get(key);
        return { key: key.split(":")[1], value };
      })
    );

    return data.length > 0 ? data : null;
  }
}

export default CacheService;
