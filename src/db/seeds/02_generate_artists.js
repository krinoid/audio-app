const {
  generateRandomNumber,
  generateRandomName,
} = require('../dataGenerators');

exports.seed = function(knex, Promise) {
  return knex('artist')
    .del()
    .then(() => {
      const numberOfArtists = generateRandomNumber(20, 100);
      const artistsSeed = [];
      for (let i = 0; i < numberOfArtists; i++) {
        artistsSeed.push({ name: generateRandomName() });
      }
      return knex('artist').insert(artistsSeed);
    });
};
