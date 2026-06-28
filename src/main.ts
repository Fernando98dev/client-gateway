import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';
import { Logger, RequestMethod, ValidationPipe } from '@nestjs/common';
import { RpcCustomExceptionFilter } from './common';

async function main() {
  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api', {
    exclude: [{
      path: '',
      method: RequestMethod.GET,
    }]
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.useGlobalFilters(new RpcCustomExceptionFilter())
  await app.listen(envs.port ?? 3000);
  console.log('health check working')
  logger.log(`Gateway running on port ${envs.port}`);
}
main();
