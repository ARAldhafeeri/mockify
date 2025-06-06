import {
  IService,
  IBaseEntity,
  IRepository,
  ICreatePayLoad,
} from "../entities/generic";
import { FilterQuery, Types } from "mongoose";
import ObjectId = Types.ObjectId;

export class Service<T extends IBaseEntity> implements IService<T> {
  constructor(protected repository: IRepository<T>) {}

  async find(filter: FilterQuery<T>): Promise<any> {
    return this.repository.find(filter, {});
  }

  async findOne(filter: FilterQuery<T>): Promise<T> {
    return this.repository.findOne(filter);
  }

  async create(record: ICreatePayLoad<T>): Promise<T> {
    return this.repository.create(record);
  }

  async update(record: T): Promise<T> {
    const updatePayload = JSON.parse(JSON.stringify(record));
    delete updatePayload._id;
    return this.repository.update(
      { _id: new ObjectId(record._id) },
      updatePayload
    );
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

  findOrCreate = async (
    filter: FilterQuery<T>,
    record: ICreatePayLoad<T>
  ): Promise<any> => {
    const found = await this.repository.findOne(filter);

    if (found) {
      return found;
    }
    return this.repository.create(record);
  };
}
