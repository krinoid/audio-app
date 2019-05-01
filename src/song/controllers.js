const {
  getSongsQuery,
  getSongQuery,
  getTotalSongsCountQuery,
} = require('./queries');

// songs list
const getSongs = async (req, res) => {
  const { db, query, skip } = req;
  const { page, limit, expand } = query;

  try {
    const songs = await getSongsQuery({ db, limit, offset: skip, expand });
    const totalSongs = await getTotalSongsCountQuery({ db });
    const totalPages = Math.ceil(totalSongs / limit);

    if (page > totalPages) throw new Error(`Page "${page}" doesn't exist.`);

    res.json({
      success: true,
      meta: {
        expand,
        page,
        limit,
        total_songs: totalSongs,
        total_pages: totalPages,
        has_more: page < totalPages,
      },
      data: songs,
    });
  } catch (err) {
    // pass the exception through middlewares chain
    throw err;
  }
};

// single song
const getSong = async (req, res) => {
  const { db, params, query } = req;
  const { expand } = query;
  const { id } = params;

  try {
    const song = await getSongQuery({ db, id, expand });

    if (!song) {
      res.status(404).json({
        success: false,
        message: 'Song not found',
      });
      return;
    }

    res.json({
      success: true,
      data: song,
    });
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getSong,
  getSongs,
};
