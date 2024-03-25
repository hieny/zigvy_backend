import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/user.schema';
import { UserService } from '../user/user.service';
import { JwtAuthenController } from './auth.controller';
import { JwtAuthenService } from './auth.service';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';

@Module({
  imports: [JwtModule.register({}), MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [JwtAuthenController],
  providers: [JwtAuthenService, UserService, JwtService, ConfigService, AccessTokenStrategy, RefreshTokenStrategy],
})
export class JwtAuthenModule {}
