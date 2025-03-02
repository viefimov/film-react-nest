import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import * as path from 'node:path';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseModule } from './database/database.module';
import { FilmsController } from './films/films.controller';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { FilmsService } from './films/films.service';
import { FilmsRepository } from './repository/films/films.repository';
import { Films } from './entities/films.entity';
import { Schedule } from './entities/schedules.entity';
import { configProvider } from './app.config.provider';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public'),
      renderPath: '/content/afisha/',
    }),
    DatabaseModule,
    TypeOrmModule.forFeature([Films, Schedule]),
  ],
  controllers: [FilmsController, OrderController],
  providers: [configProvider, OrderService, FilmsService, FilmsRepository],
})
export class AppModule {}
