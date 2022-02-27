import 'reflect-metadata';
import { createConnection } from 'typeorm';
import config from '../ormconfig';

export const conn = async () => {
  await createConnection(config);
  console.log(`PostgreSQL connected! 🐘`);
};

conn().catch((error) => console.log(error));
