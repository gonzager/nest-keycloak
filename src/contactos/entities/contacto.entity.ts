import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Contacto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column()
  edad: number;
}
