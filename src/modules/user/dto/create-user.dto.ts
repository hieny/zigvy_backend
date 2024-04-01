import { IsNotEmpty } from 'class-validator';
import { BaseUserDto } from './base-user.dto';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  refreshToken: string;
}
