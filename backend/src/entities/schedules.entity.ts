import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { Films } from './films.entity';

@Entity('schedules')
export class Schedule {
  @PrimaryColumn()
  id: string;

  @Column()
  daytime: string;

  @Column()
  hall: number;

  @Column()
  rows: number;

  @Column()
  seats: number;

  @Column({ type: 'float' })
  price: number;

  @Column('text', { array: true, default: () => 'ARRAY[]::text[]' })
  taken: string[];

  @ManyToOne(() => Films, (film) => film.schedule, { onDelete: 'CASCADE' })
  film: Films;
}
