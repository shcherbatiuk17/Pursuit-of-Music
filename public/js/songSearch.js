// songsearch.js
document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('song-search-btn');
    const userInput = document.querySelector('#inputArtist');
    const resultsContainer = document.querySelector('#search-results');
  
    // Handle click event on search button
    function getUserInput(event) {
      event.preventDefault();
    // Trim white space from both ends
      let artistName = userInput.value.trim();
    // Clear search bar input upon click event
      userInput.value = '';
  
      if (artistName) {
        fetch('/songs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ artistName: artistName }),
        })

          .then((response) => response.json())
          .then((data) => {
            displaySearchResults(data);
          })
          .catch((error) => {
            console.error('Error fetching search results:', error);
          });
      }
    }
  
    function displaySearchResults(results) {
      resultsContainer.innerHTML = ''; // Clear previous results
  
      if (results.length > 0) {
        const resultList = document.createElement('ul');
        resultList.classList.add('search-results-list');
  
        results.forEach((song) => {
          const listItem = document.createElement('li');
          listItem.textContent = `${song.name} by ${song.artist}`;
          resultList.appendChild(listItem);
        });
  
        resultsContainer.appendChild(resultList);
      } else {
        resultsContainer.textContent = 'No results found.';
      }
    }

  });

// Event listener for search button
searchButton.addEventListener('click', getUserInput);
