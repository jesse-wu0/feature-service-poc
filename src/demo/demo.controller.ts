import {
  Controller,
  ForbiddenException,
  Get,
  Inject,
  InternalServerErrorException,
  Query,
} from '@nestjs/common';
import {
  Errors,
  ErrorsService,
  Logger,
  LoggerService,
  Metrics,
  MetricsService,
} from '@procore/foundations-nest';
import { DemoService, Info } from './demo.service';

/**
 * Basic interface to describe responses
 */
interface Message {
  message: string;
}

@Controller()
export class DemoController {
  /**
   * Initializes and injects the required dependencies
   *
   * @param {DemoService} demo Business logic for the demo
   * @param {ErrorsService} errors Client for explicit error reporting
   * @param {MetricsService} metrics Metrics reporter
   * @param {LoggerService} logger Structured logger
   */
  constructor(
    private readonly demo: DemoService,
    @Inject(Errors) private readonly errors: ErrorsService,
    @Inject(Metrics) private readonly metrics: MetricsService,
    @Inject(Logger) private readonly logger: LoggerService,
  ) {}

  /**
   * Handles the root route `/`
   *
   * Instruments a debug log message to as well with the context set to the local controller to
   * trace where it came from
   *
   * @returns {Message} the hello world message
   */
  @Get()
  getHello(): Message {
    this.logger.debug?.({ message: 'Called getHello' }, 'DemoController');
    return { message: this.demo.getHello() };
  }

  /**
   * Handles the `/exception` route
   *
   * @param {string} type of exception to create
   * @returns {boolean} true
   *
   * This is to demonstrate handling an exception explicitly to add metadata and context to the
   * exception for Bugsnag.
   */
  @Get('exception')
  getException(@Query('type') type = ''): true {
    if (type == 'unhandled_server') {
      throw new InternalServerErrorException();
    }

    if (type == 'unhandled_client') {
      throw new ForbiddenException();
    }

    /*
     * Sometimes it is useful to manually to handle an error and continue,
     * while manually notifying Bugsnag of a problem, e.g.
     */
    try {
      throw new Error('Test Exception');
    } catch (error) {
      /*
       * See https://docs.bugsnag.com/platforms/javascript/#sending-diagnostic-data
       * for details on sending custom event metadata
       */
      if (error instanceof Error) {
        this.errors.notify(error, (event) => {
          event.addMetadata('user', { id: Math.random() });
        });
      }
    }

    return true;
  }

  /**
   * Handles the `/slow` route
   *
   * @returns {Promise<Message>} a message
   *
   * This function demonstrates instrumenting a simple counter for metrics. The counter prefix is a
   * common prefix for this application for easier routing and searching in DataDog
   */
  @Get('slow')
  async slowHello(): Promise<Message> {
    this.metrics.increment('demo_controller.slow_hello.count');
    return { message: await this.demo.getSlowHello() };
  }

  /**
   * Handles the `/info` route
   *
   * @returns {Promise<Info>} Metadata about the running server
   */
  @Get('info')
  info(): Info {
    return this.demo.info();
  }
}
