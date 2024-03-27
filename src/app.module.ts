import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { JwtAuthenModule } from './modules/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PlaceTypeModule } from './modules/place-type/place-type.module';
import { ConfigModule } from '@nestjs/config';
import { PlaceModule } from './modules/place/place.module';

@Module({
  imports: [
    JwtAuthenModule,
    UserModule,
    PlaceTypeModule,
    PlaceModule,
    MongooseModule.forRoot('mongodb://localhost/zigvy'),
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
