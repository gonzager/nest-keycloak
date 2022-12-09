import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from 'src/config/database.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [databaseConfig.KEY],
      useFactory(dbConfig: ConfigType<typeof databaseConfig>) {
        return {
          synchronize: true,
          autoLoadEntities: true,
          ...dbConfig,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
