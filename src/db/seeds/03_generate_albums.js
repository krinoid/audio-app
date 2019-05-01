const {
  generateRandomNumber,
  generateRandomTitle,
} = require('../dataGenerators');

exports.seed = function(knex, Promise) {
  return knex('album')
    .del()
    .then(async () => {
      const artists = await knex.select().from('artist');

      const albumsSeed = [];
      artists.forEach(artist => {
        const numberOfAlbums = generateRandomNumber(2, 7);
        for (let i = 0; i < numberOfAlbums; i++) {
          albumsSeed.push({
            name: generateRandomTitle(),
            artist_id: artist.id,
          });
        }
      });

      return knex('album').insert(albumsSeed);
    });
};
