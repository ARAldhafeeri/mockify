import fs from "fs";
import { AccessControl, GrantQuery } from "gatewatch";
import jwt from "jsonwebtoken";
import { NextFunction } from "express";
import { Request, Response } from "express";
import { SECRET_KEY } from "../getEnv";
import { IPolicy } from "../entities/policy";
import { IToken, ITokenPayload } from "../entities/auth";
import { apiKeyHeader } from "../config/headers";
import { cryptoService, projectService } from "../services";

let globalPolicy = JSON.parse(fs.readFileSync("policy.json", "utf8"));

let AC = new AccessControl(globalPolicy);

AC = AC.enforce();

const authorization = (resources: Array<string>, actions: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get token from headers
      let token: string | undefined = req.headers["authorization"];

      if (!token) {
        return next(new Error("Authorization token is missing"));
      }

      token = token?.split(" ")[1];

      // Extract user role from token
      let decoded = jwt.verify(token, SECRET_KEY);
      let userRoleFromToken;
      if (typeof decoded !== "string" && "role" in decoded) {
        userRoleFromToken = decoded.role;
      }
      if (!userRoleFromToken) {
        return next(new Error("Invalid or missing role in token"));
      }

      // Check if user is authorized
      const isAuthorized = new GrantQuery(AC)
        .role(userRoleFromToken)
        .can(actions)
        .on(resources)
        .grant();

      if (isAuthorized) {
        return next();
      } else {
        return next(new Error("You are not authorized to perform this action"));
      }
    } catch (e: any) {
      return next(
        new Error(
          e.message || "An unexpected error occurred during authorization"
        )
      );
    }
  };
};

const ACDynamic = (
  role: string,
  action: Array<string>,
  resource: Array<string>,
  policy: IPolicy,
  and: boolean | null = null,
  or: boolean | null = null
) => {
  let AC = new AccessControl(policy);
  AC = AC.enforce();
  if (!and && !or)
    return new GrantQuery(AC).role(role).can(action).on(resource).grant();
  if (and && !or)
    return new GrantQuery(AC)
      .role(role)
      .can(action)
      .on(resource)
      .and(and)
      .grant();
  if (!and && or)
    return new GrantQuery(AC)
      .role(role)
      .can(action)
      .on(resource)
      .or(or)
      .grant();
  if (and && or)
    return new GrantQuery(AC)
      .role(role)
      .can(action)
      .on(resource)
      .and(and)
      .or(or)
      .grant();
};

export const AccessKeyAuthorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // verify access key exists in database
  const apiKey = req.headers[apiKeyHeader];
  const authorized = await projectService.findOne({ apiKey: apiKey });
  if (!authorized) return next(Error("not authorized"));
  next();
};

export default authorization;
