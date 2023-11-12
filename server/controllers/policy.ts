import { Response, Request } from "express";
import PolicyService from "../services/policy";
import { Types } from "mongoose";

const {ObjectId} = Types; 

const policyService = new PolicyService();

const getPolicy = async function(req : Request, res: Response) : Promise<any> {
  try {

    let projectID = req.query.projectID as string;

    const data = await policyService.findAll({project : projectID});

    return res.status(200).send({status: true, data: data});

  } catch (err){

      res.status(400).send({status: false, message: ` error ${err}`})

  }

} 


const updatePolicy = async function(req : Request, res: Response) : Promise<any> {
  try {

    const data = req.body;

    data.updatedAt = new Date() ;

    policyService.updatePolicy(data);

    return res.status(200).send({status: true, data: data});

  } catch (err){

      res.status(400).send({status: false, message: ` error ${err}`})

  }

}

const deletePolicy = async function(req : Request, res: Response) : Promise<any> {
  try {

    const data = req.body;

    policyService.deletePolicy(data);

    return res.status(200).send({status: true, data: data});

  } catch (err){

      res.status(400).send({status: false, message: ` error ${err}`})

  }

}

const createPolicy = async function(req : Request, res: Response) : Promise<any> {

  try {

    const data = req.body;

    data.createdAt = new Date() ;

    policyService.createPolicy(data);

    return res.status(200).send({status: true, data: data});

  } catch (err){

      res.status(400).send({status: false, message: ` error ${err}`})

  }

}


export { getPolicy, updatePolicy, deletePolicy, createPolicy}

    

