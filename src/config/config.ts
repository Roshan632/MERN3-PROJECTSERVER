import { config } from 'dotenv';

config();

const connectionString = process.env.CONNECTION_STRING?.trim();

if (!connectionString) {
  throw new Error('CONNECTION_STRING is required in .env');
}

const port = process.env.PORT?.trim();

export const envConfig = {
  PORT: port,
  connectionString
};
