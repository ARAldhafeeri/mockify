import { DefaultData } from "../defaultData";
import { SUPER_ADMIN_USERNAME } from "../getEnv";
import UserModel, {IUser} from "../models/User";

interface IUserService {
  findAll(projection: Object): Promise<any>;
  createUser(user: IUser): Promise<any>;
  updateUser(user: IUser): Promise<any>;
  deleteUser(userId: string): Promise<any>;
}

class UserService implements IUserService  {
  constructor() {

  }

  findAll = async ( projection: Object) : Promise<any> => {
    const foundUser = UserModel.find( 
      { username: { $ne: SUPER_ADMIN_USERNAME } },
       projection
       )
    
    return foundUser;
  }

  createUser = async (user: IUser) : Promise<any>  => {
    
    const newUser = new UserModel(user);
    const createdUser = await newUser.save();
    return createdUser;
  }

  updateUser = async (user: IUser) : Promise<any> => {
    
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: user._id },
      user,
      { new: true }
    );

    return updatedUser;
  }

  deleteUser = async (id: string) : Promise<any> => {
    
    const deletedUser = await UserModel.findByIdAndDelete(id);

    return deletedUser;
  }
  
}

export default UserService;