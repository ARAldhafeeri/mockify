import { Response, Request } from "express";
import UserService from "services/user";

const userService = new UserService();

interface UserLoginRequest extends Request {
  body: {
    username: string;
    password: string;
  };
}

export const getUsers = async function(req : any, res: Response) : Promise<any> {
  try {

    const foundUsers = await userService.findAll(
      {hashPassword: 0, salt: 0}
    )

    if (!foundUsers){
      res.status(400).send({status: false, message: `users not found`})
    }

    return foundUsers;
    
  
  } catch (err){

    res.status(400).send({status: false, message: `unexpected error ${err}`})

  }
 
}

export const createUser = async function(req : any, res: Response) : Promise<any> {
  try {

    const newUser = await userService.createUser(req.body)

    if (!newUser){
      res.status(400).send({status: false, message: `user not created`})
    }

    return newUser;
    
  
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

    return updatedUser;
    
  
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

    return deletedUser;
    
  
  } catch (err){

    res.status(400).send({status: false, message: `unexpected error ${err}`})

  }
 
}