import adminModel from "./models/User";
import PasswordService from "./services/password";
import { superAdmin } from "./config/roles";

import { 
  SUPER_ADMIN_PSWD, 
  SUPER_ADMIN_EMAIL, 
  SUPER_ADMIN_USERNAME, 
  ADMIN_USERNAME,
  ADMIN_PSWD,
} from "./getEnv";
import ProjectService from "./services/project";
import DataService from "./services/data";
import EndpointService from "./services/endpoint";
import PolicyService from "./services/policy";
import ResourceService from "./services/resource";
import { IProject } from "./types/Project";
import { IResource } from "./types/Resource";
import { IData } from "./types/Data";
import UserService from "./services/user";
import EdgeService from "./services/Edge";
var superAdminDefaultData;
var user;

const passwordService = new PasswordService();
const projService = new ProjectService();
const dataService = new DataService();
const endpointService = new EndpointService();
const policyService = new PolicyService();
const resourceService = new ResourceService();
const edgeService = new EdgeService();

export const initDefaultData = async () => {
    [superAdminDefaultData] = await adminModel.find({username: SUPER_ADMIN_USERNAME})

    console.log("superAdminDefaultData", superAdminDefaultData)
    if (!superAdminDefaultData) {
        
        const {hashedPassword, salt} = await passwordService.createPassword(SUPER_ADMIN_PSWD)
        superAdminDefaultData = {
            username: SUPER_ADMIN_USERNAME,
            email: SUPER_ADMIN_EMAIL,
            role: superAdmin  || 'superAdmin',
            hashedPassword: hashedPassword,
            salt: salt,
            createdBy: "system"
        }
    
        superAdminDefaultData = await adminModel.create(superAdminDefaultData)
    }

    [user] = await adminModel.find({username: ADMIN_USERNAME})

    if(!user){
        // create mock user
        const {hashedPassword, salt} = await passwordService.createPassword(ADMIN_PSWD)

        await adminModel.create({
            username: ADMIN_USERNAME,
            email: "test33232323@test.com",
            role: "admin",
            hashedPassword: hashedPassword,
            salt: salt,
            createdBy: "system"
        })
    }   

    // create project , super  admin is owner
    let project = await projService.findOrCreate({
      name: "default", 
      apiKey: "lksjfdkjfdjfdieiwoncxn98398239nxnjdhj3838sjhjhsdhjdu3", 
      user: superAdminDefaultData._id
    } as IProject)

    // create project , admin is owner
    let projectAdmi = await projService.findOrCreate({
      name : "default2", 
      apiKey: "lkjsdflkhjsdfhiewiuweiu", 
      user: user._id
    } as IProject)

    // create resource
    let resource = await resourceService.findOrCreate({
        project: project._id,
        resourceName: "default",
        features: {
          "filter": true,
          "pagination": true,
          "search": true,
          "validation": true,
          "getx": true,
          "postx": true,
          "deletex": true,
          "putx": true,
          "functions": true,
        },
        funcs: [
          "string"
        ],
        fields: [
          {name: "name", type: "string", required: true},
          {name: "age", type: "number", required: true},
        ]
      } as any)

    let policy = await policyService.findOrCreate({
        project: project._id,
        policies: [
          {
            role: "admin",
            can: ["getx", "postx", "putx", "deletex"],
            on: ["default"]
          },
          {
            role: "user",
            can: ["getx", "postx", "putx", "deletex"],
            on: ["default"] 
          }
        ]
      } as any)


    let data = await dataService.findOrCreate({resource: resource._id, data: {
        name: "test",
        age: 20
    }} as any)

    let function1 = await edgeService.findOrCreate({
        resource: resource._id,
        name: "edgeTest",
        code: "data = await ResourceModel.find({});",
        method: "GET"
    } as any );

    let function2 = await edgeService.findOrCreate({
        resource: resource._id,
        name: "edgeTest1",
        code: "data = await ResourceModel.find({});",
        method: "POST"
    } as any );

    let function3 = await edgeService.findOrCreate({
        resource: resource._id,
        name: "edgeTest2",
        code: "data = await ResourceModel.find({});",
        method: "PUT"
    } as any );

    let function4 = await edgeService.findOrCreate({
        resource: resource._id,
        name: "edgeTest3",
        code: "data = await ResourceModel.find({});",
        method: "DELETE"
    } as any );
    
    // console log everything for debugging
    console.log("superAdminDefaultData", superAdminDefaultData)
    console.log("user", user)
    console.log("project", project)
    console.log("resource", resource)
    console.log("policy", policy)
    console.log("data", data)
    console.log("function1", function1)
    console.log("function2", function2)
    console.log("function3", function3)
    console.log("function4", function4)

}
