import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CatService } from './cat.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Observable } from 'rxjs';
import { Cat } from './entities/cat.entity';
import { AxiosResponse } from 'axios';

@Controller('Cat')
export class CatController {
  constructor(private readonly CatService: CatService) {}

  @Post()
  create(@Body() createCatDto: CreateCatDto): Observable<AxiosResponse<Cat[]>> {
    return this.CatService.create(createCatDto);
  }

  @Get()
  findAll(): Observable<AxiosResponse<Cat[]>> {
    return this.CatService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<AxiosResponse<Cat>> {
    return this.CatService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCatDto: UpdateCatDto,
  ): Observable<AxiosResponse<Cat>> {
    return this.CatService.update(+id, updateCatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Observable<AxiosResponse<any>> {
    return this.CatService.remove(+id);
  }
}
