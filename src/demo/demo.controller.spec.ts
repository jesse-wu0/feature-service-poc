import { TestingModule } from '@nestjs/testing';
import { DemoController } from './demo.controller';
import { DemoService } from './demo.service';
import { Errors, Metrics } from '@procore/foundations-nest';
import { LogLine, compileTestingModule } from '@procore/foundations-nest';
import {
  InternalServerErrorException,
  ForbiddenException,
} from '@nestjs/common/exceptions';

/*
 * NOTE: This file is for demonstration purposes only.
 *
 * This file demonstrates implementation of unit tests and
 * relies on the demo implementation located in the src/demo folder.
 *
 * Unit tests should live closely to the code that they test and
 * are required to contain the *.spec.ts suffix. This file demonstrates
 * this as it unit tests code in the associated demo.controller.ts file.
 */

describe('DemoController', () => {
  let controller: DemoController;

  const logs: LogLine[] = [];
  let notifier: jest.SpyInstance;
  let increment: jest.SpyInstance;

  beforeEach(async () => {
    const module: TestingModule = await compileTestingModule({
      controllers: [DemoController],
      providers: [DemoService],
      logTo: logs,
    });

    controller = module.get(DemoController);

    /*
     * By default, the testing module is configured so that all telemetry is
     * reported to a null logger. If you want to assert that specific telemetry
     * is reported or messages are logged you can do so with `logTo` above and
     */
    notifier = intercept(module.get(Errors), 'notify');
    increment = intercept(module.get(Metrics), 'increment');
  });

  afterEach(() => jest.clearAllMocks());

  describe('getHello', () => {
    it('logs and returns a message', () => {
      expect(controller.getHello()).toBeObject().toEqual({
        message: 'Hello World!',
      });
      expect(logs)
        .toBeArray()
        .toEqual([['debug', 'DemoController', { message: 'Called getHello' }]]);
    });
  });

  describe('slowHello', () => {
    it('records a metric and returns a message', async () => {
      expect(await controller.slowHello()).toEqual({
        message: 'Hello World!',
      });

      expect(increment.mock.calls)
        .toBeArray()
        .toEqual([['demo_controller.slow_hello.count']]);
    });
  });

  describe('exception', () => {
    it('notifies of an error and returns true', () => {
      expect(controller.getException()).toEqual(true);

      expect(notifier.mock.calls[0][0].message)
        .not.toBeEmpty()
        .toEqual('Test Exception');
    });
  });

  describe('exception unhandled_server', () => {
    it('unhandled_server exception throws InternalServerErrorException', () => {
      expect(() => {
        controller.getException('unhandled_server');
      }).toThrow(new InternalServerErrorException());
    });
  });

  describe('exception unhandled_client', () => {
    it('unhandled_client exception throws ForbiddenException', () => {
      expect(() => {
        controller.getException('unhandled_client');
      }).toThrow(new ForbiddenException());
    });
  });
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function intercept(target: any, method: any): jest.SpyInstance {
  return jest.spyOn(target, method).mockImplementation(() => {});
}
