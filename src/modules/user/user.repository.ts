import { BaseAbstractRepository } from 'src/based-repositories/base.abstract.repository';
import { User } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { UserRepositoryInterface } from './interface/user.repository.interface';

@Injectable()
export class UserRepository
  extends BaseAbstractRepository<User>
  implements UserRepositoryInterface
{
  constructor(@InjectModel(User.name) model: Model<User>) {
    super(model);
  }
}
