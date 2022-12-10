import { ConfigModule } from '@nestjs/config';

// Forzamos la carga del archivo .env antes de leer las variables de entorno.
ConfigModule.forRoot({});

const typeOrmConfig = {
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  username: process.env.DATABASE_USERNAME || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'postgres',
  database: process.env.DATABASE_NAME || 'magistrades-development',
};

export default typeOrmConfig;
