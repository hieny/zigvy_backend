import { Controller, Get, Post } from '@nestjs/common';
import { BaseController } from 'src/based-controllers/based-controller.controller';
import { ReturnValue } from 'src/based-services/based-services.service';
import { Place } from './place.schema';
import { PlaceService } from './place.service';

@Controller('place')
export class PlaceController extends BaseController<Place> {
  constructor(private readonly placeService: PlaceService) {
    super(placeService);
  }

  @Get()
  findAll(): Promise<ReturnValue<Place[]>> {
    return this.placeService.findAll()
  }

  @Post()
  create(createDto: Place): Promise<ReturnValue<Place>> {
    return this.placeService.create(createDto);
  }
}
