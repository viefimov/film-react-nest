import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FilmsRepository } from '../repository/films/films.repository';
import { OrderInfoDTO, TicketDTO } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async createOrder(
    orderData: OrderInfoDTO,
  ): Promise<{ items: TicketDTO[]; total: number }> {
    const tickets = orderData.tickets;
    for (const ticket of tickets) {
      const film = await this.filmsRepository.findFilmById(ticket.film);
      if (!film) {
        throw new NotFoundException(`Фильм не найден`);
      }

      const schedule = await this.filmsRepository.findFilmSchedule(
        ticket.film,
        ticket.session,
      );
      const place = `${ticket.row}:${ticket.seat}`;

      if (film.schedule[schedule].taken.includes(place)) {
        throw new BadRequestException('Место занято');
      }
      this.updateSeats(ticket.film, schedule, place);
    }
    return { items: tickets, total: tickets.length };
  }

  async updateSeats(filmId: string, scheduleIndex: number, place: string) {
    // Load film with schedules
    const film = await this.filmsRepository.findFilmById(filmId);
    if (!film.schedule || film.schedule.length <= scheduleIndex) {
      throw new NotFoundException('Расписание не найдено');
    }

    const scheduleItem = film.schedule[scheduleIndex];
    if (!Array.isArray(scheduleItem.taken)) {
      scheduleItem.taken = [];
    }
    scheduleItem.taken.push(place);

    return await this.filmsRepository.saveFilm(film);
  }
}
