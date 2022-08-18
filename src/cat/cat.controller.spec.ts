import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { CatController } from './cat.controller';
import { CatService } from './cat.service';
import { CatDto } from './dto/cat.dto';

let mockData = [
  { id: 1, name: 'testcat 1', breed: 'testbreed 1', age: 1 },
  { id: 2, name: 'testcat 2', breed: 'testbreed 2', age: 2 },
  { id: 3, name: 'testcat 3', breed: 'testbreed 3', age: 3 },
];

describe('CatController', () => {
  let controller: CatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatController],
      providers: [
        {
          provide: CatService,
          useValue: {
            create: jest.fn().mockReturnValueOnce(of(mockData[0])),
            findAll: jest.fn().mockReturnValueOnce(of(mockData)),
            update: jest.fn().mockReturnValueOnce(of(mockData[1])),
            findOne: jest.fn().mockReturnValueOnce(of(mockData[2])),
            remove: jest.fn().mockReturnValue(of({})),
          },
        },
      ],
    }).compile();

    controller = module.get<CatController>(CatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should add cat structures', () => {
    let createCatDto = new CatDto('testcat 1', 'testbreed 1', 1);
    controller.create(createCatDto).subscribe((data) => {
      expect(data.name).toEqual('testcat 1');
    });
  });

  it('should update a cat structures', () => {
    let updateCatDto = new CatDto('testcat 2', 'testbreed 2', 2);
    controller.update(1, updateCatDto).subscribe((data) => {
      expect(data.name).toEqual('testcat 2');
    });
  });

  it('should findOne a cat structure', () => {
    controller.findOne(3).subscribe((data) => {
      expect(data.name).toEqual('testcat 3');
    });
  });

  it('should findAll cat structures', () => {
    controller.findAll().subscribe((data) => {
      expect(data).toEqual(mockData);
    });
  });

  it('should findAll cat structures', () => {
    controller.remove(3).subscribe((data) => {
      expect(data).toEqual({});
    });
  });
});
