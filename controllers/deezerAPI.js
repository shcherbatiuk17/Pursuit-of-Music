const fetch = require('node-fetch');
function getTopSongsByArtist(artistName, limit = 5) {
    const searchUrl = `https://api.deezer.com/search/artist?q=${encodeURIComponent(artistName)}&limit=1&output=json`;
  
    return fetch(searchUrl)
      .then(response => response.json())
      .then(data => {
        const artistId = data.data[0]?.id;
        if (artistId) {
          const apiUrl = `https://api.deezer.com/artist/${artistId}/top?limit=${limit}&output=json`;
          return fetch(apiUrl);
        } else {
          throw new Error('Artist not found.');
        }
      })
      .then(response => response.json())
      .then(data => {
        const songs = data.data;
        const songInfoPromises = songs.map(song => {
          const trackUrl = `https://api.deezer.com/track/${song.id}`;
          return fetch(trackUrl).then(response => response.json());
        });
  
        return Promise.all(songInfoPromises);
      })
      .then(songsInfo => {
        const songData = songsInfo.map(songInfo => {
          return {
            title: songInfo.title,
            coverUrl: songInfo.album.cover_medium
          };
        });
        return songData;
      })
      .catch(error => {
        throw new Error(`Fetch error: ${error}`);
      });
  }
    module.exports = {
    getTopSongsByArtist
    
  };

  