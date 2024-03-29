import { OmitType } from '@nestjs/swagger';
import { User } from '../user.schema';
import { Exclude } from 'class-transformer';

export class UserDto {
  _id: string;
  username: string;
  phoneNumber: string;

  @Exclude()
  password: string;

  @Exclude()
  refreshToken: string;

  constructor(partial: Partial<UserDto>) {
    Object.assign(this, partial);
  }
}
