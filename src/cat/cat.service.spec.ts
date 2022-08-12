import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { CatService } from './cat.service';
import { of } from 'rxjs';

let mockData = [
  { id: 1, name: 'testcat 1', breed: 'testbreed 1', age: 1 },
  { id: 2, name: 'testcat 2', breed: 'testbreed 2', age: 2 },
  { id: 3, name: 'testcat 3', breed: 'testbreed 3', age: 3 },
];

let mockTransformData = { id: 1, name: 'cat 1', breed: 'testbreed 1', age: 1 };

let mockResponse = (data) => {
  return {
    data: data,
    status: 200,
    statusText: 'ok',
    headers: {},
    config: { url: 'http://localhost:3000/mock/1' },
  };
};

describe('CatService', () => {
  let service: CatService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
            post: jest.fn(),
            patch: jest.fn(),
            put: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CatService>(CatService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new cat and return that', () => {
    let { id, ...newCatDto } = mockData[0];

    let postSpy = jest.spyOn(httpService, 'post');

    postSpy.mockReturnValueOnce(of(mockResponse({ id, ...newCatDto })));

    service.create(newCatDto).subscribe({
      next: (val) => {
        newCatDto = val;
      },
      error: (err) => {
        throw err;
      },
      complete: () => {
        expect(postSpy).toBeCalledTimes(1);
        expect({ id, ...newCatDto });
      },
    });
  });

  it('should get a cat by id', () => {
    let { id, ...catDto } = mockData[1];

    let getSpy = jest.spyOn(httpService, 'get');
    getSpy.mockReturnValueOnce(of(mockResponse({ id, ...catDto })));

    const transformCatSpy = jest.spyOn(service, 'transformName');
    transformCatSpy.mockReturnValueOnce(mockTransformData);

    service.findOne('' + id).subscribe({
      next: (cat) => {
        catDto = cat;
      },
      error: () => {},
      complete: () => {
        expect(getSpy).toBeCalledTimes(1);
        expect(transformCatSpy).toBeCalledTimes(1);
        expect(mockTransformData);
      },
    });
  });

  it('should get all cats', () => {
    let getSpy = jest.spyOn(httpService, 'get');
    getSpy.mockReturnValueOnce(of(mockResponse(mockData)));

    service.findAll().subscribe((data) => {
      expect(data).toEqual(mockResponse(mockData).data);
    });
  });

  it('Should update a cat data', () => {
    const { id, ...catDataUpdate } = mockData[2];

    let updateSpy = jest.spyOn(httpService, 'put');
    updateSpy.mockReturnValueOnce(of(mockResponse(mockData[2])));

    service.update('' + id, catDataUpdate).subscribe((data) => {
      expect(data).toEqual(mockResponse(mockData[2]).data);
    });
  });

  it('Should Delete a cat data', () => {
    let deleteSpy = jest.spyOn(httpService, 'delete');
    deleteSpy.mockReturnValueOnce(of(mockResponse(mockData[1])));

    service.remove('2').subscribe((data) => {
      expect(data).toEqual(mockResponse(mockData[1]).data);
    });
  });

  it('Should transform Cat Data', ()=>{
    const cat = mockData[0];
    let catTransform = service.transformName(cat);
    expect(catTransform).toEqual(mockTransformData);

  })
});
