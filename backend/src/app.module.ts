import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import * as path from 'node:path';
import { MongooseModule } from '@nestjs/mongoose';

import { appConfig, configProvider } from './app.config.provider';
import { FilmsController } from './films/films.controller';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { FilmsService } from './films/films.service';
import { FilmsRepository } from './repository/films/films.repository';
import { Film, FilmSchema } from './films/film.schema';

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
    MongooseModule.forRoot(appConfig.DATABASE_URL),
    MongooseModule.forFeature([{ name: Film.name, schema: FilmSchema }]),
  ],
  controllers: [FilmsController, OrderController],
  providers: [configProvider, OrderService, FilmsService, FilmsRepository],
})
export class AppModule {}
