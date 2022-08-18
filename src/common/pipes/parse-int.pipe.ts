import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: any) {
    if (!/^\d+$/.test(value)) {
      throw new BadRequestException('Parametro Id no es un valor valido');
    }
    return Number.parseInt(value, 10);
  }
}
