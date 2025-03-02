import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Films } from '../../entities/films.entity';
import { FilmDto } from '../../films/dto/films.dto';

@Injectable()
export class FilmsRepository {
  constructor(
    @InjectRepository(Films)
    private filmRepository: Repository<Films>,
  ) {}

  async findAllFilms(): Promise<{ total: number; items: FilmDto[] }> {
    const [films, total] = await this.filmRepository.findAndCount({
      relations: ['schedule'],
    });
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

  async findFilmById(id: string): Promise<Films> {
    const film = await this.filmRepository.findOne({
      where: { id },
      relations: ['schedule'],
    });
    if (!film) {
      throw new NotFoundException(`Фильм не найден`);
    }
    return film;
  }

  async findFilmSchedule(filmId: string, session: string): Promise<number> {
    const film = await this.findFilmById(filmId);
    const scheduleIndex = film.schedule.findIndex(
      (a: { id: string }) => a.id === session,
    );
    return scheduleIndex;
  }

  async saveFilm(film: Films) {
    return await this.filmRepository.save(film);
  }
}
