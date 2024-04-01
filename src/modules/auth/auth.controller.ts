import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthenService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { BaseUserDto } from '../user/dto/base-user.dto';
import { Request } from 'express';
import { AccessTokenGuard } from 'src/common/accessToken.guard';
import { RefreshTokenGuard } from 'src/common/refreshToken.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('authen')
@Controller('authen')
export class JwtAuthenController {
  constructor(private authService: JwtAuthenService) {}

  // @Post('signup')
  // signup(@Body() createUserDto: CreateUserDto) {
  //   return this.authService.signUp(createUserDto);
  // }

  // @Post('signin')
  // signin(@Body() data: BaseUserDto) {
  //   return this.authService.signIn(data);
  // }

  // @UseGuards(AccessTokenGuard)
  // @Post('logout')
  // logout(@Req() req: Request) {
  //   this.authService.logout(req.user['sub']);
  // }

  // @UseGuards(RefreshTokenGuard)
  // @Get('refresh')
  // refreshToken(@Req() req: Request) {
  //   const userId = req.user['sub'];
  //   const refreshToken = req.user['refreshToken'];
  //   // console.log("refreshToken", refreshToken)
  //   return this.authService.refreshTokens(userId, refreshToken);
  // }
}
