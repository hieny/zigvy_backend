import { BaseResponseType } from 'src/base-responses/base-response';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../user.schema';

export interface UserServiceInterface {
  create(userDto: CreateUserDto): Promise<BaseResponseType<User>>;

  findAllUser(): Promise<BaseResponseType<User[]>>
  
  update(_id: string, userDto: UpdateUserDto): Promise<BaseResponseType<User>>
  
  deleteUser(_id: string): Promise<BaseResponseType<any>>
  
  findByUserName(username: string): Promise<User>

  findOneUser(_id: string): Promise<BaseResponseType<User>>

}
