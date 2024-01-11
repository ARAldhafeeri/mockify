import { Response, Request } from "express";
import PolicyService from "../services/policy";
import { Types } from "mongoose";
import { ErrorResponse, SuccessResponse } from "../utils/responses";
const {ObjectId} = Types;

const policyService = new PolicyService();

const getPolicy = async function(req : Request, res: Response) : Promise<any> {
  try {

    let projectID = req.query.projectID as string;

    const data = await policyService.find({project : projectID});

    return res.status(200).send({status: true, data: data});

  } catch (err){

      res.status(400).send({status: false, message: ` error ${err}`})

  }

} 


const updatePolicy = async function(req : Request, res: Response) : Promise<any> {
  try {

    const data = req.body;

    data?.updatedAt = new Date() ;

    const updated = await policyService.update(data);
    if(!updated) return ErrorResponse(res, "Policy not found", 404)

    return SuccessResponse(res, updated, "Policy updated", 200);

  } catch (err){

      res.status(400).send({status: false, message: ` error ${err}`})

  }

}

const deletePolicy = async function(req : Request, res: Response) : Promise<any> {
  try {

    const id : Types.ObjectId = new ObjectId(req.query.id as string);


    const deleted = await policyService.delete(id);

    if (!deleted) return ErrorResponse(res, "Error deleting policy", 400)

    return SuccessResponse(res, deleted, "Policy deleted", 200);

  } catch (err){

      res.status(400).send({status: false, message: ` error ${err}`})

  }

}

const createPolicy = async function(req : Request, res: Response) : Promise<any> {

  try {

    const data = req.body;

    data?.createdAt = new Date() ;

    const created = await policyService.create(data);

    if (!created) return ErrorResponse(res, "Error creating policy", 400)

    return res.status(200).send({status: true, data: data});

  } catch (err){

      res.status(400).send({status: false, message: ` error ${err}`})

  }

}


export { getPolicy, updatePolicy, deletePolicy, createPolicy}

    

