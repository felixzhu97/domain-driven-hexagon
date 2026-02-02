import { get } from 'env-var';
import '../libs/utils/dotenv';

export const databaseConfig = {
  type: 'postgres',
  host: get('DB_HOST').required().asString(),
  port: get('DB_PORT').required().asIntPositive(),
  username: get('DB_USERNAME').required().asString(),
  password: get('DB_PASSWORD').required().asString(),
  database: get('DB_NAME').required().asString(),
};

function getPostgresConnectionUri(): string {
  const url = new URL('postgres://localhost');
  url.username = databaseConfig.username;
  url.password = databaseConfig.password;
  url.hostname = databaseConfig.host;
  url.port = String(databaseConfig.port);
  url.pathname = `/${databaseConfig.database}`;

  return url.toString();
}

export const postgresConnectionUri = getPostgresConnectionUri();
