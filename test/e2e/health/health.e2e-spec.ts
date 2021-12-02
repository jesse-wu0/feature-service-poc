import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { TestHelper } from '../../test_helper';

describe('Health Check (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await TestHelper.CreateTestApp();
    await app.init();
  });

  it('/health (GET)', () => {
    return request(app.getHttpServer())
      .get('/health')
      .expect(200)
      .expect(
        JSON.stringify({
          status: 'ok',
          info: {
            memory_heap: { status: 'up' },
            memory_rss: { status: 'up' },
          },
          error: {},
          details: {
            memory_heap: { status: 'up' },
            memory_rss: { status: 'up' },
          },
        }),
      );
  });

  it('/health/liveness (GET)', () => {
    return request(app.getHttpServer())
      .get('/health/liveness')
      .expect(200)
      .expect(
        JSON.stringify({
          status: 'ok',
          info: {},
          error: {},
          details: {},
        }),
      );
  });
});
