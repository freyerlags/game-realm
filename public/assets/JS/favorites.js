// assets/js/favorites.js

document.addEventListener('DOMContentLoaded', () => {
    // Get references to elements specific to favorites page
    const favoriteGamesGrid = document.getElementById('favoriteGamesGrid');
    const noFavoritesMessage = document.getElementById('noFavoritesMessage');

    // Get references to game window elements (same as in script.js)
    const gameWindowOverlay = document.getElementById('gameWindowOverlay');
    const gameIframe = document.getElementById('gameIframe');
    const gameTitleSpan = document.getElementById('gameTitle');
    const closeBtn = document.getElementById('closeBtn');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const newTabBtn = document.getElementById('newTabBtn');

    // --- Favorite System Helpers (Same as in script.js) ---

    function loadFavorites() {
        try {
            const favorites = JSON.parse(localStorage.getItem('favGames'));
            return Array.isArray(favorites) ? favorites : [];
        } catch (e) {
            console.error("Error loading favorites from localStorage:", e);
            return [];
        }
    }

    function saveFavorites(favorites) {
        try {
            localStorage.setItem('favGames', JSON.stringify(favorites));
        } catch (e) {
            console.error("Error saving favorites to localStorage:", e);
        }
    }

    function updateHeartIcon(heartIconElement, isFavorited) {
        if (isFavorited) {
            heartIconElement.classList.add('favorited');
        } else {
            heartIconElement.classList.remove('favorited');
        }
    }

     // --- Game Card HTML Generation (Same as in script.js) ---

    function createGameCardHTML(game, isFavorited = false, index = 0) {
         // Add animation-delay for staggered effect
        const animationDelay = `${index * 0.05}s`; // 50ms delay per card

        return `
            <div class="game-card" data-game-id="${game.id}" style="animation-delay: ${animationDelay};">
                <img class="imgg" src="${game.img}" alt="${game.name}">
                <div class="game-info">
                    <h4>${game.name}</h4>
                    <div class="game-actions">
                         <button class="play-button" data-path="${game.path}">Play!</button>
                         <button class="favorite-button">
                             <i class="fa fa-heart heart-icon ${isFavorited ? 'favorited' : ''}"></i>
                         </button>
                    </div>
                </div>
            </div>
        `;
    }


    // --- Favorites Page Rendering Logic ---

    function renderFavoriteGames() {
        favoriteGamesGrid.innerHTML = ''; // Clear the grid
        const favorites = loadFavorites(); // Get favorite IDs

        // Filter the main gamesData to get only the favorited games
        const favoritedGames = gamesData.filter(game => favorites.includes(game.id));

        if (favoritedGames.length === 0) {
            noFavoritesMessage.style.display = 'block'; // Show message
            return; // Stop if no favorites
        } else {
             noFavoritesMessage.style.display = 'none'; // Hide message
        }

        // Render the filtered games
        favoritedGames.forEach((game, index) => {
             // On the favorites page, all displayed games ARE favorited
            const gameCardHTML = createGameCardHTML(game, true, index);
            favoriteGamesGrid.innerHTML += gameCardHTML;
        });
    }


     // --- Event Delegation for Game Grid Clicks on Favorites Page ---

    // Add a single click listener to the favorite games grid container
    favoriteGamesGrid.addEventListener('click', (event) => {
        const target = event.target;

        // Handle Play Button Click (Same logic as script.js)
        const playButton = target.closest('.play-button');
        if (playButton) {
            event.preventDefault();

            const gamePath = playButton.getAttribute('data-path');
            const gameCard = playButton.closest('.game-card');
            const gameName = gameCard ? gameCard.querySelector('h4').textContent : 'Game';

            if (gamePath) {
                gameIframe.src = gamePath;
                gameTitleSpan.textContent = gameName;

                gameWindowOverlay.classList.add('active');
                document.body.classList.add('game-active');
            } else {
                console.error("Game path not found for button:", playButton);
                alert("Game not available.");
            }
             return; // Stop further processing
        }

        // Handle Favorite Button Click on Favorites page
        const favoriteButton = target.closest('.favorite-button');
        if (favoriteButton) {
             event.stopPropagation();

             const gameCard = favoriteButton.closest('.game-card');
             const gameId = gameCard ? gameCard.getAttribute('data-game-id') : null;
             const heartIcon = favoriteButton.querySelector('.heart-icon');

             if (!gameId || !heartIcon) {
                 console.error("Cannot unfavorite: Missing gameId or heartIcon", gameCard);
                 return;
             }

             let currentFavorites = loadFavorites(); // Get the current state

             // On the favorites page, clicking the heart always unfavorites
             updateHeartIcon(heartIcon, false); // Visually unfavorite
             currentFavorites = currentFavorites.filter(id => id !== gameId); // Remove from list

             saveFavorites(currentFavorites); // Save the updated list
             console.log("Unfavorited:", gameId, "New favorites:", currentFavorites);

             // **Crucially: Remove the game card from the display on this page**
             // We only remove the card from the DOM on the favorites page,
             // because it's no longer a favorite.
             gameCard.remove();

             // Check if the list is now empty and show the message
             if (favoriteGamesGrid.children.length === 0) { // Only check if there are no children left
                 noFavoritesMessage.style.display = 'block';
             }
        }
    });


    // --- Game Window Controls ---

    closeBtn.addEventListener('click', () => {
        // Remove active class (starts transition out)
        gameWindowOverlay.classList.remove('active');

        // --- FIX: Stop iframe loading and immediately reset src ---
        // Attempt to stop any ongoing loading/scripts in the iframe
        try {
             // Check if the iframe has a contentWindow before trying to stop it
             if (gameIframe.contentWindow) {
                gameIframe.contentWindow.stop(); // This might fail due to cross-origin restrictions, which is fine
             }
        } catch(e) {
             console.warn("Could not stop iframe content load (might be cross-origin):", e);
        }
        // Immediately set src to about:blank for a clean state
        gameIframe.src = 'about:blank';
        // -----------------------------------------------------------------


        // Use a timeout to wait for the transition to finish before fully hiding
        setTimeout(() => {
             gameWindowOverlay.style.display = 'none'; // Fully hide after transition
             document.body.classList.remove('game-active');
             gameTitleSpan.textContent = 'Game Title'; // Reset title
        }, 300); // Match the CSS transition duration

        // Exit fullscreen if currently in fullscreen mode
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
    });

    fullscreenBtn.addEventListener('click', () => {
        if (gameWindowOverlay.requestFullscreen) {
            gameWindowOverlay.requestFullscreen();
        } else if (gameWindowOverlay.mozRequestFullScreen) {
            gameWindowOverlay.mozRequestFullScreen();
        } else if (gameWindowOverlay.webkitRequestFullscreen) {
            gameWindowOverlay.webkitRequestFullscreen();
        } else if (gameWindowOverlay.msRequestFullscreen) {
            gameWindowOverlay.msRequestFullscreen();
        }
    });

    newTabBtn.addEventListener('click', () => {
        const currentGameUrl = gameIframe.src;
         if (currentGameUrl && currentGameUrl !== 'about:blank' && currentGameUrl !== '') {
             const newWindow = window.open('about:blank', '_blank');
             if (newWindow) {
                setTimeout(() => {
                    newWindow.location.href = currentGameUrl;
                }, 50);
                closeBtn.click(); // Use the close button logic
             } else {
                 alert('Popup blocked! Please allow popups for this site to open the game in a new tab.');
             }
        } else {
            alert('No game is currently loaded in the window.');
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && gameWindowOverlay.classList.contains('active')) {
            closeBtn.click();
        }
    });


    // --- Initial Render on Favorites Page Load ---
    renderFavoriteGames(); // Render only favorited games
});
