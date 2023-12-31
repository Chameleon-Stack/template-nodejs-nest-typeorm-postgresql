import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import request from 'supertest';
import { UserRepository } from '../../../../users/repositories/user.repository';
import { CategoryEntity } from '../../../entities/category.entity';
import { CategoryRepository } from '../../../repositories/category.repository';
import { GetCategoriesController } from '../get-categories.controller';
import { GetCategoriesUseCase } from '../get-categories.usecase';

describe('Get categories Controller', () => {
  let app: INestApplication;
  let getCategoriesUseCase: GetCategoriesUseCase;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [GetCategoriesController],
      providers: [
        GetCategoriesUseCase,
        {
          provide: getRepositoryToken(CategoryRepository),
          useValue: {},
        },
        {
          provide: getRepositoryToken(UserRepository),
          useValue: {},
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    getCategoriesUseCase =
      moduleRef.get<GetCategoriesUseCase>(GetCategoriesUseCase);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    app.close();
  });

  it('should be defined', async () => {
    expect(getCategoriesUseCase).toBeDefined();
  });

  it('Should be able to get categories and return status 200', async () => {
    const category = [{ name: 'Test category' } as CategoryEntity];

    const createCategoryUseCaseSpy = jest
      .spyOn(getCategoriesUseCase, 'execute')
      .mockResolvedValueOnce(category);

    const result = await request(app.getHttpServer())
      .get('/category/c36614aa-b41d-4b3a-b454-bed69f431ff5')
      .send('Test category')
      .expect(HttpStatus.OK);

    expect(result.body).toEqual(category);
    expect(createCategoryUseCaseSpy).toHaveBeenCalled();
  });
});
