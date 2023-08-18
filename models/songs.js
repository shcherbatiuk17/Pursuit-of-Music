const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')
const User = require('./User')

class Songs extends Model{}

Songs.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull:false,
        },
        
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'song',
      }
    );

    module.exports = Songs;
