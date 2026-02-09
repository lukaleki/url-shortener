import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class Url {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  @IsNotEmpty()
  urlCode: string;

  @Column()
  @IsNotEmpty()
  longUrl: string;

  @Column()
  createdAt: Date;

  @Column({ default: 0 })
  numClicks: number;
}
