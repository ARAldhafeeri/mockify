import { SUPER_ADMIN_USERNAME } from "../getEnv";
import { create } from "domain";
import UserModel, {IUser} from "../models/User";

interface IUserService {
  findAll(projection: Object): Promise<object>;
}

class UserService implements IUserService  {
  constructor() {

  }

  findAll = async ( projection: Object) => {
    const foundUser = UserModel.find( 
      { username: { $ne: SUPER_ADMIN_USERNAME } },
       projection
       )
    
    return foundUser;
  }

  createUser = async (user: IUser) => {
    
    const newUser = new UserModel(user);
    const createdUser = await newUser.save();
    return createdUser;
  }

  updateUser = async (user: IUser) => {
    if (user.username === SUPER_ADMIN_USERNAME) {
      throw new Error("super admin cannot be updated");
    };
    
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: user._id },
      user,
      { new: true }
    );

    return updatedUser;
  }

  deleteUser = async (userId: string) => {
    const deletedUser = await UserModel.findOneAndDelete(
      { _id: userId }
    );

    return deletedUser;
  }
  
}

export default UserService;