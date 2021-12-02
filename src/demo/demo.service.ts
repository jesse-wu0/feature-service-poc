import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export type Info = {
  uptime: number;
  version: string;
};

@Injectable()
export class DemoService {
  private readonly startedAt: number;
  private readonly version: string;

  constructor(config: ConfigService) {
    this.startedAt = new Date().getTime();
    this.version = config.get('APP_VERSION', '');
  }

  getHello(): string {
    return 'Hello World!';
  }

  async getSlowHello(): Promise<string> {
    const delay = randomDelay();
    await sleep(delay);
    return this.getHello();
  }

  info(): Info {
    return {
      uptime: new Date().getTime() - this.startedAt,
      version: this.version,
    };
  }
}

function randomDelay(): number {
  return Math.floor(Math.random() * 1000);
}

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
