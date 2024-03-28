import { Controller, Get, Post, Query } from '@nestjs/common';
import { BaseController } from 'src/based-controllers/based-controller.controller';
import { ReturnValue } from 'src/based-services/based-services.service';
import { Place } from './place.schema';
import { PlaceService } from './place.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('place')
@Controller('place')
export class PlaceController extends BaseController<Place> {
  constructor(private readonly placeService: PlaceService) {
    super(placeService);
  }

  @Get()
  findAll(): Promise<ReturnValue<Place[]>> {
    return this.placeService.findAll();
  }

  @Get('/pagination')
  @ApiQuery({ name: 'skip', required: true, type: Number, description: 'Number of documents to skip' })
  @ApiQuery({ name: 'limit', required: true, type: Number, description: 'Number of documents to return' })
  findAllWithPagination({ skip, limit }: { skip: number; limit: number }): Promise<ReturnValue<Place[]>> {
    return this.placeService.findWithPagination(skip, limit);
  }

  @Post()
  create(createDto: Place): Promise<ReturnValue<Place>> {
    return this.placeService.create(createDto);
  }
}
