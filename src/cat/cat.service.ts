import { BadRequestException, Injectable } from '@nestjs/common';
import { CatDto } from './dto/cat.dto';
import { Cat } from './entities/cat.entity';

@Injectable()
export class CatService {
  cats: Cat[] = [
    new CatDto('testcat 1', 'testbreed 1', 1),
    new CatDto('testcat 2', 'testbreed 2', 2),
    new CatDto('testcat 3', 'testbreed 3', 3),
  ];

  create(createCatDto: CatDto) {
    let cat: Cat = {
      ...createCatDto,
    };
    this.cats.push(cat);
    return cat;
  }

  findAll() {
    return this.cats;
  }

  findOne(name: string) {
    const catFinded  = this.cats.find((cat)=> cat.name == name);
    if(!catFinded){
      throw new BadRequestException('no se encontro del gato con el  nombre: '+name)
    }
    return catFinded;
  }

  update(name: string, updateCatDto: Cat) {
    this.cats.map((cat)=>{if(cat.name == name) return updateCatDto});
    return updateCatDto;
  }

  remove(name: string) {
    this.cats = this.cats.filter((cat)=>{
      return cat.name != name
    })
    return this.cats;
  }
}
