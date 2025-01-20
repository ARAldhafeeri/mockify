import { SUPER_ADMIN_USERNAME } from "../getEnv";
import UserModel from "../models/user";
import { Types } from "mongoose";
import { IUser } from "../entities/user";
import { IUserService } from "../entities/user";

class UserService implements IUserService {
  constructor() {}

  findAll = async (projection: Object): Promise<any> => {
    const foundUser = UserModel.find(
      { username: { $ne: SUPER_ADMIN_USERNAME } },
      projection
    );

    return foundUser;
  };

  createUser = async (user: IUser): Promise<any> => {
    const newUser = new UserModel(user);
    const createdUser = await newUser.save();
    return createdUser;
  };

  updateUser = async (user: IUser): Promise<any> => {
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: user._id },
      user,
      { new: true }
    );

    return updatedUser;
  };

  deleteUser = async (id: Types.ObjectId): Promise<any> => {
    const deletedUser = await UserModel.findByIdAndDelete(id);

    return deletedUser;
  };

  findOrCreate = async (user: IUser): Promise<any> => {
    const found = await UserModel.findOne({ username: user.username });

    if (found) {
      return found;
    }

    const NEW = new UserModel(found);
    const created = await NEW.save();
    return created;
  };
}

export default UserService;
