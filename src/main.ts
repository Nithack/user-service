import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule);
  await app.listen(3000, () => {
    logger.log('Server liste http://localhost:3000');
  });
}
bootstrap();
