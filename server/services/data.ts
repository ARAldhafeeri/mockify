import DataModel from "../models/data";
import { Types } from "mongoose";
import { IData, IDataRepository } from "../entities/data";
import ResourceService from "./resource";
import { IResService } from "../entities/resource";
import { IDataService } from "../entities/data";
import { Service } from "./generic";
import DataRepository from "../repositories/data";
const { ObjectId } = Types;

class DataService extends Service<IData> implements IDataService {
  resourceService: IResService;
  repository: IDataRepository;

  constructor(resourceService: ResourceService, repository: IDataRepository) {
    super(repository);
    this.resourceService = resourceService;
    this.repository = repository;
  }

  create = async (d: IData): Promise<any> => {
    let resource = await this.resourceService.findOne({ _id: d.resource });

    if (!resource) return false;

    let fieldsNames: Array<string> = [];

    resource.fields.forEach(
      (field: { name: string; type: string; required: boolean }) => {
        fieldsNames.push(field.name);
      }
    );

    Object.keys(d?.data ?? {}).forEach((key) => {
      if (!fieldsNames.includes(key)) return false;
    });

    const dNew = new DataModel(d);
    const dCreated = await dNew.save();
    return dCreated;
  };
}

export default DataService;
