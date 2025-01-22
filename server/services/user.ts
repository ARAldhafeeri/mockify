import { IUser, IUserRepository } from "../entities/user";
import { IUserService } from "../entities/user";
import { Service } from "./generic";

class UserService extends Service<IUser> implements IUserService {}

export default UserService;
