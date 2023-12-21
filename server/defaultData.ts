import adminModel from "./models/User";
import PasswordService from "./services/password";
import { superAdmin } from "./config/roles";

import { SUPER_ADMIN_PSWD, SUPER_ADMIN_EMAIL, SUPER_ADMIN_USERNAME } from "./getEnv";
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

    [user] = await adminModel.find({username: "test123"})

    if(!user){
        // create mock user
        const {hashedPassword, salt} = await passwordService.createPassword("test123")

        await adminModel.create({
            username: "test123",
            email: "test33232@test.com",
            role: "admin",
            hashedPassword: hashedPassword,
            salt: salt,
            createdBy: "system"
        })
    }
   

    // create project 
    let project = await projService.findOrCreate({name: "default", apiKey: "lksjfdkjfdjfdieiwoncxn98398239nxnjdhj3838sjhjhsdhjdu3", user: superAdminDefaultData._id} as IProject)
    
    console.log("created project", project)
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
          "putx": true,
          functions: true,
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
        name: "function1",
        code: "function1",
        method: "GET"
    } as any );

    let function2 = await edgeService.findOrCreate({
        resource: resource._id,
        name: "function2",
        code: "function2",
        method: "POST"
    } as any );

    let function3 = await edgeService.findOrCreate({
        resource: resource._id,
        name: "function3",
        code: "function3",
        method: "PUT"
    } as any );

    let function4 = await edgeService.findOrCreate({
        resource: resource._id,
        name: "function4",
        code: "function4",
        method: "DELETE"
    } as any );

    console.log(function1, function2, function3, function4)

    

}
