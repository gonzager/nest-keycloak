import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ContactosModule } from './contactos/contactos.module';

@Module({
  imports: [DatabaseModule, ContactosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
