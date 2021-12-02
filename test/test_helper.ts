import { compileTestingModule } from '@procore/foundations-nest';
import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';

export class TestHelper {
  static async CreateTestApp(): Promise<INestApplication> {
    const moduleFixture: TestingModule = await compileTestingModule({
      imports: [AppModule],
    });

    return moduleFixture.createNestApplication();
  }
}
