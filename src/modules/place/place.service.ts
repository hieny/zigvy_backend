import { Injectable } from '@nestjs/common';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import {
  BasedService,
  ReturnValue,
} from 'src/based-services/based-services.service';
import { Place } from './place.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PlaceService extends BasedService<Place> {
  constructor(@InjectModel(Place.name) model: Model<Place>) {
    super(model);
  }
}
