# Changelog

All notable changes to this service will be documented in this file to help future developers

## (2021-07-13)
* Updated to use @procore/foundations-nest 1.3.1
* Removed health.controller.ts in favor of using canonical health checks from foundations-nest. 
* To follow along with these changes please update your src/app.module.ts similar to the following and/or see [this](https://github.com/procore/simple-backend-nest-service/pull/219) pull request:

        FoundationsModule.forRoot({
            service: serviceName,
            health: {
                useFactory: (health: MemoryHealthIndicator) => {
                    const readinessChecks: HealthCheck[] = [
                        (): Promise<HealthIndicatorResult> =>
                        health.checkHeap('memory_heap', 250 * 1024 * 1024),
                        (): Promise<HealthIndicatorResult> =>
                        health.checkRSS('memory_rss', 500 * 1024 * 1024),
                    ];
                    const livenessChecks: HealthCheck[] = [];
                    return {
                        readinessChecks,
                        livenessChecks,
                    };
                },
                inject: [MemoryHealthIndicator],
            },
            ......

 If you would like, you can pass in functions and delete your health controller altogether.

### Breaking Changes

* None