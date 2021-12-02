import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { CalculatorParamsDto } from '../../../../src/demo/calculator/dto/calculator-params.dto';
import { TestHelper } from '../../../test_helper';

/*
 * NOTE: This file is for demonstration purposes only.
 *
 * This file demonstrates implementation of End-to-End tests and
 * relies on the calculator demo implementation located in the
 * src/demo folder.
 *
 * End-to-End tests must live within the test/e2e folder and require
 * the *.e2e-spec.ts suffix. They may also be contained within
 * subfolders for organizational purpoes, which is demonstrated
 * with this file.
 */

describe('Demo Calculator end to end tests', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await TestHelper.CreateTestApp();
    await app.init();
  });

  function post(url: string): request.Test {
    return request(app.getHttpServer()).post(url);
  }

  const calculatorParamsDto: CalculatorParamsDto = {
    a: 9,
    b: 3,
  };

  it('/add (POST)', async () => {
    const res = await post('/calculator/add')
      .send(calculatorParamsDto)
      .expect(201);
    expect(res.text).toEqual('12');
  });

  it('/slowAdd (POST)', async () => {
    const res = await post('/calculator/slowAdd')
      .send(calculatorParamsDto)
      .expect(201);
    expect(res.text).toEqual('12');
  });

  it('/subtract (POST)', async () => {
    const res = await post('/calculator/subtract')
      .send(calculatorParamsDto)
      .expect(201);
    expect(res.text).toEqual('6');
  });

  it('/multiply (POST)', async () => {
    const res = await post('/calculator/multiply')
      .send(calculatorParamsDto)
      .expect(201);
    expect(res.text).toEqual('27');
  });

  it('/divide (POST)', async () => {
    const res = await post('/calculator/divide')
      .send(calculatorParamsDto)
      .expect(201);
    expect(res.text).toEqual('3');
  });
});
