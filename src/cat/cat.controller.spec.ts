import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CatController } from './cat.controller';
import { CatService } from './cat.service';
import { CatDto } from './dto/cat.dto';

describe('CatController', () => {
  let controller: CatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatController],
      providers: [
        {
          provide: CatService,
          useValue: {
            create: jest
              .fn()
              .mockReturnValue(new CatDto('testcat 4', 'testbreed 4', 4)),
            findAll: jest
              .fn()
              .mockReturnValue([
                new CatDto('testcat 1', 'testbreed 1', 1),
                new CatDto('testcat 2', 'testbreed 2', 2),
                new CatDto('testcat 3', 'testbreed 3', 3),
              ]),
            update: jest
              .fn()
              .mockReturnValue(new CatDto('testcat 1', 'testbreed 1', 2)),
            findOne: jest
              .fn()
              .mockReturnValue(new CatDto('testcat 1', 'testbreed 1', 2)),
            remove: jest
              .fn()
              .mockReturnValue([
                new CatDto('testcat 1', 'testbreed 1', 1),
                new CatDto('testcat 2', 'testbreed 2', 2),
                new CatDto('testcat 3', 'testbreed 3', 3),
              ]),
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
    let createCatDto = new CatDto('testcat 4', 'testbreed 4', 4);
    let createCallFunction = controller.create(createCatDto);
    expect(createCallFunction.name).toEqual('testcat 4');
  });

  it('should update a cat structures', () => {
    let updateCatDto = new CatDto('testcat 1', 'testbreed 1', 2)
    let updateCallFunction = controller.update(updateCatDto.name, updateCatDto);
    expect(updateCallFunction.age).toEqual(2);
  });

  it('should findOne a cat structure', () => {
    let findOneCallFunction = controller.findOne('testcat 1');
    expect(findOneCallFunction.age).toEqual(2);
  });

  it('should findAll cat structures', () => {
    let findOneCallFunction = controller.findAll();
    expect(findOneCallFunction.length).toEqual(3);
  });


  it('should findAll cat structures', () => {
    let findOneCallFunction = controller.remove('testcat 4');
    expect(findOneCallFunction.length).toEqual(3);
  });


});
