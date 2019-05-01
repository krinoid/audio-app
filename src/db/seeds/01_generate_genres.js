const { genres } = require('../dataGenerators');

exports.seed = function(knex, Promise) {
  return knex('genre')
    .del()
    .then(() => {
      const genresSeed = genres.map(g => ({ name: g }));
      return knex('genre').insert(genresSeed);
    });
};
