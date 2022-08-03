import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { CatController } from './cat.controller';
import { CatService } from './cat.service';

const testCat = { id: 1, name: 'Test cat', age: 5, breed: 'Russian Blue' };
const testCatUpdate = {
  id: 1,
  name: 'Test cat Update',
  age: 5,
  breed: 'Russian Blue',
};

describe('CatController', () => {
  let controller: CatController;
  let service: CatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatController],
      providers: [
        {
          provide: CatService,
          useValue: {
            findAll: jest.fn(() => of([testCat])),
            findOne: jest.fn(() => of(testCat)),
            create: jest.fn(() => of(testCat)),
            update: jest.fn(() => of(testCatUpdate)),
            remove: jest.fn(() => of()),
          },
        },
      ],
    }).compile();

    controller = module.get<CatController>(CatController);
    service = module.get<CatService>(CatService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get the Cat', () => {
    controller.findAll().subscribe((res) => {
      expect(res).toEqual([testCat]);
    });
  });

  it('should get one cat', () => {
    controller.findOne('a id').subscribe((res) => {
      expect(res).toEqual(testCat);
    });
  });

  it('should make a new cat', () => {
    controller
      .create({
        name: 'Test Cat',
        age: 5,
        breed: 'Russian Blue',
      })
      .subscribe((res) => {
        expect(res).toEqual(testCat);
      });
  });

  it('should make a cat update', () => {
    controller
      .update('a id', {
        id: 5,
        name: 'Test Cat Update',
        age: 5,
        breed: 'Russian Blue',
      })
      .subscribe((res) => {
        expect(res).toEqual(testCatUpdate);
      });
  });

  it('should remove a one cat', () => {
    controller.remove('a id').subscribe((res) => {
      expect(res).toBeUndefined();
      expect(res).toHaveBeenCalled();
    });
  });
});
