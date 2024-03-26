import { Controller, Delete, Get, Post, Put, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';
import { BaseController } from 'src/based-controllers/based-controller.controller';
import { ReturnValue } from 'src/based-services/based-services.service';
import { PlaceType } from './place-tye.schema';
import { PlaceTypeService } from './place-type.service';
import { AccessTokenGuard } from 'src/common/accessToken.guard';

@Controller('category')
export class PlaceTypeController extends BaseController<PlaceType> {
  constructor(private readonly placeTypeService: PlaceTypeService) {
    super(placeTypeService);
  }

  @Post()
  create(createDto: any): Promise<Omit<ReturnValue<PlaceType>, 'data'>> {
    return this.placeTypeService.create(createDto);
  }

  @UseGuards(AccessTokenGuard)
  @Get()
  findAll(): Promise<ReturnValue<PlaceType[]>> {
    return this.placeTypeService.findAll();
  }

  @Get(':id')
  findOne(id: string): Promise<ReturnValue<PlaceType>> {
    return this.placeTypeService.findOne(id);
  }

  @Put(':id')
  update(
    id: string,
    updateDto: any,
  ): Promise<Omit<ReturnValue<any>, 'data'>> {
    return this.placeTypeService.update(id, updateDto);
  }

  @Delete(':id')
  delete(id: string): Promise<Omit<ReturnValue<any>, 'data'>> {
    return this.placeTypeService.delete(id);
  }
}
