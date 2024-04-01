import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags, OmitType } from '@nestjs/swagger';
import { BaseController } from 'src/based-controllers/based-controller.controller';
import { ReturnValue } from 'src/based-services/based-services.service';
import { AccessTokenGuard } from 'src/common/accessToken.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.schema';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { UserServiceInterface } from './interface/user.service.interface';
import { BaseResponseType } from 'src/base-responses/base-response';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    @Inject('UserServiceInterface')
    private readonly userService: UserServiceInterface,
  ) {}

  @Post()
  public async create(@Body() userDto: CreateUserDto): Promise<BaseResponseType<User>> {
    return await this.userService.create(userDto);
  }

  @Get()
  public async findAllUser(): Promise<BaseResponseType<User[]>> {
    return await this.userService.findAllUser();
  }

  @Get()
  public async findOneUser(@Param('id') _id: string): Promise<BaseResponseType<User>> {
    return await this.userService.findOneUser(_id);
  }

  @Put(':id')
  public async update(@Param('id') _id: string, @Body() userDto: UpdateUserDto): Promise<BaseResponseType<User>> {
    return await this.userService.update(_id, userDto);
  }

  @Delete(':id')
  public async deleteUser(@Param('id') _id: string): Promise<BaseResponseType<any>> {
    return await this.userService.deleteUser(_id);
  }
  
}
// export class UserController extends BaseController<User> {
//   constructor(private readonly userService: UserService) {
//     super(userService);
//   }

//   @UseGuards(AccessTokenGuard)
//   @Get()
//   findAll(): Promise<ReturnValue<User[]>> {
//     return this.userService.findAll();
//   }
//   @UseGuards(AccessTokenGuard)
//   @HttpCode(200)
//   @Post()
//   create(@Body() createUserDto: CreateUserDto) {
//     return this.userService.createUser(createUserDto);
//   }

//   @UseGuards(AccessTokenGuard)
//   @Put(':id')
//   update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
//     return this.userService.update(id, updateUserDto);
//   }

//   @UseGuards(AccessTokenGuard)
//   @Get(':id')
//   findOneUser(@Param('id') id: string) {
//     return this.userService.findOneUser(id);
//   }

//   @UseGuards(AccessTokenGuard)
//   @Delete(':id')
//   delete(@Param('id') id: string) {
//     return this.userService.delete(id);
//   }
// }
