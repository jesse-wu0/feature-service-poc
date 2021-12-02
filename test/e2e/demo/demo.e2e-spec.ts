import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { TestHelper } from '../../test_helper';

/*
 * NOTE: This file is for demonstration purposes only.
 *
 * This file demonstrates implementation of End-to-End tests and
 * relies on the demo implementation located in the src/demo folder.
 *
 * End-to-End tests must live within the test/e2e folder and require
 * the *.e2e-spec.ts suffix. They may also be contained within
 * subfolders for organizational purpoes, which is demonstrated
 * with this file.
 */

describe('Demo end to end tests', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await TestHelper.CreateTestApp();
    await app.init();
  });

  function get(url: string): request.Test {
    return request(app.getHttpServer()).get(url);
  }

  it('/ (GET)', () => {
    return get('/')
      .expect(200)
      .expect(JSON.stringify({ message: 'Hello World!' }));
  });

  it('/slow (GET)', () => {
    return get('/')
      .expect(200)
      .expect(JSON.stringify({ message: 'Hello World!' }));
  });

  it('/exception (GET)', () => {
    return get('/exception').expect(200).expect('true');
  });
});
