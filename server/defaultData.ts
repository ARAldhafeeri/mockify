import adminModel from "./models/User";
import PasswordService from "./services/password";
import { superAdmin } from "./config/roles";

import { SUPER_ADMIN_PSWD, SUPER_ADMIN_EMAIL, SUPER_ADMIN_USERNAME } from "./getEnv";
import ProjectService from "./services/project";
import DataService from "./services/data";
import EndpointService from "./services/endpoint";
import PolicyService from "./services/policy";
import ResourceService from "./services/resource";
import { IProject } from "./models/Project";
import { IResource } from "./models/Resource";
import { IData } from "./models/Data";
import UserService from "./services/user";
var superAdminDefaultData;
var user;

const passwordService = new PasswordService();
const projService = new ProjectService();
const dataService = new DataService();
const endpointService = new EndpointService();
const policyService = new PolicyService();
const resourceService = new ResourceService();

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
          "webhook": true,
          "sse": false,
          "wss": true,
          "getx": true,
          "postx": true,
          "putx": true,
          "deletex": true,
          "consumer": true,
          "producer": true,
        },
        funcs: [
          "string"
        ],
        fields: [
          {name: "name", type: "string", required: true},
          {name: "age", type: "number", required: true},
        ]
      } as any)
    
    console.log("created resource", resource)

    // create data
    let data = await dataService.findOrCreate({resource: resource._id, data: {}} as IData)

    console.log("created data", data)
    

}
