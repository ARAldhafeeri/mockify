
const jsonwebtoken = require("jsonwebtoken")
import { Request, Response, NextFunction, Express } from 'express';

const authenticationMiddleWareAdminPortal = (req : Request | any, res : Response, next : NextFunction) : void =>  {
    const token = jsonwebtoken.verify(
      req.headers.authorization.split(' ')[1], 
      process.env.SECRET_KEY)
      if (token){
        return next()
      }
      return next(new Error("user not authenticated"))
};


export default authenticationMiddleWareAdminPortal;