import {
  BadRequestException,
  Inject,
  Injectable
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
// import { User } from './entities/user.entity';
import { UserRepositoryInterface } from './interface/user.repository.interface';
import { UserServiceInterface } from './interface/user.service.interface';
import { User } from './user.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { BaseResponseType } from 'src/base-responses/base-response';

@Injectable()
export class UserService implements UserServiceInterface {
  constructor(
    @Inject('UserRepositoryInterface')
    public userRepository: UserRepositoryInterface,
  ) {}

  private findExsitedUser (_id: string):boolean {
    return this.userRepository.findExsited(_id)
  }

  public async create(userDto: CreateUserDto): Promise<BaseResponseType<User>> {
    try {
        const data = await this.userRepository.create(userDto)
        return { status: true, data, message: 'Successfully created' };

    } catch (error) {
        throw new Error(error)
    }
  }

  public async findAllUser(): Promise<BaseResponseType<User[]>> {
    const data = await this.userRepository.findAll()
    return { status: true, data };
  }

  public async update(_id: string, userDto: UpdateUserDto): Promise<BaseResponseType<User>> {
    if(!this.findExsitedUser) {
      throw new BadRequestException('Document not found')
    }
    
    const data = await this.userRepository.update(_id, userDto)
    return { status: true, data, message: 'Successfully updated' };
    
  }

  public async deleteUser(_id: string): Promise<BaseResponseType<any>> {
    if(!this.findExsitedUser) {
      throw new BadRequestException('Document not found')
    }
    this.userRepository.remove(_id)
    
    return { status: true, message: 'Successfully deleted' };

  }

  public async findByUserName(username: string): Promise<User> {
    try {
      const data = await this.userRepository.findWithCondition({username})
      return data
    } catch (error) {
      throw new BadRequestException("Could not find user by username: " + username)
    }
  }
  
  public async findOneUser(_id: string): Promise<BaseResponseType<User>> {
    try {
      const data = await this.userRepository.findOneById(_id)
      return { status: true, data };
    } catch (error) {
      throw new BadRequestException("Could not found user by id: " + _id)
    }
  }
  
}
