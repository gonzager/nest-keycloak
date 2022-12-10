import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ContactosModule } from './resources/contactos/contactos.module';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './config/database.config';
import serverConfig from './config/server.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [serverConfig, databaseConfig],
      isGlobal: true,
    }),
    DatabaseModule,
    ContactosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
