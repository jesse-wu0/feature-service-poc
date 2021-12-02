import { Module } from '@nestjs/common';
import { DemoService } from './demo.service';
import { CalculatorService } from './calculator/calculator.service';
import { DemoController } from './demo.controller';
import { CalculatorController } from './calculator/calculator.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [CalculatorService, DemoService],
  controllers: [CalculatorController, DemoController],
  exports: [DemoService],
})
export class DemoModule {}
