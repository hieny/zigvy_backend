import { BaseUserDto } from './base-user.dto';

export class CreateUserDto {
  username: string;
  password: string;
  refreshToken: string;
}
