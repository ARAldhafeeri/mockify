export interface ICacheService {
  validate(key: string): boolean;
  get(key: string): Promise<string | boolean | null>;
  set(key: string, value: string, exp?: number | null): Promise<boolean>;
  del(key: string): Promise<boolean>;
  addProjectNameToKey(projectName: string, key: string): string;
  getAllProjectDataJSON(projectName: string): Promise<any>;
}

export interface ICacheController {
  getCache: Controller;
  deleteCacheKey: Controller;
  setCacheKey: Controller;
}
