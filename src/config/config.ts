// import { config } from 'dotenv';

// config();

// const connectionString = process.env.CONNECTION_STRING?.trim();

// if (!connectionString) {
//   throw new Error('CONNECTION_STRING is required in .env');
// }

// const port = process.env.PORT?.trim();

// export const envConfig = {
//   PORT: port,
//   connectionString
// };


import { config } from "dotenv"
config()

export const envConfig = {
  connectionString: process.env.CONNECTION_STRING,
  port: process.env.PORT,
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN
}