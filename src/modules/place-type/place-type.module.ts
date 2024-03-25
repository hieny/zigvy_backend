import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PlaceType, PlaceTypeSchema } from './place-tye.schema';
import { PlaceTypeController } from './place-type.controller';
import { PlaceTypeService } from './place-type.service';

@Module({
  imports:  [MongooseModule.forFeature([{ name: PlaceType.name, schema: PlaceTypeSchema }])],
  controllers: [PlaceTypeController],
  providers: [PlaceTypeService, JwtService],
})
export class PlaceTypeModule {}
