import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Contacto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  edad: number;
}
