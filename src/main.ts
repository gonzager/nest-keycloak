import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ServerConfig } from './config/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const serverConfig = app.get(ConfigService).get<ServerConfig>('server');
  await app.listen(serverConfig.port);
  new Logger('Main').log(`🚀 Aplicación ejecutándose en ${await app.getUrl()}`);
}
bootstrap();
