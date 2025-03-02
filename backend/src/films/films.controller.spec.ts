import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { FilmDto, ScheduleDTO } from './dto/films.dto';

describe('FilmsController', () => {
  let controller: FilmsController;
  let service: FilmsService;
  const mockSchedule: ScheduleDTO = {
    id: '1',
    daytime: JSON.stringify(new Date('2024-11-10T10:00:00Z')),
    hall: 2,
    rows: 4,
    seats: 120,
    price: 500,
    taken: [],
  };
  const mockFilm: FilmDto = {
    id: 'film-id',
    rating: 7.5,
    director: 'Какой-то режиссер',
    tags: ['Лучшее'],
    image: 'http://smthng.com/kartinka.jpg',
    cover: 'http://smthng.com/oblozhka.jpg',
    title: 'Название фильма',
    about: 'Неплохой фильм',
    description: 'Описание фильма',
    schedule: [mockSchedule],
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [FilmsService],
    })
      .overrideProvider(FilmsService)
      .useValue({
        findAll: jest.fn().mockResolvedValue([mockFilm]),
        findById: jest.fn().mockResolvedValue(mockSchedule),
      })
      .compile();

    controller = module.get<FilmsController>(FilmsController);
    service = module.get<FilmsService>(FilmsService);
  });

  it('возвращает все фильмы', async () => {
    const result = await controller.getAllFilms();
    expect(result).toEqual([mockFilm]);
    expect(service.getAllFilms).toHaveBeenCalled();
  });
  it('should be return schedule for a film', async () => {
    const result = await controller.getFilmSchedule('1');
    expect(result).toEqual(mockSchedule);
    expect(service.getScheduleFilm).toHaveBeenCalledWith('1');
  });
});
