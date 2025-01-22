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

  private async executeIfValid<T>(
    key: string,
    action: () => Promise<T>
  ): Promise<T | boolean> {
    if (!this.validate(key)) {
      return false;
    }
    return action();
  }

  async get(key: string): Promise<string | null | boolean> {
    return this.executeIfValid(key, async () => {
      const result = await this.client.get(key);
      return result !== null ? result.toString() : null;
    });
  }

  async set(
    key: string,
    value: string,
    exp: number | null = null
  ): Promise<boolean> {
    return this.executeIfValid(key, async () => {
      if (exp) {
        await this.client.set(key, value, { EX: exp });
      } else {
        await this.client.set(key, value);
      }
      return true;
    });
  }

  async del(key: string): Promise<boolean> {
    return this.executeIfValid(key, async () => {
      await this.client.del(key);
      return true;
    });
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
