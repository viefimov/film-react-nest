import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Films } from '../entities/films.entity';
import { Schedule } from '../entities/schedules.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<string>('DATABASE_DRIVER', 'postgres') as any,
        host: configService.get<string>('DATABASE_HOST', 'postgres'),
        port: configService.get<number>('DATABASE_PORT', 5432),
        username: configService.get<string>('DATABASE_USERNAME', 'viefimov'),
        password: configService.get<string>('DATABASE_PASSWORD', 'slaVa3289'),
        database: configService.get<string>('DATABASE_NAME', 'film_pg'),
        entities: [Films, Schedule],
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
