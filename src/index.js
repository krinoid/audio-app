const dotenv = require('dotenv');
const startServer = require('./api');
const initDb = require('./db');

dotenv.config();

const { API_PORT, API_PREFIX, NODE_ENV } = process.env;
const db = initDb({ env: NODE_ENV });

startServer({ port: API_PORT, prefix: API_PREFIX, db });
