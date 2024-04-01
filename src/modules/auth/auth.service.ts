import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { BaseUserDto } from '../user/dto/base-user.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class JwtAuthenService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async signUp(createUserDto: CreateUserDto): Promise<any> {
    // Check if user exists
    const userExists = await this.usersService.findByUserName(
      createUserDto.username,
    );
    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    // Hash password
    const hash = await this.hashData(createUserDto.password);
    const newUser = await this.usersService.create({
      ...createUserDto,
      password: hash,
    });

    const tokens = await this.getTokens(
      newUser.data._id,
      newUser.data.username,
    );
    // console.log('tokens', tokens);
    await this.updateRefreshToken(newUser.data._id, tokens.data.refreshToken);
    return tokens;
  }

  async signIn(data: BaseUserDto) {
    // Check if user exists
    const user = await this.usersService.findByUserName(data.username);
    // console.log('user', user);
    if (!user) throw new BadRequestException('User does not exist');
    const passwordMatches = await argon2.verify(user.password, data.password);
    if (!passwordMatches)
      throw new BadRequestException('Password is incorrect');

    // console.log('user', user);
    const tokens = await this.getTokens(user._id, user.username);
    // console.log('tokens', tokens);
    await this.updateRefreshToken(user._id, tokens.data.refreshToken);
    return tokens;
  }

  async logout(userId: string) {
    await this.usersService.update(userId, { refreshToken: null });
    return {
      status: true,
      message: 'Successfully logged out',
    };
  }

  hashData(data: string) {
    return argon2.hash(data);
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.usersService.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  async getTokens(
    userId: string,
    username: string,
  ): Promise<{
    status: boolean;
    data: { accessToken: string; refreshToken: string };
  }> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '1d',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);
    const tokens = {
      accessToken,
      refreshToken,
    };
    return {
      status: true,
      data: tokens,
    };
  }

  async refreshTokens(
    userId: string,
    refreshToken: string,
  ): Promise<{
    status: boolean;
    data: { accessToken: string; refreshToken: string };
  }> {
    const user = await this.usersService.findOneUser(userId);
    if (!user || !user.data.refreshToken)
      throw new ForbiddenException('Access Denied');
    const refreshTokenMatches = await argon2.verify(
      user.data.refreshToken,
      refreshToken,
    );
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(user.data._id, user.data.username);
    await this.updateRefreshToken(user.data._id, tokens.data.refreshToken);
    return tokens;
  }
}
