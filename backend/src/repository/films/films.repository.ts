import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FilmDto } from '../../films/dto/films.dto';
import { Film, FilmDocument } from '../../films/film.schema';

@Injectable()
export class FilmsRepository {
  constructor(@InjectModel(Film.name) private filmModel: Model<Film>) {}

  async findAllFilms(): Promise<{ total: number; items: FilmDto[] }> {
    const films = await this.filmModel.find().lean();
    const total = await this.filmModel.countDocuments({});
    return {
      total,
      items: films.map((film) => ({
        id: film.id,
        rating: film.rating,
        director: film.director,
        tags: film.tags,
        image: film.image,
        cover: film.cover,
        title: film.title,
        about: film.about,
        description: film.description,
        schedule: film.schedule,
      })),
    };
  }

  async findFilmById(id: string): Promise<FilmDocument> {
    const film = await this.filmModel.findOne({ id });
    if (!film) {
      throw new NotFoundException(`Фильм не найден`);
    }
    return film;
  }

  async findFilmSchedule(filmId: string, session: string) {
    const film = (await this.findFilmById(filmId)).toObject();
    const scheduleIndex = film.schedule.findIndex(
      (a: { id: string }) => a.id === session,
    );
    return scheduleIndex;
  }
}
