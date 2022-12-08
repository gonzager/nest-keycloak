export interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export interface ServerConfig {
  port: number;
}

export interface RootConfig {
  server: ServerConfig;
  database: DatabaseConfig;
}

export default (): RootConfig => ({
  server: {
    port: parseInt(process.env.SERVER_PORT, 10) || 4000,
  },
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    username: process.env.DATABASE_USERNAME || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'postgres',
    database: process.env.DATABASE_NAME || 'magistrades-development',
  },
});
