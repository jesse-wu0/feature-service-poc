import { Module } from '@nestjs/common';
import { MemoryHealthIndicator } from '@nestjs/terminus';
import { FoundationsModule } from '@procore/foundations-nest';
import { healthCheckRegistryFactory } from './health/health-check-registry.factory';
import { serviceName } from './constants';
import { DemoModule } from './demo/demo.module';

@Module({
  imports: [
    /*
     * Configures and exports common service infrastructure:
     * * a structured logger
     * * a metrics client
     * * an error reporting client
     * * automatic error handling and tracing
     * * conventional health check endpoints
     */
    FoundationsModule.forRoot({
      service: serviceName,
      health: {
        /*
         * optional
         *   GET /health          - readiness checks
         *   GET /health/liveness - liveness checks
         * Any Nest provider works here; you can useValue instead of useFactory
         * if you don't need to inject any dependencies
         */
        useFactory: healthCheckRegistryFactory,
        inject: [MemoryHealthIndicator],
      },
    }),
    /*
     * An example controller and service, demonstrating the features exposed by
     * the FoundationsModule. If using this service as a template, delete this
     * module (and the associated folder).
     */
    DemoModule,
  ],
  controllers: [],
  providers: [MemoryHealthIndicator],
})
export class AppModule {}
