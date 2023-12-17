import fs from "fs"
import {AccessControl , GrantQuery} from "gatewatch"
import jwt from "jsonwebtoken";
import { NextFunction } from "express";
import { Request, Response } from "express";
import { SECRET_KEY } from "../getEnv";
import CryptoService from "../services/crypto";
import { IPolicy } from "../types/Policy";
import { IToken, ITokenPayload } from "../types/Auth";


let globalPolicy = JSON.parse(fs.readFileSync("policy.json", "utf8"));

let  AC = new AccessControl(globalPolicy);

AC = AC.enforce();

const cryptoService = new CryptoService();


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

const ACDynamic  = (
  role : string, 
  action: Array<string>, 
  resource: Array<string>, 
  policy: IPolicy,
  and : boolean | null = null,
  or : boolean | null = null,
  ) => {
    let AC = new AccessControl(policy);
    AC = AC.enforce();
    if (!and && !or) return new GrantQuery(AC).role(role).can(action).on(resource).grant();
    if (and && !or ) return new GrantQuery(AC).role(role).can(action).on(resource).and(and).grant();  
    if (!and && or ) return new GrantQuery(AC).role(role).can(action).on(resource).or(or).grant();
    if (and && or ) return new GrantQuery(AC).role(role).can(action).on(resource).and(and).or(or).grant();
  };


export default authorization;


