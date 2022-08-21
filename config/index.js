const dotenv = require('dotenv');

dotenv.config({
  path: '.env',
  sample: '.env.example',
  allowEmptyValues: false,
});

module.exports = {
  BOT_TOKEN: process.env.BOT_TOKEN,
  DB: {
    url: process.env.DB_URL,
    // host: process.env.DB_HOST,
    // user: process.env.DB_USER,
    // password: process.env.DB_PASSWORD,
    // port: process.env.DB_PORT,
    // database: process.env.DB_NAME
  },

  APP: {
    // PORT: process.env.APP_PORT,
    PORT: process.env.PORT,
    ENV: process.env.APP_ENV,
    SECRET: process.env.APP_SECRET,
    SESSION_TIMEOUT: process.env.SESSION_TIMEOUT,
  },

}