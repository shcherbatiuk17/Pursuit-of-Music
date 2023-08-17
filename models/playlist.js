const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')
const User = require('./User')

class Playlist extends Model {}

Playlist.init(
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
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model:'user',
                key:'id'
            }
        },
        songs:[{
            type:DataTypes.INTEGER,
            references: {
                models:'songs',
                key:'id',
            }

        }]
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'playlist',
      }
    );


    
    module.exports = Playlist;

