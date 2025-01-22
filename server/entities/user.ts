import { Document } from "mongoose";
import { Types } from "mongoose";
import { IBaseEntity, IRepository, IService } from "./generic";

export interface IUser extends IBaseEntity {
  username: string;
  hashedPassword: string;
  salt: string;
  role: string;
  email: string;
}

export interface IUserRepository extends IRepository<IUser> {}

export interface IUserService extends IService<IUser> {}
