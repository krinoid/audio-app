require('dotenv').config({ path: './.env' });

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      timezone: 'UTC',
    },
    migrations: {
      directory: './src/db/migrations',
      tableName: process.env.DB_MIGRATIONS_TABLE,
    },
    seeds: {
      directory: './src/db/seeds',
    },
  },
};
