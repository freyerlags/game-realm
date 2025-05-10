// assets/js/script.js

document.addEventListener('DOMContentLoaded', () => {
    // Get references to main elements
    const favoriteGamesGrid = document.getElementById('favoriteGamesGrid'); // Reference for favorites grid
    const allGamesGrid = document.getElementById('allGamesGrid');         // Reference for all games grid
    const noFavoritesMessage = document.getElementById('noFavoritesMessage'); // No favorites message

    // Get references to game window elements
    const gameWindowOverlay = document.getElementById('gameWindowOverlay');
    const gameIframe = document.getElementById('gameIframe');
    const gameTitleSpan = document.getElementById('gameTitle');
    const closeBtn = document.getElementById('closeBtn');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const newTabBtn = document.getElementById('newTabBtn');

    // Get reference to the body for scroll control
    const body = document.body;


    // --- Favorite System Helpers ---

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

    // --- Game Card HTML Generation ---

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

    // --- Rendering Function ---

    // Function to render games into their respective grids
    function renderGameGrids() {
        const favorites = loadFavorites(); // Load current favorites

        // Separate games into favorited and non-favorited
        const favoritedGames = gamesData.filter(game => favorites.includes(game.id));
        const nonFavoritedGames = gamesData.filter(game => !favorites.includes(game.id));

        // Clear existing grids
        favoriteGamesGrid.innerHTML = '';
        allGamesGrid.innerHTML = '';

        // Render favorited games
        if (favoritedGames.length > 0) {
            noFavoritesMessage.style.display = 'none'; // Hide message
            favoritedGames.forEach((game, index) => {
                // On the favorites row, they are always favorited
                const gameCardHTML = createGameCardHTML(game, true, index);
                favoriteGamesGrid.innerHTML += gameCardHTML;
            });
        } else {
            noFavoritesMessage.style.display = 'block'; // Show message
        }


        // Render non-favorited games
        nonFavoritedGames.forEach((game, index) => {
             // On the all games grid, they are never marked as favorited initially by this renderer
             // The click handler will update the icon state
            const gameCardHTML = createGameCardHTML(game, false, index);
            allGamesGrid.innerHTML += gameCardHTML;
        });
    }


    // --- Event Delegation for Clicks on Game Grids ---
    // We'll attach one listener to a common ancestor of both grids, e.g., the 'games' section

    document.querySelector('.games').addEventListener('click', (event) => {
        const target = event.target;

        // Handle Play Button Click
        const playButton = target.closest('.play-button');
        if (playButton) {
            event.preventDefault(); // Prevent default action

            const gamePath = playButton.getAttribute('data-path');
            const gameCard = playButton.closest('.game-card');
            const gameName = gameCard ? gameCard.querySelector('h4').textContent : 'Game';

            if (gamePath) {
                // Ensure the iframe is visible before setting src
                gameWindowOverlay.style.display = 'flex'; // Make sure it's display: flex for active class
                gameIframe.src = gamePath;
                gameTitleSpan.textContent = gameName;

                // Add active class to trigger transition in CSS
                gameWindowOverlay.classList.add('active');
                body.classList.add('game-active'); // Add body class to prevent scroll
            } else {
                console.error("Game path not found for button:", playButton);
                alert("Game not available.");
            }
            return; // Stop further processing
        }

        // Handle Favorite Button Click
        const favoriteButton = target.closest('.favorite-button');
        if (favoriteButton) {
             event.stopPropagation(); // Prevent bubbling to potential parent click listeners

             const gameCard = favoriteButton.closest('.game-card');
             const gameId = gameCard ? gameCard.getAttribute('data-game-id') : null;
             const heartIcon = favoriteButton.querySelector('.heart-icon');

             if (!gameId || !heartIcon) {
                 console.error("Cannot favorite: Missing gameId or heartIcon", gameCard);
                 return;
             }

             let currentFavorites = loadFavorites(); // Get the current state
             const isCurrentlyFavorited = heartIcon.classList.contains('favorited');

             if (isCurrentlyFavorited) {
                 // Currently favorited, unfavorite it
                 updateHeartIcon(heartIcon, false);
                 currentFavorites = currentFavorites.filter(id => id !== gameId);
             } else {
                 // Not currently favorited, favorite it
                 updateHeartIcon(heartIcon, true);
                  if (!currentFavorites.includes(gameId)) { // Avoid duplicates
                     currentFavorites.push(gameId);
                  }
             }

             saveFavorites(currentFavorites); // Save the updated list
             console.log("Favorites updated:", currentFavorites);

             // Re-render both grids to reflect the change
             // This causes a visual "move" of the card and updates both sections
             renderGameGrids();
        }
    });


    // --- Game Window Controls ---

    closeBtn.addEventListener('click', () => {
        // Remove active class (starts transition out defined in CSS)
        gameWindowOverlay.classList.remove('active');

        // Immediately remove the body class to allow scrolling again
        body.classList.remove('game-active');

        // --- FIX IMPLEMENTATION: Clear the iframe source ---
        // This is the crucial step to unload the iframe content and prevent interference.
        // Setting src to 'about:blank' is a standard way to get a blank page.
        // Also attempt to stop any potentially running scripts within the iframe first (cross-origin might block this).
        try {
            if (gameIframe.contentWindow) {
                 gameIframe.contentWindow.stop(); // Attempt to stop loading/scripts
            }
        } catch(e) {
             console.warn("Could not reliably stop iframe content (might be cross-origin):", e);
        }
        gameIframe.src = 'about:blank'; // Set the source to a blank page
        // ---------------------------------------------------

        // Use a timeout to wait for the CSS opacity transition to finish (0.3s)
        // before setting display: none; This keeps the transition smooth.
        setTimeout(() => {
             gameWindowOverlay.style.display = 'none'; // Fully hide the overlay
             gameTitleSpan.textContent = 'Game Title'; // Reset title display
             // The src is already reset above, no need to do it here
        }, 300); // Ensure this matches your CSS transition-duration

        // Exit fullscreen if currently in fullscreen mode
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
    });

    fullscreenBtn.addEventListener('click', () => {
        // Request fullscreen for the game window overlay element
        // (This ensures controls are included in fullscreen)
        const elementToFullscreen = gameWindowOverlay;

        if (elementToFullscreen.requestFullscreen) {
            elementToFullscreen.requestFullscreen();
        } else if (elementToFullscreen.mozRequestFullScreen) { /* Firefox */
            elementToFullscreen.mozRequestFullScreen();
        } else if (elementToFullscreen.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            elementToFullscreen.webkitRequestFullscreen();
        } else if (elementToFullscreen.msRequestFullscreen) { /* IE/Edge */
            elementToFullscreen.msRequestFullscreen();
        }
    });

    newTabBtn.addEventListener('click', () => {
        const currentGameUrl = gameIframe.src;
        // Only open a new tab if a game is actually loaded (src is not blank or empty)
        if (currentGameUrl && currentGameUrl !== 'about:blank' && currentGameUrl !== '') {
             // Open the actual game URL directly in a new tab
             const newWindow = window.open(currentGameUrl, '_blank', 'noopener,noreferrer');

             if (newWindow) {
                // If the new window opened successfully, close the overlay on the original page
                 // Call closeBtn.click() which now correctly resets the iframe
                closeBtn.click();
             } else {
                 // If window.open failed (likely due to popup blockers)
                 alert('Popup blocked! Please allow popups for this site to open the game in a new tab.');
             }
        } else {
            alert('No game is currently loaded in the window.'); // More helpful message if no game is loaded
        }
    });


    // Optional: Close window if escape key is pressed while overlay is visible
    document.addEventListener('keydown', (event) => {
        // Check if the overlay is currently visible and the escape key was pressed
        // Checking for the 'active' class ensures we don't interfere with other escape key uses
        if (event.key === 'Escape' && gameWindowOverlay.classList.contains('active')) {
            closeBtn.click(); // Simulate click on close button
        }
    });


    // --- Initial Render on Page Load ---
    renderGameGrids(); // Render games into both grids

    // Handle potential 'Favorites Page' link click if this script is used there too
    // (Though having a separate favorites.html might use different logic)
    // If favorites.html also uses this script, ensure renderGameGrids handles it correctly.
    // Based on your HTML, this script is for index.html which lists *all* games and *some* favorites.
    // A separate favorites.html would likely *only* render favorites.
    // For *this* index.html script, renderGameGrids correctly renders both sections.
});