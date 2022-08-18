import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { CatInterceptor } from '../common/interceptors/cat.interceptor';
import { CatService } from './cat.service';
import { CatDto } from './dto/cat.dto';

@Controller('cat')
@UseInterceptors(CatInterceptor)
export class CatController {
  constructor(private readonly catService: CatService) {}

  @Post()
  create(@Body() createCatDto: CatDto) {
    return this.catService.create(createCatDto);
  }

  @Get()
  findAll() {
    return this.catService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.catService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCatDto: CatDto) {
    return this.catService.update(id, updateCatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catService.remove(id);
  }
}
