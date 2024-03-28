import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { BaseController } from 'src/based-controllers/based-controller.controller';
import { ReturnValue } from 'src/based-services/based-services.service';
import { AccessTokenGuard } from 'src/common/accessToken.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.schema';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController extends BaseController<User> {
  constructor(private readonly userService: UserService) {
    super(userService);
  }

  @UseGuards(AccessTokenGuard)
  @Get()
  findAll(): Promise<ReturnValue<User[]>> {
    return this.userService.findAll();
  }

  @UseGuards(AccessTokenGuard)
  @HttpCode(200)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @UseGuards(AccessTokenGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @UseGuards(AccessTokenGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
