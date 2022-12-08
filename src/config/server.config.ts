import { registerAs } from '@nestjs/config';

export interface ServerConfig {
  port: number;
}

export default registerAs(
  'server',
  (): ServerConfig => ({
    port: parseInt(process.env.SERVER_PORT, 10) || 4000,
  }),
);
