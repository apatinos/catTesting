import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CatService } from './cat.service';
import { CatDto } from './dto/cat.dto';

@Controller('cat')
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
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.catService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCatDto: CatDto) {
    return this.catService.update(id, updateCatDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.catService.remove(id);
  }
}
