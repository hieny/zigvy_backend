import { Body, Controller, Param, ValidationPipe } from '@nestjs/common';
import { BasedService } from 'src/based-services/based-services.service';

@Controller()
export abstract class BaseController<T> {
  constructor(private readonly service: BasedService<T>) {}

  create(@Body(new ValidationPipe()) createDto: any) {
    return this.service.create(createDto);
  }

  findAll() {
    return this.service.findAll();
  }

  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  update(@Param('id') id: string, @Body(new ValidationPipe()) updateDto: any) {
    return this.service.update(id, updateDto);
  }

  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
