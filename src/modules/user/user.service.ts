import {
  ClassSerializerInterceptor,
  Injectable,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
// import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, User } from './user.schema';
import mongoose, { Model } from 'mongoose';
import {
  BasedService,
  ReturnValue,
} from 'src/based-services/based-services.service';
import { UserDto } from './dto/user.dto';

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


  async findOneUser(id: string): Promise<ReturnValue<User>> {
    const data = await this.model.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id)
        }
      },
      {
        $project: {
          password: 0,
          refreshToken: 0, 
        },
      },
    ]);
    const userData = data.length > 0 ? data[0] : null as User
    
    console.log("data", data)
    // Return the first item in the data array, if found
    return {status: true, data: userData}
   
  }
}
