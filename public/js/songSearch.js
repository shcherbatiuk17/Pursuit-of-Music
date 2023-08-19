// Get the search button and user input field
const searchButton = document.getElementById('song-search-btn');
const userInput = document.querySelector('#inputArtist');

// Require your Sequelize Song model
const Song = require('../././../models/songs'); // Update the path accordingly

document.addEventListener('DOMContentLoaded', () => {
    const saveButtons = document.querySelectorAll('.save-button');

    saveButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
            const songId = event.target.getAttribute('data-song-id');

            // Retrieve the song details from your data source
            // Replace this with your logic to fetch song details based on songId
            const song = {
                title: 'Example Song Title',
                artist: 'Example Artist',
                coverUrl: 'example-cover.jpg'
            };

            // Create a new record in the database using Sequelize model
            try {
                await Song.create({
                    title: song.title,
                    artist: song.artist,
                    coverUrl: song.coverUrl
                });
                console.log('Song saved successfully');
            } catch (error) {
                console.error('Error saving song:', error);
            }
        });
    });
});

// Handle click event on search button
function getUserInput(event) {
    event.preventDefault();

    // Trim white space from both ends
    let artistName = userInput.value.trim();
    userInput.value = '';

    if (artistName) {
        fetch('/songs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ artistName: artistName })
        });
    }

    console.log(artistName);
}

// Event listener for search button
searchButton.addEventListener('click', getUserInput);
