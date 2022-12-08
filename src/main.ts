import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(4000);
  new Logger('Main').log(`🚀 Aplicación ejecutándose en ${await app.getUrl()}`);
}
bootstrap();
