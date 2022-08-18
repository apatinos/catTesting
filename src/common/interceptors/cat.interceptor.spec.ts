import { of } from 'rxjs';
import { CatInterceptor } from './cat.interceptor';

const mockCat = {
  id: 3,
  name: 'testcat 3',
  breed: 'testbreed 3',
  age: 3,
};
const next = {
  handle: () => {
    return of(mockCat);
  },
};

describe('CatInterceptor', () => {
  let catInterceptor: CatInterceptor;

  beforeEach(() => {
    catInterceptor = new CatInterceptor();
  });
  it('should be defined', () => {
    expect(catInterceptor).toBeDefined();
  });
  describe('return data in object', () => {
    it('success return', (done) => {
      catInterceptor.intercept({} as any, next).subscribe({
        next: (value) => {
          expect(value).toEqual({ data: mockCat });
        },
        error: (error) => {
          throw error;
        },
        complete: () => {
          done();
        },
      });
    });
  });
});
