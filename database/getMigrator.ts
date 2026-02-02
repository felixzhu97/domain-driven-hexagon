/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { SlonikMigrator } from '@slonik/migrator';
import { createPool } from 'slonik';
import * as dotenv from 'dotenv';
import * as path from 'path';

const envPath = path.resolve(
  __dirname,
  process.env.NODE_ENV === 'test' ? '../.env.test' : '../.env',
);
dotenv.config({ path: envPath });

function getConnectionUri(): string {
  const username = process.env.DB_USERNAME ?? '';
  const password = process.env.DB_PASSWORD ?? '';
  const host = process.env.DB_HOST ?? 'localhost';
  const port = process.env.DB_PORT ?? '5432';
  const database = process.env.DB_NAME ?? '';

  const url = new URL('postgres://localhost');
  url.username = username;
  url.password = password;
  url.hostname = host;
  url.port = port;
  url.pathname = `/${database}`;

  return url.toString();
}

export async function getMigrator() {
  const pool = await createPool(getConnectionUri());

  const migrator = new SlonikMigrator({
    migrationsPath: path.resolve(__dirname, 'migrations'),
    migrationTableName: 'migration',
    slonik: pool,
  } as any);

  return { pool, migrator };
}
