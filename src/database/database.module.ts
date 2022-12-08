import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from 'src/config/configuration';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        const config = configService.get<DatabaseConfig>('database');
        return {
          type: 'postgres',
          synchronize: true,
          autoLoadEntities: true,
          ...config,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
