import ResourceModel from "../models/Resource"
import DataModel from "../models/Data"
import ProjectModel from "../models/Project"
import PolicyModel from "../models/Policy"
import mongoose, { Types } from "mongoose";
import EdgeModel from "../models/Edge";
import { faker } from '@faker-js/faker';
import {AccessControl , GrantQuery} from "gatewatch"

const CONTEXT = {
  mongoose,
  ResourceModel,
  DataModel,
  ProjectModel,
  PolicyModel,
  EdgeModel,
  data: {},
  faker, 
  AccessControl,
  GrantQuery
};

export default CONTEXT;