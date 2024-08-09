import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ContactosModule } from './resources/contactos/contactos.module';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './config/database.config';
import serverConfig from './config/server.config';
import { AuthGuard, KeycloakConnectModule } from 'nest-keycloak-connect';
import { KeycloakConfigService } from './keycloak/keycloak-config.service';
import { KeycloakConfigModule } from './keycloak/keycloak.module';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [serverConfig, databaseConfig],
      isGlobal: true,
    }),
    KeycloakConnectModule.registerAsync({
      useExisting: KeycloakConfigService,
      imports: [KeycloakConfigModule],
    }),
    DatabaseModule,
    ContactosModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
