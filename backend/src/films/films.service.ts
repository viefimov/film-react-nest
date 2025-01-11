import { Injectable } from '@nestjs/common';
import { FilmsRepository } from '../repository/films/films.repository';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async getAllFilms() {
    return this.filmsRepository.findAllFilms();
  }

  async getScheduleFilm(id: string) {
    const film = await this.filmsRepository.findFilmById(id);
    if (!film) {
      throw new Error('Фильм не найден');
    }
    film.toObject();
    return {
      total: film.schedule.length,
      items: film.schedule,
    };
  }
}
