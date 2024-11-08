import { Test, TestingModule } from '@nestjs/testing';
import { MeasureunitsService } from './measureunits.service';

describe('MeasureunitsService', () => {
  let service: MeasureunitsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MeasureunitsService],
    }).compile();

    service = module.get<MeasureunitsService>(MeasureunitsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
