import adminModel from "./models/user";
import PasswordService from "./services/password";
import { superAdmin } from "./config/roles";

import {
  SUPER_ADMIN_PSWD,
  SUPER_ADMIN_EMAIL,
  SUPER_ADMIN_USERNAME,
  ADMIN_USERNAME,
  ADMIN_PSWD,
} from "./getEnv";
import { IProject } from "./entities/project";

import {
  dataService,
  edgeService,
  endpointService,
  eventService,
  policyService,
  projectService,
  resourceService,
  userService,
  passwordService,
} from "./services";

var superAdminDefaultData;
var user;

const randomNane = () => {
  return Math.random().toString(36).substring(7);
};

export const initDefaultData = async () => {
  [superAdminDefaultData] = await adminModel.find({
    username: SUPER_ADMIN_USERNAME,
  });

  if (!superAdminDefaultData) {
    const { hashedPassword, salt } = await passwordService.createPassword(
      SUPER_ADMIN_PSWD
    );
    superAdminDefaultData = {
      username: SUPER_ADMIN_USERNAME,
      email: SUPER_ADMIN_EMAIL,
      role: superAdmin || "superAdmin",
      hashedPassword: hashedPassword,
      salt: salt,
      createdBy: "system",
    };

    superAdminDefaultData = await adminModel.create(superAdminDefaultData);
  }

  [user] = await adminModel.find({ username: ADMIN_USERNAME });

  if (!user) {
    // create mock user
    const { hashedPassword, salt } = await passwordService.createPassword(
      ADMIN_PSWD
    );

    await adminModel.create({
      username: ADMIN_USERNAME,
      email: randomNane() + "@gmail.com",
      role: "admin",
      hashedPassword: hashedPassword,
      salt: salt,
      createdBy: "system",
    });
  }

  console.log("superAdminDefaultData", superAdminDefaultData);

  // create project , super  admin is owner
  let project = await projectService.findOrCreate(
    { name: "default" },
    {
      name: "default",
      apiKey: "lksjfdkjfdjfdieiwoncxn98398239nxnjdhj3838sjhjhsdhjdu3",
      userUID: superAdminDefaultData?._id?.toString(),
    }
  );

  // create project , admin is owner
  let projectAdmin = await projectService.findOrCreate(
    { name: "default2" },
    {
      name: "default2",
      apiKey: "lkjsdflkhjsdfhiewiuweiu",
      userUID: user?._id?.toString(),
    }
  );

  // create resource
  let resource = await resourceService.findOrCreate(
    { project: project?._id?.toString(), name: "default" },
    {
      project: project?._id,
      name: "default",
      features: {
        filter: true,
        pagination: true,
        search: true,
        validation: true,
        getx: true,
        postx: true,
        deletex: true,
        putx: true,
        functions: true,
      },
      funcs: ["string"],
      fields: [
        { name: "name", type: "string", required: true },
        { name: "age", type: "number", required: true },
      ],
    }
  );

  let policy = await policyService.findOrCreate(
    { project: project._id?.toString() },
    {
      project: project._id?.toString(),
      resources: ["default"],
      actions: ["getx", "postx", "putx", "deletex"],
      roles: ["admin", "user"],
      policies: [
        {
          role: "admin",
          can: ["getx", "postx", "putx", "deletex"],
          on: ["default"],
        },
        {
          role: "user",
          can: ["getx", "postx", "putx", "deletex"],
          on: ["default"],
        },
      ],
    }
  );

  let data = await dataService.findOrCreate(
    { resource: resource?._id?.toString() },
    {
      resource: resource?._id,
      data: {
        name: "test",
        age: 20,
      },
    }
  );

  let function1 = await edgeService.findOrCreate(
    { resource: resource?._id?.toString() },
    {
      resource: resource?._id,
      name: "edgeTest",
      code: "data = await ResourceModel.find({});",
      method: "GET",
    }
  );

  let function2 = await edgeService.findOrCreate(
    { resource: resource?._id?.toString() },
    {
      resource: resource?._id,
      name: "edgeTest1",
      code: "data = await ResourceModel.find({});",
      method: "POST",
    }
  );

  let function3 = await edgeService.findOrCreate(
    { resource: resource?._id?.toString() },
    {
      resource: resource?._id,
      name: "edgeTest2",
      code: "data = await ResourceModel.find({});",
      method: "PUT",
    }
  );

  let function4 = await edgeService.findOrCreate(
    { resource: resource?._id?.toString() },
    {
      resource: resource?._id,
      name: "edgeTest3",
      code: "data = await ResourceModel.find({});",
      method: "DELETE",
    }
  );

  let event1 = await eventService.findOrCreate(
    { resource: resource?._id?.toString() },
    {
      resource: resource?._id,
      name: "eventTest",
      handler: "edgeTest",
    }
  );

  let event2 = await eventService.findOrCreate(
    { resource: resource?._id?.toString() },
    {
      resource: resource?._id,
      name: "eventTest1",
      handler: "edgeTest1",
    }
  );

  let event3 = await eventService.findOrCreate(
    { resource: resource?._id?.toString() },
    {
      resource: resource?._id,
      name: "eventTest2",
      handler: "edgeTest2",
    }
  );

  // console log everything for debugging
  console.log("superAdminDefaultData", superAdminDefaultData);
  console.log("user", user);
  console.log("project", project);
  console.log("projectAdmin", projectAdmin);
  console.log("resource", resource);
  console.log("policy", policy);
  console.log("data", data);
  // edge functions
  console.log("function1", function1);
  console.log("function2", function2);
  console.log("function3", function3);
  console.log("function4", function4);

  // events
  console.log("event1", event1);
  console.log("event2", event2);
  console.log("event3", event3);
};
