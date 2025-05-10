import { ICreatePayLoad, IRepository } from "../entities/generic";

import { Model, Document, UpdateQuery, QueryOptions } from "mongoose";
import { FilterQuery, ProjectionType, Types } from "mongoose";

export class Repository<T> implements IRepository<any> {
  constructor(private model: Model<T>) {}

  async find(
    filter: FilterQuery<T>,
    projection: ProjectionType<T>
  ): Promise<T[]> {
    return this.model
      .find(filter, projection)
      .sort({ updatedAt: -1, createdAt: -1 });
  }

  async findAll(filter: FilterQuery<T>): Promise<T[]> {
    return this.model.find(filter);
  }

  async create(record: ICreatePayLoad<T>): Promise<any> {
    const newRecord = new this.model(record);
    return newRecord.save();
  }

  async update(filter: FilterQuery<T>, record: UpdateQuery<T>): Promise<any> {
    return this.model.findOneAndUpdate(filter, record, { new: true }).exec();
  }

  findOrCreate = async (filter: FilterQuery<T>, record: T): Promise<any> => {
    const found = await this.model.findOne(filter);

    if (found) {
      return found;
    }
    const created = this.create(record);
    return created;
  };

  async updateWithQueryOptions(
    filter: FilterQuery<T>,
    record: UpdateQuery<T>,
    queryOptions: QueryOptions<T>
  ): Promise<any> {
    return this.model.findOneAndUpdate(filter, record, {
      new: true,
      ...queryOptions,
    });
  }

  async delete(id: string): Promise<any> {
    return this.model.findOneAndDelete({ _id: id }).exec();
  }

  async count(filter: FilterQuery<any>): Promise<number> {
    return this.model.countDocuments(filter).exec();
  }

  async findOne(filter: FilterQuery<T>): Promise<any | null> {
    return this.model.findOne(filter).exec();
  }

  async findAllWithProjection(
    filter: FilterQuery<T>,
    projection: ProjectionType<T>
  ): Promise<any> {
    return this.model.find(filter, projection);
  }

  findById = async (id: Types.ObjectId): Promise<any> => {
    const foundRes = await this.model.findById(id).lean();

    return foundRes;
  };
}
