import { IUser, IUserRepository } from "../entities/user";
import { Repository } from "./generic";

class UserRepository extends Repository<IUser> implements IUserRepository {}

export default UserRepository;
