import dotenv from "dotenv";
dotenv.config();

const config = {
  port: process.env.PORT,
  corsOrigin: process.env.FRONTEND_URL,
  NODE_ENV : process.env.NODE_ENV
};

export default config;
