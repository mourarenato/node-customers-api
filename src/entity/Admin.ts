import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate
} from 'typeorm';

import hash from 'crypto';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', width: 255 })
  email!: string;

  @Column({ type: 'varchar', width: 255 })
  password!: string;

  @BeforeInsert()
  @BeforeUpdate()
  encryptPassword() {
    if (this.password) {
      this.password = hash.createHmac('sha256', this.password).digest('hex');
    }
  }
}
