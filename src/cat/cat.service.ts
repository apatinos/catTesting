import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';
import { CatDto } from './dto/cat.dto';
import { Cat } from './entities/cat.entity';

@Injectable()
export class CatService {
  constructor(private httpService: HttpService) {}

  create(createCatDto: CatDto) {
    return this.httpService
      .post('http://localhost:3000/cats', createCatDto)
      .pipe(map((response) => response.data));
  }

  findAll() {
    return this.httpService
      .get('http://localhost:3000/cats')
      .pipe(map((response) => response.data));
  }

  findOne(id: number) {
    return this.httpService
      .get(`http://localhost:3000/cats/${id}`)
      .pipe(map((response) => this.transformName(response.data)));
  }

  update(id: number, updateCatDto: CatDto) {
    return this.httpService
      .put(`http://localhost:3000/cats/${id}`, updateCatDto)
      .pipe(map((response) => response.data));
  }

  remove(id: number) {
    return this.httpService
      .delete(`http://localhost:3000/cats/${id}`)
      .pipe(map((response) => response.data));
  }

  transformName(cat: Cat) {
    const catTransform = cat;
    if (catTransform.name.includes('testcat')) {
      catTransform.name = catTransform.name.replace('testcat', 'cat');
    }
    return catTransform;
  }
}
