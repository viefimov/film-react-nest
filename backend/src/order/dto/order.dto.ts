export class CreateOrderDTO {
  filmId: string;
  userId: string;
  seats: string;
}
export class TicketDTO {
  film: string;
  session: string;
  daytime: string;
  day: string;
  time: string;
  row: number;
  seat: number;
  price: number;
}
export class OrderInfoDTO {
  email: string;
  phone: string;
  tickets: TicketDTO[];
}