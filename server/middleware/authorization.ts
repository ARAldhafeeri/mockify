import fs from "fs"
import {AccessControl , GrantQuery} from "gatewatch"
import jwt from "jsonwebtoken";
import { IUser } from "../models/User";
import { NextFunction } from "express";
import { Request, Response } from "express";
import { SECRET_KEY } from "../getEnv";
import CryptoService from "../services/crypto";

let globalPolicy = JSON.parse(fs.readFileSync("policy.json", "utf8"));

let  AC = new AccessControl(globalPolicy);

AC = AC.enforce();

const cryptoService = new CryptoService();

interface IToken {
  secret : string,
  iat: number,
  exp: number,
  id: string
}

interface ITokenPayload {
  id: string,
  role: string
}
const getUserRoleFromToken = async (token : string) : Promise<ITokenPayload> => {
  // get user id from signed jwt token
  let user  = jwt.verify(token, SECRET_KEY) as IToken;

  let decrypted = await cryptoService.decryptObj(user.secret);

  return decrypted as ITokenPayload;
}

const authorization = (resources : Array<string> , actions : Array<string> ) => {
  return async (req : Request, res : Response, next : NextFunction) => {

      // get user id from signed jwt token
      let token : string | undefined  = req.headers["authorization"]

      if(!token) {
          res.status(403).send("unauthorized");
      }

      token = token?.split(" ")[1];

      let payload = await getUserRoleFromToken(token as string);

      let userRoleFromToken = payload.role;

      console.log(userRoleFromToken);

      if(!userRoleFromToken) {
          res.status(403).send("unauthorized");
      }
      const isAuthorized = new GrantQuery(AC)
          .role(userRoleFromToken)
          .can(actions)
          .on(resources)
          .grant(); 

      if(isAuthorized) {
          next();
      } else {
          res.status(403).send("unauthorized");
      }
  }
};

export default authorization;


