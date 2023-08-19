// models/PlaylistSongs.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Playlist extends Model {
    static associate(models) {
      // Define the associations here
      Playlist.belongsToMany(models.Song, {
        through: 'PlaylistSongs', // A junction table name
        foreignKey: 'playlist_id',
      });
      Playlist.belongsTo(models.User, {
        foreignKey: 'user_id',
      });
    }
  }

PlaylistSongs.init(
  {
    playlistId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'playlist',
        key: 'id',
      },
    },
    songId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'song', // Assuming you have a Song model
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'playlist_songs',
  }
);

module.exports = PlaylistSongs;
