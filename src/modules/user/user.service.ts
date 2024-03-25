import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
// import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, User } from './user.schema';
import { Model } from 'mongoose';
import { BasedService } from 'src/based-services/based-services.service';

@Injectable()
export class UserService extends BasedService<User> {
  constructor(@InjectModel(User.name) public model: Model<User>) {
    super(model);
  }
  findByUserName(userName: string): Promise<User> {
    return this.model.findOne({ username: userName }).exec();
  }

  async createUser(
    createUser: CreateUserDto,
  ): Promise<{ status: boolean; message: string; data?: User }> {
    try {
      const data = await this.model.create(createUser);
      return { status: true, data, message: 'Successfully created' };
    } catch (error) {
      return { status: false, message: error.message };
    }
  }
}
