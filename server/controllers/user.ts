import { Response, Request } from "express";
import UserService from "../services/user";
import { SUPER_ADMIN_USERNAME } from "../getEnv";
import PasswordService from "../services/password";
import { Types } from "mongoose";
import { SuccessResponse, ErrorResponse } from "../utils/responses";
import Controller from "./generic";
import { asyncController } from "../utils/handlers";
import { IUserService } from "../entities/user";

const { ObjectId } = Types;

class UserController {
  service: IUserService;
  passwordService: PasswordService;
  constructor(service: IUserService, passwordService: PasswordService) {
    this.passwordService = passwordService;
    this.service = service;
  }

  getUsers = asyncController(async (req: Request, res: Response) => {
    const foundUsers = await this.service.find({});

    if (!foundUsers) return ErrorResponse(res, "users not found", 400);

    return SuccessResponse(res, foundUsers, "users found", 200);
  });

  createUser = asyncController(async (req: Request, res: Response) => {
    const data = req.body;
    data.createdBy = SUPER_ADMIN_USERNAME;
    data.createdAt = new Date();

    const { salt, hashedPassword } = await this.passwordService.createPassword(
      data?.password
    );
    data.salt = salt;
    data.hashedPassword = hashedPassword;

    const newUser = await this.service.create(data);

    if (!newUser) return ErrorResponse(res, "user not created", 400);

    return SuccessResponse(res, newUser, "user created", 200);
  });

  updateUser = asyncController(async (req: Request, res: Response) => {
    const data = req.body;

    if (data?.password) {
      const { salt, hashedPassword } =
        await this.passwordService.createPassword(data?.password);
      data.salt = salt;
      data.hashedPassword = hashedPassword;
    }

    const updatedUser = await this.service.update(data);

    if (!updatedUser) return ErrorResponse(res, "user not updated", 400);

    return SuccessResponse(res, updatedUser, "user updated", 200);
  });

  deleteUser = asyncController(async (req: Request, res: Response) => {
    const deletedUser = await this.service.delete(req.query.id as string);

    if (!deletedUser) return ErrorResponse(res, "user not deleted", 400);

    return SuccessResponse(res, deletedUser, "user deleted", 200);
  });
}

export default UserController;
