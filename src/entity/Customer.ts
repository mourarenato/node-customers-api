import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', width: 255 })
  name!: string;

  @Column({ type: 'varchar', width: 255 })
  email!: string;
}
