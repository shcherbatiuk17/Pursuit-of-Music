const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

class Playlists extends Model {}

Playlists.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'playlist',
      }
    );

    Playlists.belongsTo(User, {
        foreignKey:'user_id',
    });
    
    module.exports = Playlist;

