import { TestingModule } from '@nestjs/testing';
import { CalculatorController } from './calculator.controller';
import { CalculatorService } from './calculator.service';
import {
  Errors,
  Metrics,
  LogLine,
  compileTestingModule,
} from '@procore/foundations-nest';
import { CalculatorParamsDto } from '../calculator/dto/calculator-params.dto';

/*
 * NOTE: This file is for demonstration purposes only.
 *
 * This file demonstrates implementation of unit tests and
 * relies on the calculator demo implementation located in the src/demo folder.
 *
 * Unit tests should live closely to the code that they test and
 * are required to contain the *.spec.ts suffix. This file demonstrates
 * this as it unit tests code in the associated calculator.controller.ts file.
 */

describe('CalculatorController', () => {
  let controller: CalculatorController;

  const logs: LogLine[] = [];
  let notifier: jest.SpyInstance;
  let increment: jest.SpyInstance;

  beforeEach(async () => {
    const module: TestingModule = await compileTestingModule({
      controllers: [CalculatorController],
      providers: [CalculatorService],
      logTo: logs,
    });

    controller = module.get(CalculatorController);

    /*
     * By default, the testing module is configured so that all telemetry is
     * reported to a null logger. If you want to assert that specific telemetry
     * is reported or messages are logged you can do so with `logTo` above and
     */
    notifier = intercept(module.get(Errors), 'notify');
    increment = intercept(module.get(Metrics), 'increment');
  });

  afterEach(() => jest.clearAllMocks());

  describe('add', () => {
    it('returns correct addition result', async () => {
      const dto: CalculatorParamsDto = {
        a: -1,
        b: 2,
      };
      expect(await controller.add(dto))
        .toBeNumber()
        .toEqual(1);
    });
  });

  describe('slowAdd', () => {
    it('returns correct addition result', async () => {
      const dto: CalculatorParamsDto = {
        a: 1,
        b: 2,
      };
      expect(await controller.slowAdd(dto))
        .toBeNumber()
        .toEqual(3);
    });
  });

  describe('subtract', () => {
    it('returns correct subtraction result', async () => {
      const dto: CalculatorParamsDto = {
        a: 1,
        b: 2,
      };
      expect(await controller.subtract(dto))
        .toBeNumber()
        .toEqual(-1);
    });
  });

  describe('multiply', () => {
    it('returns correct multiplication result', async () => {
      const dto: CalculatorParamsDto = {
        a: -3,
        b: 4,
      };
      expect(await controller.multiply(dto))
        .toBeNumber()
        .toEqual(-12);
    });
  });

  describe('divide', () => {
    it('returns correct division result', async () => {
      const dto: CalculatorParamsDto = {
        a: 20,
        b: 4,
      };
      expect(await controller.divide(dto))
        .toBeNumber()
        .toEqual(5);
    });
  });
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function intercept(target: any, method: any): jest.SpyInstance {
  return jest.spyOn(target, method).mockImplementation(() => {});
}
