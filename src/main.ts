import { createApp } from '@procore/foundations-nest';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { serviceName } from './constants';

/**
 * Initialize the application
 *
 * @returns {Promise<void>}
 *
 * Builds a standard service foundation, and boots the app on the configured
 * port. See @procore/foundations-nest for details on features of the standard service.
 */
async function bootstrap(): Promise<void> {
  const app = await createApp(serviceName, AppModule);
  const port = app.get(ConfigService).get<number>('PORT', 3000);

  app.get(Logger).log({ message: 'Listening', port }, 'bootstrap');
  await app.listen(port);
}
bootstrap();
