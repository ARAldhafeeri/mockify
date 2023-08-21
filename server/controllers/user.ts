import jwt from "jsonwebtoken";
import { Response, Request } from "express";
import { SECRET_KEY } from "../getEnv";
import PasswordService from "../services/password";
import CryptoService from "../services/crypto";
import UserModel from "../models/User";

const passwordService = new PasswordService(),
      cryptoService = new CryptoService();


interface UserLoginRequest extends Request {
  body: {
    username: string;
    password: string;
  };
}

export const userLoginController = async function(req : UserLoginRequest, res: Response) : Promise<any> {
  try {
    const { username , password } = req.body 

    const foundUser = await UserModel.findOne({ username: username })
    
    if (!foundUser) return res.status(400).send({ status: false, message: "user or password is wrong"})

    const verifyPassword = await passwordService.verifyPassword(
      password, foundUser.hashedPassword, foundUser.salt
      )

    if (!verifyPassword) return res.status(400).send({status: false, message: "user or password is wrong"})
    
    const secret = await cryptoService.encryptObj({
      id: foundUser._id, 
      role: foundUser.role, 
      username: foundUser.username })


    const token = jwt.sign({secret: secret},
        SECRET_KEY,  {
      expiresIn: `${process.env.JWT_EXPIRES_IN}`,
    });

    return res.status(200).json({ token: token, uid: foundUser._id})
  
  } catch (err){

    res.status(400).send({status: false, message: `unexpected error ${err}`})

  }
 
}