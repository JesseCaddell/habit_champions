import { Test, TestingModule } from '@nestjs/testing';
import { ChampionsController } from './champions.controller';

describe('ChampionsController', () => {
  let controller: ChampionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChampionsController],
    }).compile();

    controller = module.get<ChampionsController>(ChampionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
