const {
  generateRandomNumber,
  generateRandomTitle,
} = require('../dataGenerators');

exports.seed = function(knex, Promise) {
  return knex('song')
    .del()
    .then(async () => {
      const albums = await knex.select().from('album');
      const genres = await knex.select().from('genre');

      const songsSeed = [];
      albums.forEach(album => {
        const numberOfSongs = generateRandomNumber(3, 15);
        for (let i = 0; i < numberOfSongs; i++) {
          const songGenreIdx = generateRandomNumber(0, genres.length - 1);
          const songGenre = genres[songGenreIdx];
          songsSeed.push({
            title: generateRandomTitle(),
            album_id: album.id,
            genre_id: songGenre.id,
          });
        }
      });

      return knex('song').insert(songsSeed);
    });
};
