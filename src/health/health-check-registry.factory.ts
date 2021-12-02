import { HealthIndicatorResult, MemoryHealthIndicator } from '@nestjs/terminus';
import { HealthCheck } from '@procore/foundations-nest';

type IHealthCheckRegistry = {
  readinessChecks: HealthCheck[];
  livenessChecks: HealthCheck[];
};

export function healthCheckRegistryFactory(
  health: MemoryHealthIndicator,
): IHealthCheckRegistry {
  const readinessChecks: HealthCheck[] = [
    (): Promise<HealthIndicatorResult> =>
      // This instance of the simple-backend-nest-service should not use more than 250MB memory
      health.checkHeap('memory_heap', usedHeapThreshold()),
    (): Promise<HealthIndicatorResult> =>
      // This instance of the simple-backend-nest-service should not have more than 500MB allocated
      health.checkRSS('memory_rss', 500 * 1024 * 1024),
  ];

  // livenessProbe in SBNS is configured in deployment.yaml to check for a tcpSocket connection
  const livenessChecks: HealthCheck[] = [];

  return {
    readinessChecks,
    livenessChecks,
  };
}

function usedHeapThreshold(): number {
  // Testing both branches would require manipulating process global state (env. variables) which cannot be done safely in a parallel test suite.
  /* istanbul ignore next */
  return (process.env.NODE_ENV === 'test' ? 1000 : 250) * 1024 * 1024;
}
