import { Injectable } from '@nestjs/common';

@Injectable()
export class CalculatorService {
  add(a: number, b: number): number {
    return a + b;
  }

  subtract(a: number, b: number): number {
    return a - b;
  }

  multiply(a: number, b: number): number {
    return a * b;
  }

  divide(a: number, b: number): number {
    return a / b;
  }

  randomDelay(): number {
    return Math.floor(Math.random() * 1000);
  }

  async withDelay(operation: () => number): Promise<number> {
    const delay: number = this.randomDelay();
    await this.sleep(delay);
    return operation();
  }

  async sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
