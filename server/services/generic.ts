import { IService, IBaseEntity, IRepository } from "../entities/generic";
import { FilterQuery, Types } from "mongoose";
import ObjectId = Types.ObjectId;

export class Service<T extends IBaseEntity> implements IService<T> {
  constructor(protected repository: IRepository<T>) {}

  async find(userUID: string): Promise<any> {
    const filter = { userUID: userUID };
    const data = await this.repository.find(filter, {});
    return {
      data: data,
    };
  }

  async findOne(filter: FilterQuery<T>): Promise<T> {
    return this.repository.findOne(filter);
  }

  async create(record: T, userUID: string): Promise<T> {
    record.userUID = userUID;
    return this.repository.create(record);
  }

  async update(record: T, userUID: string, recordID: string): Promise<T> {
    const filter = {
      userUID: userUID,
      _id: new ObjectId(recordID),
    };
    return this.repository.update(filter, record);
  }

  async delete(id: string, userUID: string): Promise<T> {
    return this.repository.delete(id, userUID);
  }

  async search(text: string, userUID: string): Promise<T[]> {
    const filter = { userUID: userUID, $text: { $search: text } };
    return this.repository.find(filter, {});
  }

  findById = async (id: Types.ObjectId): Promise<T> => {
    return this.repository.findById(id);
  };
}
