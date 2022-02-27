import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', width: 255 })
  price!: string;

  @Column({ type: 'varchar', width: 255 })
  image!: string;

  @Column({ type: 'varchar', width: 255 })
  brand!: string;

  @Column({ type: 'varchar', width: 255 })
  title!: string;

  @Column({ type: 'varchar', width: 255 })
  reviewScore!: string;
}
