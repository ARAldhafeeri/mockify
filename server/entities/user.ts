import { Document } from "mongoose";
import {Types} from "mongoose";

export interface IUser extends Document {
    username: string;
    hashedPassword: string;
    salt: string;
    role: string;
    email: string;
    createdAt: Date;
    createdBy: string;
}


export interface IUserService {
    findAll(projection: Object): Promise<any>;
    createUser(user: IUser): Promise<any>;
    updateUser(user: IUser): Promise<any>;
    deleteUser(id: Types.ObjectId): Promise<any>;
  }