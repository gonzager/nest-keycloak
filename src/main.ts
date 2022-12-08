import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import serverConfig from './config/server.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const config = app.get(serverConfig.KEY);
  await app.listen(config.port);
  new Logger('Main').log(`🚀 Aplicación ejecutándose en ${await app.getUrl()}`);
}
bootstrap();
