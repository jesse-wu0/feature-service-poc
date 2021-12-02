import { HealthIndicatorResult, MemoryHealthIndicator } from '@nestjs/terminus';
import { healthCheckRegistryFactory } from '../health/health-check-registry.factory';

let healthIndicator: MemoryHealthIndicator;

beforeEach(() => {
  healthIndicator = new MemoryHealthIndicator();
  intercept(
    healthIndicator,
    'checkRSS',
    Promise.resolve<HealthIndicatorResult>({
      memory_rss: {
        status: 'up',
      },
    }),
  );
  intercept(
    healthIndicator,
    'checkHeap',
    Promise.resolve<HealthIndicatorResult>({
      memory_heap: {
        status: 'up',
      },
    }),
  );
});

afterEach(() => jest.clearAllMocks());

describe('healthCheckRegistryFactory()', () => {
  it('returns well-formed readiness checks', async () => {
    const { readinessChecks } = healthCheckRegistryFactory(healthIndicator);
    expect(readinessChecks.length).toBe(2);
    const r1 = await readinessChecks[0]();
    const r2 = await readinessChecks[1]();
    expect(r1).toEqual({
      memory_heap: {
        status: 'up',
      },
    });
    expect(r2).toEqual({
      memory_rss: {
        status: 'up',
      },
    });
  });

  it('returns empty liveness checks', () => {
    const { livenessChecks } = healthCheckRegistryFactory(healthIndicator);
    // Empty since livenessProbe is configured in deployment.yaml to check for a tcpSocket connection
    expect(livenessChecks.length).toBe(0);
  });
});

/* eslint-disable @typescript-eslint/no-explicit-any */
export function intercept(
  target: any,
  method: any,
  ret = {},
): jest.SpyInstance {
  return jest.spyOn(target, method).mockImplementation(() => ret);
}
