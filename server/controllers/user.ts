import { Response, Request } from "express";
import UserService from "../services/user";
import { SUPER_ADMIN_USERNAME } from "../getEnv";
import PasswordService from "../services/password";
import { Types } from "mongoose";
const { ObjectId } = Types;
import { SuccessResponse, ErrorResponse } from "../utils/responses";

const userService = new UserService();
const passwordService = new PasswordService();


export const getUsers = async function(req : Request, res: Response) : Promise<any> {
  try {
    const foundUsers = await userService.findAll(
      {hashedPassword: 0, salt: 0}
    )

    if (!foundUsers) return ErrorResponse(res, 'users not found', 400);

    return SuccessResponse(res, foundUsers, 'users found', 200);

  } catch (error) {

    return ErrorResponse(res, `error ${error}`, 400);

  }
}

export const createUser = async function(req : Request, res: Response) : Promise<any> {

    try {
      const data = req.body;

      data.createdBy  = SUPER_ADMIN_USERNAME;
      data.createdAt = new Date() ;


      const {salt, hashedPassword} = await passwordService.createPassword(data.password)

      data.salt = salt as string;
      data.hashedPassword = hashedPassword ;

      const newUser = await userService.createUser(data)

      if (!newUser) return ErrorResponse(res, 'user not created', 400);
      
      return SuccessResponse(res, newUser, 'user created', 200);

    } catch (error) {
      return ErrorResponse(res, `error ${error}`, 400); 
    }
 
}

export const updateUser = async function(req : any, res: Response) : Promise<any> {
  try {
    
    const data = req.body;

    if (data?.password){
     const {salt, hashedPassword} = await passwordService.createPassword(data.password);
     data.salt = salt;
     data.hashedPassword = hashedPassword;
    }
    
    const updatedUser = await userService.updateUser(data);

    if (!updatedUser) return ErrorResponse(res, 'user not updated', 400);

    return res.status(200).send({status: true, data: updatedUser, message: 'user updated'});
  } catch (error) {
    return res.status(400).send({status: false, message: `error ${error}`})
  }
}

export const deleteUser = async function(req : any, res: Response) : Promise<any> {
  try {
    let id :  Types.ObjectId = req.query.id;

    id = new ObjectId(id);

    const deletedUser = await userService.deleteUser(id)

    if (!deletedUser) return ErrorResponse(res, 'user not deleted', 400);

    return SuccessResponse(res, deletedUser, 'user deleted', 200);
    
  } catch (error) {

    return ErrorResponse(res, `error ${error}`, 400);

  }
 
}