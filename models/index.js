const User = require('./User')
const Playlist = require('./playlist')

Playlist.belongsTo(User,{
    foreignKey:'user_id'
}),

User.hasMany(Playlist,{
    foreignKey:'user_id'
})

module.exports = { User, Playlist }