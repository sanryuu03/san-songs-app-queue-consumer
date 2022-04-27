const {Pool} = require('pg');

class SongsService {
  constructor() {
    this._pool = new Pool({
      user: 'san',
      host: 'localhost',
      database: 'openmusicv1',
      password: 'leviana250520',
      port: 5432,
    });
  }

  async getSongs(playlistId) {
    const query = {
    //   text: `SELECT songs.* FROM songs
    //   LEFT JOIN playlist_songs ON songs.id = playlist_songs.song_id
    //   WHERE playlist_songs.playlist_id = $1
    //   GROUP BY songs.id`,
      text: `SELECT songs.id, songs.title, songs.performer FROM songs
      LEFT JOIN playlist_songs ON songs.id = playlist_songs.song_id
      WHERE playlist_songs.playlist_id = $1`,
      values: [playlistId],
    };
    const result = await this._pool.query(query);
    return result.rows;
  }

  async getPlaylists(playlistId) {
    const query = {
      text: `SELECT playlists.id,playlists.name FROM playlists WHERE playlists.id = $1`,
      values: [playlistId],
    };
    const result = await this._pool.query(query);
    return result.rows[0];
  }
}

module.exports = SongsService;
