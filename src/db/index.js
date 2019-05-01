const knex = require('knex');
const dbConfig = require('../../knexfile');

const initDb = ({ env }) => {
  return knex(dbConfig[env]);
};

module.exports = initDb;
