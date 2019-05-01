const expandedAlbumColumns = [
  'album.id as album_id',
  'album.name as album_name',
];
const expandAlbum = (queryBuilder, foreignKey) => {
  queryBuilder
    .leftJoin('album', foreignKey, 'album.id')
    .select(expandedAlbumColumns);
};

const expandedArtistColumns = [
  'artist.id as artist_id',
  'artist.name as artist_name',
];
const expandArtist = (queryBuilder, foreignKey) => {
  queryBuilder
    .leftJoin('artist', foreignKey, 'artist.id')
    .select(expandedArtistColumns);
};

const formatExpandedSong = data => ({
  id: data.id,
  title: data.title,
  album: {
    id: data.album_id,
    name: data.album_name,
  },
  artist: {
    id: data.artist_id,
    name: data.artist_name,
  },
});

const expandedSongColumns = [
  'song.id as id',
  'song.title',
  ...expandedAlbumColumns,
  ...expandedArtistColumns,
];

const getSongsQuery = ({ db, limit, offset, expand }) => {
  if (expand) {
    return db('song')
      .select(expandedSongColumns)
      .modify(expandAlbum, 'song.album_id')
      .modify(expandArtist, 'album.artist_id')
      .offset(offset)
      .limit(limit)
      .then(list => list.map(formatExpandedSong));
  }

  return db('song')
    .select()
    .offset(offset)
    .limit(limit);
};

const getSongQuery = ({ db, id, expand }) => {
  if (expand) {
    return db('song')
      .where('song.id', id)
      .select(expandedSongColumns)
      .modify(expandAlbum, 'song.album_id')
      .modify(expandArtist, 'album.artist_id')
      .then(list => list.map(formatExpandedSong));
  }
  return db('song')
    .where({ id })
    .first();
};

const getTotalSongsCountQuery = async ({ db }) => {
  return db('song')
    .count()
    .first()
    .then(v => Number(v.count));
};

module.exports = {
  getSongsQuery,
  getSongQuery,
  getTotalSongsCountQuery,
};
