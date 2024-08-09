import { Injectable } from '@nestjs/common';
import {
  KeycloakConnectOptions,
  KeycloakConnectOptionsFactory,
} from 'nest-keycloak-connect';

function checkDefined<T>(value: T, errorMessage: string): T {
  if (value === undefined) {
    throw new Error(errorMessage);
  }

  return value;
}

@Injectable()
export class KeycloakConfigService implements KeycloakConnectOptionsFactory {
  createKeycloakConnectOptions(): KeycloakConnectOptions {
    return {
      authServerUrl: process.env.KEYCLOAK_URL ?? 'http://localhost:8080',
      realm: process.env.KEYCLOAK_REALM ?? 'fluxit',
      clientId: process.env.KEYCLOAK_CLIENT_ID ?? 'api-flux-nest',
      secret: checkDefined(
        process.env.KEYCLOAK_CLIENT_SECRET,
        '¡Ups! Para poder ejecutar esta aplicación es necesario configurar ' +
          'el secret de Keycloak en la variable KEYCLOAK_CLIENT_SECRET. ' +
          'Si estás trabajando en tu entorno local, podés hacerlo en el archivo .env',
      ),
      useNestLogger: true,
    };
  }
}
