import { Test, TestingModule } from '@nestjs/testing';
import { MeasureunitsController } from './measureunits.controller';

describe('MeasureunitsController', () => {
  let controller: MeasureunitsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MeasureunitsController],
    }).compile();

    controller = module.get<MeasureunitsController>(MeasureunitsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
