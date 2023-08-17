const searchButton = document.getElementById('#song-search-btn'); 
const userInput = document.querySelector('#inputArtist');


// Handle click event on search button
function getUserInput(event) {
    event.preventDefault();
    //console.log('Testing search button');

    // Trim white space from both ends
    let artistName = userInput.value.trim();

    // Clear search bar input upon click event
    userInput.value = '';

    if (artistName) {

    };
    console.log(artistName)
};





// Event listener for search button
searchButton.addEventListener('submit', getUserInput);
