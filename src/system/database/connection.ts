import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config();

export const dbConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.POSTGRESQL_URI,
  entities: [`${path.resolve(__dirname, '../..')}/**/*.entity.{ts,js}`],
  logging: process.env.CURRENT_ENVIROMENT === 'DEV',
  synchronize: false,
  migrationsTableName: 'migrations',
};
