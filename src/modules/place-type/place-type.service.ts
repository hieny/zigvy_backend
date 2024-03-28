import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BasedService } from 'src/based-services/based-services.service';
import { PlaceType } from './place-tye.schema';

@Injectable()
export class PlaceTypeService extends BasedService<PlaceType> {
  constructor(@InjectModel(PlaceType.name) model: Model<PlaceType>) {
    super(model);
  }
}
