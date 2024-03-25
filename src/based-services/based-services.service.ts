import { Document, Model } from 'mongoose';

export class ReturnValue<T> {
  status: boolean;
  data?: T;
  message?: string;
}

export abstract class BasedService<T> {
  constructor(public model: Model<T>) {}
  async findAll(): Promise<ReturnValue<T[]>> {
    try {
      const data = await this.model.find().exec();
      return { status: true, data };
    } catch (error) {
      return { status: false, data: [], message: error.message };
    }
  }
  async findOne(id: string): Promise<ReturnValue<T>> {
    try {
      const data = await this.model.findOne({ _id: id }).exec();
      return { status: true, data };
    } catch (error) {
      return { status: false, message: error.message };
    }
  }

  async create(createDto: T): Promise<ReturnValue<T>> {
    try {
      const data = await this.model.create(createDto);
      return { status: true, message: 'Successfully created' };
    } catch (error) {
      return { status: false, message: error.message };
    }
  }

  async update(_id: string, updateDto: Partial<T>): Promise<ReturnValue<T>> {
    try {
      const updatedDocument = await this.model
        .findOneAndUpdate({ _id: _id }, updateDto, {
          new: true,
        })
        .exec();
      if (!updatedDocument) {
        return { status: false, message: 'Document not found' };
      }
      return {
        status: true,
        message: 'Successfully updated',
        data: updatedDocument,
      };
    } catch (error) {
      return { status: false, message: error.message };
    }
  }

  async delete(id: string): Promise<ReturnValue<T>> {
    try {
      await this.model.deleteOne({ _id: id }).exec();
      return { status: true, message: 'Successfully deleted' };
    } catch (error) {
      return { status: false, message: error.message };
    }
  }
}
