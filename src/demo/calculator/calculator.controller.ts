import { Controller, Post, Body } from '@nestjs/common';
import { CalculatorService } from './calculator.service';
import { CalculatorParamsDto } from './dto/calculator-params.dto';

@Controller()
export class CalculatorController {
  /**
   * Initializes and injects the required dependencies
   *
   * @param {CalculatorService} demo Business logic for the demo
   * @param {ErrorsService} errors Client for explicit error reporting
   * @param {MetricsService} metrics Metrics reporter
   * @param {LoggerService} logger Structured logger
   */
  constructor(private readonly calculator: CalculatorService) {}

  /**
   * Handles the `/add` route
   *
   * @returns {Promise<Number>} a message
   *
   * This function demonstrates a simple add function
   */
  @Post('calculator/add')
  async add(@Body() { a, b }: CalculatorParamsDto): Promise<number> {
    return this.calculator.add(a, b);
  }

  /**
   * Handles the `/slowAdd` route
   *
   * @returns {Promise<Number>} a message
   *
   * This function demonstrates a simple slow add function
   */
  @Post('calculator/slowAdd')
  async slowAdd(@Body() { a, b }: CalculatorParamsDto): Promise<number> {
    return await this.calculator.withDelay(() => this.calculator.add(a, b));
  }

  /**
   * Handles the `/subtract` route
   *
   * @returns {Promise<Number>} a message
   *
   * This function demonstrates a simple subtract function
   */
  @Post('calculator/subtract')
  async subtract(@Body() { a, b }: CalculatorParamsDto): Promise<number> {
    return this.calculator.subtract(a, b);
  }

  /**
   * Handles the `/multiply` route
   *
   * @returns {Promise<Number>} a message
   *
   * This function demonstrates a simple multiply function
   */
  @Post('calculator/multiply')
  async multiply(@Body() { a, b }: CalculatorParamsDto): Promise<number> {
    return this.calculator.multiply(a, b);
  }

  /**
   * Handles the `/divide` route
   *
   * @returns {Promise<Number>} a message
   *
   * This function demonstrates a simple divide function
   */
  @Post('calculator/divide')
  async divide(@Body() { a, b }: CalculatorParamsDto): Promise<number> {
    return this.calculator.divide(a, b);
  }
}
