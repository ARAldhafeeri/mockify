import { Request, Response, NextFunction } from "express";
import { ENV } from "../getEnv";

export const asyncController =
  (fn: Controller) =>
  (req: Request, res: Response): any => {
    Promise.resolve(fn(req, res)).catch((err) => {
      ENV === "dev" && console.log(err.stack);
      res.status(400).send({ status: false, message: `Error: ${err.message}` });
    });
  };
