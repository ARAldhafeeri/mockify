import { IService, IBaseEntity, IRepository } from "../entities/generic";
import { FilterQuery, Types } from "mongoose";
import ObjectId = Types.ObjectId;

export class Service<T extends IBaseEntity> implements IService<T> {
  constructor(protected repository: IRepository<T>) {}

  async find(filter: FilterQuery<T>): Promise<any> {
    const data = await this.repository.find(filter, {});
    return {
      data: data,
    };
  }

  async findOne(filter: FilterQuery<T>): Promise<T> {
    return this.repository.findOne(filter);
  }

  async create(record: T): Promise<T> {
    return this.repository.create(record);
  }

  async update(record: T): Promise<T> {
    return this.repository.update({ _id: new ObjectId(record._id) }, record);
  }

  async delete(id: string): Promise<T> {
    return this.repository.delete(id);
  }

  async search(text: string): Promise<T[]> {
    const filter = { $text: { $search: text } };
    return this.repository.find(filter, {});
  }

  findById = async (id: Types.ObjectId): Promise<T> => {
    return this.repository.findById(id);
  };
}
