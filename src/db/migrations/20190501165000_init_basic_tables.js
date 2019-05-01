exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.hasTable('genre').then(exists => {
      if (exists) return;
      return knex.schema.createTable('genre', function(t) {
        t.increments('id').primary();
        t.string('name')
          .notNull()
          .unique();
      });
    }),

    knex.schema.hasTable('artist').then(exists => {
      if (exists) return;
      return knex.schema.createTable('artist', function(t) {
        t.increments('id').primary();
        t.string('name').notNull();
      });
    }),

    knex.schema.hasTable('album').then(exists => {
      if (exists) return;
      return knex.schema.createTable('album', function(t) {
        t.increments('id').primary();
        t.string('name').notNull();
        t.integer('artist_id')
          .notNullable()
          .references('id')
          .inTable('artist')
          .onDelete('CASCADE');
      });
    }),

    knex.schema.hasTable('song').then(exists => {
      if (exists) return;
      return knex.schema.createTable('song', function(t) {
        t.increments('id').primary();
        t.string('title').notNull();
        t.integer('genre_id')
          .references('id')
          .inTable('genre')
          .onDelete('SET NULL');
        t.integer('album_id')
          .notNullable()
          .references('id')
          .inTable('album')
          .onDelete('CASCADE');
      });
    }),

    /*
    knex.schema.hasTable('song_artist').then(exists => {
      if (exists) return;
      return knex.schema.createTable('song_artist', function(t) {
        t.increments('id').primary();
        t.integer('song_id')
          .notNullable()
          .references('id')
          .inTable('song');
        t.integer('artist_id')
          .notNullable()
          .references('id')
          .inTable('artist');
      });
    }),
    */
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('genre'),
    knex.schema.dropTableIfExists('artist'),
    knex.schema.dropTableIfExists('album'),
    knex.schema.dropTableIfExists('song'),
    // knex.schema.dropTableIfExists('song_artist'),
  ]);
};
