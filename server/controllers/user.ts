import { Response, Request } from "express";
import UserService from "../services/user";
import { SUPER_ADMIN_USERNAME } from "../getEnv";
import PasswordService from "../services/password";

const userService = new UserService();
const passwordService = new PasswordService();


export const getUsers = async function(req : Request, res: Response) : Promise<any> {
  try {

    const foundUsers = await userService.findAll(
      {hashedPassword: 0, salt: 0}
    )

    if (!foundUsers){
      res.status(400).send({status: false, message: `users not found`})
    }

    return res.status(200).send({status: true, data: foundUsers});
    
  
  } catch (err){

    res.status(400).send({status: false, message: `unexpected error ${err}`})

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

    if (!newUser){
      res.status(400).send({status: false, message: `user not created`})
    }

    return res.status(200).send({status: true, data: newUser});
    
  
  } catch (err){

    res.status(400).send({status: false, message: `unexpected error ${err}`})

  }
 
}

export const updateUser = async function(req : any, res: Response) : Promise<any> {
  try {

    const updatedUser = await userService.updateUser(req.body)

    if (!updatedUser){
      res.status(400).send({status: false, message: `user not updated`})
    }

    return res.status(200).send({status: true, data: updatedUser});
    
  
  } catch (err){

    res.status(400).send({status: false, message: `unexpected error ${err}`})

  }
 
}

export const deleteUser = async function(req : any, res: Response) : Promise<any> {
  try {

    const deletedUser = await userService.deleteUser(req.params.userId)

    if (!deletedUser){
      res.status(400).send({status: false, message: `user not deleted`})
    }

    return res.status(200).send({status: true, data: deletedUser})
    
  
  } catch (err){

    res.status(400).send({status: false, message: `unexpected error ${err}`})

  }
 
}