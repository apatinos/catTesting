import { BadRequestException } from '@nestjs/common';
import { ParseIntPipe } from './parse-int.pipe';

describe('ParseIntPipe', () => {
  let pipe: ParseIntPipe;

  beforeEach(() => {
    pipe = new ParseIntPipe();
  });

  it('should be defined', () => {
    expect(pipe).toBeDefined();
  });

  describe('sucess calls', () => {
    for (let i = 0; i <= 10; i++) {
      it('sucess call with a number', () => {
        const random = Math.floor(Math.random() * 1000) % 1000;
        expect(pipe.transform(random.toString())).toBe(random);
      });
    }
  });

  it('unsucessful call with a number', () => {
    expect(() => pipe.transform('true')).toThrowError(BadRequestException);
    expect(() => pipe.transform('true')).toThrowError(
      'Parametro Id no es un valor valido',
    );
  });
});
