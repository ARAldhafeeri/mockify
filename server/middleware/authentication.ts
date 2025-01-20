const jsonwebtoken = require("jsonwebtoken");
import { Request, Response, NextFunction, Express } from "express";

const authenticationMiddleWareAdminPortal = (
  req: Request | any,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = jsonwebtoken.verify(
      req.headers.authorization.split(" ")[1],
      process.env.SECRET_KEY
    );
    if (token) {
      req.userUID = token.userUID;
      return next();
    }
  } catch (e) {
    return next(new Error("user not authenticated"));
  }
};

export default authenticationMiddleWareAdminPortal;
