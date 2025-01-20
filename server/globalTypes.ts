import { Request, Response, Express, NextFunction } from "express";

declare global {
  type APIResponse<Data> = { data: Data; message: string; status: boolean };
  type Controller = (req: Request, res: Response) => void;
  type Middleware = (req: Request, res: Response, next: NextFunction) => void;
  interface WebHookEvent {
    secret?: string;
    type?: string;
    timestamp?: string;
  }
  // mongose
  interface Paginate {
    page: number;
    limit: number;
  }

  // express
  namespace Express {
    export interface Request {
      userUID?: string;
    }
  }
}
