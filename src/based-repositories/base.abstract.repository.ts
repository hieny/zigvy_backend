import { Model } from 'mongoose';
import { BaseInterfaceRepository } from './base.inteface.repository';

export abstract class BaseAbstractRepository<T>
  implements BaseInterfaceRepository<T>
{
  private model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }
  
  
  public findExsited(_id: string): boolean {
    return !!this.model.findById({_id})
  }

  public async create(data: T | any): Promise<T> {
    return await this.model.create(data);
  }
  public async findOneById(_id: string): Promise<T> {
    return await this.model.findById({ _id });
  }
  public async findAll(): Promise<T[]> {
    return await this.model.find();
  }

  public async remove(_id: string): Promise<any> {
    return await this.model.deleteOne({ _id });
  }

  public async update(_id: string, updateDto: T | any): Promise<T> {
    return await this.model.findByIdAndUpdate({_id}, updateDto);
  }

  public async findWithCondition(condition: any): Promise<T> {
    return await this.model.findOne(condition)
  }
}
