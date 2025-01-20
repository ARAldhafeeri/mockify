import jwt from "jsonwebtoken";
import { Response, Request } from "express";
import { SECRET_KEY, JWT_EXPIRES_IN } from "../getEnv";
import PasswordService from "../services/password";
import CryptoService from "../services/crypto";
import UserModel from "../models/user";

const passwordService = new PasswordService(),
  cryptoService = new CryptoService();

interface UserLoginRequest extends Request {
  body: {
    username: string;
    password: string;
  };
}

export const userLoginController = async function (
  req: UserLoginRequest,
  res: Response
): Promise<any> {
  try {
    const { username, password } = req.body;

    const foundUser = await UserModel.findOne({ username: username });

    if (!foundUser)
      return res
        .status(400)
        .send({ status: false, message: "user or password is wrong" });

    const verifyPassword = await passwordService.verifyPassword(
      password,
      foundUser.hashedPassword,
      foundUser.salt
    );

    if (!verifyPassword)
      return res
        .status(400)
        .send({ status: false, message: "user or password is wrong" });

    const token = jwt.sign(
      {
        userUID: foundUser._id,
        role: foundUser.role,
        username: foundUser.username,
      },
      SECRET_KEY,
      {
        expiresIn: JWT_EXPIRES_IN,
      }
    );

    return res.status(200).json({
      token: token,
      uid: foundUser._id,
      status: true,
      message: "successful Login !",
    });
  } catch (err) {
    res.status(400).send({ status: false, message: ` error ${err}` });
  }
};
