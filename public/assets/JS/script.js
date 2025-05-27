// assets/js/script.js
// This file contains all the interactive JavaScript logic for the game realm site.
// It depends on the gamesData array being loaded from gamesData.js before this script.

console.log('script.js: Script started');

// --- CATEGORY MAPPING ---
// This map manually assigns game IDs to categories.
// It references game IDs defined in gamesData.js.
// Ensure IDs here EXACTLY match IDs in gamesData.js (case-sensitive).
// Corrected some IDs based on previous review (Paper.io 3D, Slope, Death Run 3d, fnaw, Tabs, N-gon Master image name).
const categoryMap = {
    // 'all' section is removed from HTML. 'favorites' is handled separately by renderFavoriteGames.
    'recommended': { selector: '.recommended-games-container', title: 'Recommended', gameIds: [
        "fav-Games-Crazy-Cattle-3D-singlefile-html", "fav-Games-Bit-Planes-index-html", "fav-Games-Time-Shooter-2-html",
        "fav-Games-Time-Shooter-3-html", "fav-Games-Rocket-Soccer-Derby-index-html", "fav-Games-Paper-io-2-html",
        "fav-Games-Amazing-Strange-Rope-Police-index-html", "fav-Games-There-Is-No-Game-index-html", "fav-Games-Funny-Shooter-2-index-html",
        "fav-Games-Block-Blast-index-html", "fav-Games-99-Balls-html", "fav-Games-Stickman-Hook-index-html",
        "fav-Games-Paperclips-index-html", "fav-Games-Bitlife-index-html", "fav-Games-Cube-Field-index-html",
        "fav-Games-Just-One-Boss-html", "fav-Games-Space-Garden-html", "fav-Games-Tunnel-Rush-index-html",
        "fav-Games-Ash-Belt-index-html", "fav-Games-Ascii-Space-html", "fav-Games-N-Gon-Master-index-html",
        "fav-Games-Recoil-html", "fav-Games-Konnekt-index-html", "fav-Games-Survival-Race-index-html",
        "fav-Games-Super-Fowlest-html", "fav-Games-Boxing-Physics-2-index-html",
        "fav-Games-2048-index-html", "fav-Games-Basket-Random-index-html", "fav-Games-Drive-Mad-html",
        "fav-Games-Nut-Simulator-index-html", "fav-Games-Drift-Mania-index-html", "fav-Games-Snow-Rider-3D-index-html",
        "fav-Games-Tomb-Of-The-Mask-html"
    ]},
     'shooter': { selector: '.shooter-games-container', title: 'Shooter Games', gameIds: [
        "fav-Games-1v1-LOL-index-html", "fav-Games-Asteroids-index-html", "fav-Games-Ascii-Space-html",
        "fav-Games-Awesome-Tanks-html", "fav-Games-Ball-Blast-html", "fav-Games-Funny-Shooter-2-index-html",
        "fav-Games-Rooftop-Snipers-2-index-html", "fav-Games-Skibidi-Toilet-index-html", "fav-Games-Amazing-Strange-Rope-Police-index-html",
        "fav-Games-Bit-Planes-index-html", "fav-Games-Chroma-Incident-index-html", "fav-Games-Evil-Glitch-index-html",
        "fav-Games-Johnny-Upgrade-html", "fav-Games-Drunken-Duel-index-html", "fav-Games-Ash-Belt-index-html",
        "fav-Games-Stick-Archers-Battle-index-html", "fav-Games-Laser-Lord-html", "fav-Games-N-Gon-Master-index-html",
        "fav-Games-Matrix-Rampage-index-html", "fav-Games-Kitchen-Gun-Game-index-html", "fav-Games-Planetesimals-index-html",
        "fav-Games-Recoil-html", "fav-Games-Reload-html", "fav-Games-Scratch-Brawl-1-html",
        "fav-Games-Scratch-Brawl-2-html", "fav-Games-Time-Shooter-1-index-html", "fav-Games-Time-Shooter-2-html",
        "fav-Games-Time-Shooter-3-html", "fav-Games-Getaway-Shootout-index-html"
    ]},
     'combat': { selector: '.combat-games-container', title: 'Combat Games', gameIds: [
        "fav-Games-Crazy-Cattle-3D-singlefile-html", "fav-Games-Boxing-Physics-2-index-html", "fav-Games-1v1-LOL-index-html",
        "fav-Games-Dungeon-Raid-html", "fav-Games-Konnekt-index-html", "fav-Games-N-Gon-Master-index-html",
        "fav-Games-Paper-io-2-html", "fav-Games-Paper.io 3D-html", "fav-Games-Time-Shooter-1-index-html",
        "fav-Games-Time-Shooter-2-html", "fav-Games-Time-Shooter-3-html", "fav-Games-Funny-Shooter-2-index-html",
        "fav-Games-Scratch-Brawl-1-html", "fav-Games-Scratch-Brawl-2-html", "fav-Games-Amazing-Strange-Rope-Police-index-html",
        "fav-Games-Slime-Ninja-html", "fav-Games-Ash-Belt-index-html", "fav-Games-Boxing-Random-index-html",
        "fav-Games-Stick-Archers-Battle-index-html", "fav-Games-Matrix-Rampage-index-html", "fav-Games-Getaway-Shootout-index-html",
        "fav-Games-Baldis-Basics-index-html", "fav-Games-Drunken-Duel-index-html", "fav-Games-Craftmine-index-html",
        "fav-Games-Black-Knight-index-html", "fav-Games-Super-Fowlest-html", "fav-Games-Super-Scratch-Bros-html",
     ]},
    'puzzle': { selector: '.puzzle-games-container', title: 'Puzzle Games', gameIds: [
        "fav-Games-Mine-Sweeper-index-html", "fav-Games-2048-index-html", "fav-Games-2048-9007199254740992-index-html",
        "fav-Games-2048-Couch-index-html", "fav-Games-2048-Doge-index-html", "fav-Games-2048-Meme-index-html",
        "fav-Games-2048-Reverse-index-html", "fav-Games-99-Balls-html", "fav-Games-Ball-Sort-Halloween-index-html",
        "fav-Games-Ball-Sort-Puzzle-index-html", "fav-Games-Ball-Sort-Soccer-index-html", "fav-Games-Black-Hole-Square-index-html",
        "fav-Games-There-Is-No-Game-index-html", "fav-Games-Bob-The-Robber-html", "fav-Games-Break-Lock-index-html",
        "fav-Games-Circle-O-html", "fav-Games-9-Ball-index-html", "fav-Games-7-Days-Without-Rain-index-html",
        "fav-Games-Google-Feud-index-html", "fav-Games-Circle-O-2-index-html", "fav-Games-Connect-3-index-html",
        "fav-Games-3-Finder-index-html", "fav-Games-Block-The-Pig-index-html", "fav-Games-Core-Ball-index-html",
        "fav-Games-Drive-Mad-html", "fav-Games-Bubble-Pop-index-html", "fav-Games-Block-Blast-index-html",
        "fav-Games-Edge-Not-Found-html", "fav-Games-Fill-Infinite-html", "fav-Games-Hextris-index-html",
        "fav-Games-Color-Match-index-html", "fav-Games-Konnekt-index-html", "fav-Games-Push-Back-index-html",
        "fav-Games-Rise-Higher-index-html", "fav-Games-Roadblocks-index-html", "fav-Games-Suika-Game-Watermelon-Game-html",
        "fav-Games-Water-Sort-html", "fav-Games-Wordle-html", "fav-Games-xx142-b2-exe-html"
    ]},
     'multiplayer': { selector: '.multiplayer-games-container', title: 'Multiplayer Games', gameIds: [
         "fav-Games-1v1-LOL-index-html", "fav-Games-Basket-Random-index-html", "fav-Games-Boxing-Physics-2-index-html",
         "fav-Games-Rooftop-Snipers-2-index-html", "fav-Games-Drunken-Duel-index-html", "fav-Games-Basketball-Stars-index-html",
         "fav-Games-Soccer-Random-index-html", "fav-Games-2D-Rocket-League-index-html", "fav-Games-My-Rusty-Submarine-index-html",
         "fav-Games-4-Player-Arcade-html", "fav-Games-1v1-Soccer-index-html",
         "fav-Games-Stick-Archers-Battle-index-html", "fav-Games-Volley-Random-index-html", "fav-Games-Tube-Jumpers-html",
         "fav-Games-Boxing-Random-index-html"
     ]},
     'io': { selector: '.io-games-container', title: 'IO Games', gameIds: [
        "fav-Games-Paper-io-2-html", "fav-Games-Paper.io 3D-html", "fav-Games-Hole-io-index-html",
        "fav-Games-Snowball-io-index-html",
     ]},
     'adventure': { selector: '.adventure-games-container', title: 'Adventure Games', gameIds: [
        "fav-Games-Bee-Swarm-Simulator-html", "fav-Games-Bitlife-index-html", "fav-Games-Bob-The-Robber-html",
        "fav-Games-Bounce-Back-index-html", "fav-Games-Chroma-Incident-index-html", "fav-Games-Epic-Ninja-html",
        "fav-Games-Amazing-Strange-Rope-Police-index-html", "fav-Games-Johnny-Upgrade-html", "fav-Games-Eaglercraft-1-8-html",
        "fav-Games-Moonwalk-html", "fav-Games-N-Gon-Master-index-html", "fav-Games-There-Is-No-Game-index-html",
        "fav-Games-Amidst-The-Sky-index-html", "fav-Games-Idle-Mining-index-html", "fav-Games-Not-That-Dead-html",
        "fav-Games-Plantale-html", "fav-Games-Craftmine-index-html", "fav-Games-Reload-html",
        "fav-Games-Adventure-Anxiety-index-html", "fav-Games-Space-Garden-html", "fav-Games-Space-Huggers-html",
        "fav-Games-Super-Fowlest-html", "fav-Games-The-Ninja-1-html", "fav-Games-The-Ninja-2-html",
        "fav-Games-The-Ninja-3-html", "fav-Games-The-Ninja-4-html", "fav-Games-The-Ninja-5-html",
        "fav-Games-The-Ninja-Level-Creator-html", "fav-Games-The-Ninja-Master-html"
     ]},
     'clicker': { selector: '.clicker-games-container', title: 'Clicker Games', gameIds: [
        "fav-Games-A-Dark-Room-index-html", "fav-Games-Bitcoin-Clicker-index-html", "fav-Games-Cookie-Clicker-index-html",
        "fav-Games-Adventure-Capitalist-index-html", "fav-Games-Doge-Miner-index-html", "fav-Games-Gun-Spin-index-html",
        "fav-Games-Idle-Breakout-index-html", "fav-Games-10-Count-index-html", "fav-Games-Idle-Mining-index-html",
        "fav-Games-Nut-Simulator-index-html", "fav-Games-Paperclips-index-html", "fav-Games-Space-Company-index-html",
        "fav-Games-Trimps-index-html"
     ]},
     'survival': { selector: '.survival-games-container', title: 'Survival Games', gameIds: [
        "fav-Games-Crazy-Cattle-3D-singlefile-html", "fav-Games-Missiles-index-html", "fav-Games-1v1-LOL-index-html",
        "fav-Games-Appel-html", "fav-Games-Arrow-html", "fav-Games-Asteroids-index-html",
        "fav-Games-Ascii-Space-html", "fav-Games-FNAW-index-html", "fav-Games-Death-Run-3D-index-html",
        "fav-Games-Battle-For-Gondor-index-html", "fav-Games-Awesome-Tanks-html", "fav-Games-My-Rusty-Submarine-index-html",
        "fav-Games-Bit-Planes-index-html", "fav-Games-Bitlife-index-html", "fav-Games-Baldis-Basics-index-html",
        "fav-Games-Blob-html", "fav-Games-Backrooms-index-html", "fav-Games-Craftmine-index-html",
        "fav-Games-Bob-The-Robber-html", "fav-Games-Bounce-Back-index-html", "fav-Games-Bouncy-Ninja-1-html",
        "fav-Games-Bouncy-Ninja-2-html", "fav-Games-Captain-Callisto-html", "fav-Games-Celeste-index-html",
        "fav-Games-Chroma-Incident-index-html", "fav-Games-Cluster-Rush-index-html", "fav-Games-Cube-Field-index-html",
        "fav-Games-Dungeon-Raid-html", "fav-Games-Epic-Ninja-html", "fav-Games-Black-Knight-index-html",
        "fav-Games-Evil-Glitch-index-html", "fav-Games-Helix-Jump-index-html", "fav-Games-Its-Raining-Boxes-html",
        "fav-Games-Just-One-Boss-html", "fav-Games-Just-Shapes-And-Beats-html", "fav-Games-Konnekt-index-html",
        "fav-Games-Laser-Lord-html", "fav-Games-Eaglercraft-1-8-html", "fav-Games-N-Gon-Master-index-html",
        "fav-Games-Pacman-Classic-index-html", "fav-Games-Paper-io-2-html", "fav-Games-Paper.io 3D-html",
        "fav-Games-Survival-Race-index-html", "fav-Games-Planetesimals-index-html", "fav-Games-Rolling-Forests-html",
        "fav-Games-Sausage-Run-html", "fav-Games-Shuttle-Deck-html", "fav-Games-Slope-html",
        "fav-Games-Snow-Rider-3D-index-html", "fav-Games-Super-Fowlest-html", "fav-Games-Tomb-Of-The-Mask-html",
        "fav-Games-Tunnel-Rush-index-html"
     ]},
     'simulator': { selector: '.simulator-games-container', title: 'Simulator Games', gameIds: [
         "fav-Games-Bee-Swarm-Simulator-html", "fav-Games-Bitlife-index-html", "fav-Games-Fluidism-index-html",
         "fav-Games-Monkey-Mart-html", "fav-Games-Sand-Game-html", "fav-Games-Amazing-Strange-Rope-Police-index-html"
     ]},
     'platformer': { selector: '.platformer-games-container', title: 'Platformer Games', gameIds: [
        "fav-Games-Appel-html", "fav-Games-Blob-html", "fav-Games-Circle-O-html",
        "fav-Games-Circle-O-2-index-html", "fav-Games-Dante-html", "fav-Games-Dont-Fall-html",
        "fav-Games-Doodle-Jump-html", "fav-Games-Drive-Mad-html", "fav-Games-Just-Fall-index-html",
        "fav-Games-Bottle-Flip-index-html", "fav-Games-Epic-Ninja-html", "fav-Games-Blumgi-Slime-index-html",
        "fav-Games-Getting-Over-It-html", "fav-Games-Helix-Jump-index-html", "fav-Games-Death-Run-3D-index-html",
        "fav-Games-Its-Raining-Boxes-html", "fav-Games-Johnny-Upgrade-html", "fav-Games-N-Gon-Master-index-html",
        "fav-Games-Offline-Paradise-html", "fav-Games-OvO-html", "fav-Games-Plantale-html",
        "fav-Games-Retro-Haunt-index-html", "fav-Games-Snail-Platformer-html", "fav-Games-Tomb-Of-The-Mask-html",
        "fav-Games-Twisted-Mind-html", "fav-Games-Worlds-Hardest-Game-2-index-html", "fav-Games-xx142-b2-exe-html"
     ]},
     'fighting': { selector: '.fighting-games-container', title: 'Fighting Games', gameIds: [
         "fav-Games-Happy-Wheels-index-html", "fav-Games-Just-Shapes-And-Beats-html", "fav-Games-Super-Hot-index-html",
         "fav-Games-Super-Scratch-Bros-html"
     ]},
     'other': { selector: '.other-games-container', title: 'Other Games', gameIds: [
        "fav-Games-Flappy-Bird-index-html", "fav-Games-Flappy-Copter-index-html", "fav-Games-Fruit-Ninja-index-html",
        "fav-Games-Google-Snake-html", "fav-Games-Tiny-Fishing-html"
     ]}
};


document.addEventListener('DOMContentLoaded', () => {
    console.log('script.js: DOMContentLoaded fired');

    const body = document.body;

    // --- Global Elements ---
    const settingsBtn = document.getElementById('settingsBtn');
    const settingsMenu = document.getElementById('settingsMenu');
    const closeSettingsBtn = document.getElementById('closeSettingsBtn');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const clearFavoritesBtn = document.getElementById('clearFavoritesBtn');

    // --- Settings Menu: about:blank and Panic Button Elements ---
    const openInAboutBlankBtn = document.getElementById('openInAboutBlankBtn');
    const panicKeyInput = document.getElementById('panicKeyInput');
    const panicUrlInput = document.getElementById('panicUrlInput');
    const panicKeyStatus = document.getElementById('panicKeyStatus');
    const savePanicSettingsBtn = document.getElementById('savePanicSettingsBtn');

    // --- Game Specific Elements ---
    // Note: allGamesGrid is removed from HTML, so it's commented out here
    const favoriteGamesGrid = document.getElementById('favoriteGamesGrid');
    // const allGamesGrid = document.getElementById('allGamesGrid'); // Removed
    const noFavoritesMessage = document.getElementById('noFavoritesMessage'); // Message for empty favorites
    const gameWindowOverlay = document.getElementById('gameWindowOverlay'); // The fullscreen/overlay div
    const gameIframe = document.getElementById('gameIframe'); // The iframe inside the overlay
    const gameTitleSpan = document.getElementById('gameTitle'); // Span for game title in overlay controls
    const closeGameBtn = document.getElementById('closeBtn'); // Close button for the overlay
    const fullscreenBtn = document.getElementById('fullscreenBtn'); // Fullscreen button for the overlay
    const newTabBtn = document.getElementById('newTabBtn'); // New tab button for the overlay

    // --- Panic Button State ---
    let currentPanicKey = null;
    let currentPanicUrl = 'https://www.google.com';
    let tempSelectedPanicKey = null; // Key selected during input focus, before saving
    let isPanicKeyCapturing = false; // Flag to indicate if the panic key input is focused


    // ========================================
    // HELPER FUNCTIONS
    // ========================================

    // Find a game object by its ID
    function getGameById(id) {
        // Check if gamesData is loaded and is an array. This relies on gamesData.js being loaded first.
        if (typeof gamesData === 'undefined' || !Array.isArray(gamesData)) {
            console.error("getGameById: gamesData is not loaded or is not an array. Check script order in HTML.");
            return null;
        }
        const game = gamesData.find(game => game.id === id);
        // console.log(`getGameById: Looked for ID "${id}", found:`, game ? game.name : null);
        return game || null; // Return the game object or null if not found
    }

    // Load favorite game IDs from localStorage
    function loadLocalFavorites() {
        try {
            const favs = JSON.parse(localStorage.getItem('favGames'));
            // Filter out any potentially null/undefined items or invalid IDs that don't exist in gamesData
            const validFavs = Array.isArray(favs) ? favs.filter(id => {
                // Use getGameById to check if the ID exists in the current gamesData
                const exists = id && typeof id === 'string' && getGameById(id) !== null;
                // Optional: log if an invalid ID is found and filtered out
                if (!exists && id) {
                     // console.warn(`loadLocalFavorites: Removing invalid favorite ID "${id}" from storage.`);
                }
                return exists;
            }) : [];
            // console.log("Loaded valid favorites:", validFavs);
            return validFavs;
        } catch (e) {
            console.error("Error loading favGames from localStorage:", e);
            return []; // Return empty array on error
        }
    }

    // Save favorite game IDs to localStorage
    function saveLocalFavorites(favs) {
        try {
            // Ensure only valid game IDs are saved by re-filtering against gamesData
            const validFavs = Array.isArray(favs) ? favs.filter(id => id && typeof id === 'string' && getGameById(id) !== null) : [];
            localStorage.setItem('favGames', JSON.stringify(validFavs));
            // console.log("Saved favorites:", validFavs);
        } catch (e) {
            console.error("Error saving favGames to localStorage:", e);
        }
    }

    // ========================================
    // GAME RENDERING FUNCTIONS
    // ========================================

    // Function to create the HTML string for a single game card div
    // This is used for both the favorites grid and the horizontal category containers
    function createGameCardHTML(game, isFavorited = false, index = 0) {
        // Basic validation for game data completeness
        if (!game || !game.id || !game.path || !game.name || !game.img) {
             console.error("createGameCardHTML: Invalid game data provided, cannot create card:", game);
             return ''; // Return empty string if game data is incomplete
        }
        // Determine the correct Font Awesome class for the heart icon (solid or outline)
        const heartClass = isFavorited ? 'fa fa-heart heart-icon favorited' : 'fa fa-heart heart-icon';
        // Calculate animation delay for staggered appearance in grids/lists
        const animationDelay = `${index * 0.03}s`;

        // Return the HTML string for the game card div (.game-card)
        return `
            <div class="game-card" data-game-id="${game.id}" style="animation-delay: ${animationDelay};">
                <img class="imgg" src="${game.img}" alt="${game.name}">
                <div class="game-info">
                    <h4>${game.name}</h4>
                    <div class="game-actions">
                         <button class="play-button" data-path="${game.path}" aria-label="Play ${game.name}">Play!</button>
                         <button class="favorite-button" aria-label="${isFavorited ? 'Remove from favorites' : 'Add to favorites'}">
                             <i class="${heartClass}"></i>
                         </button>
                    </div>
                </div>
            </div>
        `;
    }

    // Renders games into a horizontal scroll category container based on categoryMap
    function renderCategoryGames(categoryKey) {
        const categoryInfo = categoryMap[categoryKey];
        // Ensure categoryInfo exists and has a selector (skip 'all'/'favorites' keys which are not for this function)
        if (!categoryInfo || !categoryInfo.selector || categoryKey === 'all' || categoryKey === 'favorites') {
            return;
        }

        // Find the HTML container element for this category using the selector
        const container = document.querySelector(categoryInfo.selector);
        if (!container) {
            // If the container element isn't found in the HTML, log an error and stop for this category
            console.error(`renderCategoryGames: Container not found for category: "${categoryKey}" with selector "${categoryInfo.selector}". Please check your index.html.`);
            return;
        }

        // console.log(`renderCategoryGames: Rendering category "${categoryInfo.title}" into "${categoryInfo.selector}"`);
        container.innerHTML = ''; // Clear any existing content inside the container

        const localFavs = loadLocalFavorites(); // Get current favorite IDs from localStorage

        // Get the full game objects from gamesData for the IDs listed in this category's gameIds array
        // Use .map and .filter to find the games and filter out any IDs that do not correspond to a valid game in gamesData
        const gamesToRender = categoryInfo.gameIds
            .map(id => getGameById(id))
            .filter(game => game !== null); // Only keep games that were successfully found

        // console.log(`renderCategoryGames: Found ${gamesToRender.length} valid games in gamesData for category "${categoryInfo.title}" from ${categoryInfo.gameIds.length} listed IDs.`);

        // Generate and append the HTML string for each valid game card to the container
        if (gamesToRender.length > 0) {
             gamesToRender.forEach((game, index) => {
                 const isFavorited = localFavs.includes(game.id); // Check if this game is currently a favorite
                 // Append the HTML string for the game card div using +=
                 container.innerHTML += createGameCardHTML(game, isFavorited, index);
            });
        } else {
             // Optional: Display a message if the category list ends up empty after filtering invalid IDs
             // container.innerHTML = `<p style='width: 100%; text-align: center;'>No games found for this category.</p>`;
        }

        // Find the parent section containing this container and set up scroll arrows for it
         const categorySection = container.closest('.game-category');
         if (categorySection) {
              setupScrollArrows(categorySection);
         }
    }

    // Note: renderAllGamesGrid function is removed as the 'All Games' section is removed from HTML.

    // Renders games into the 'Favorites' grid section
    function renderFavoriteGames() {
        const favoritesGrid = document.getElementById('favoriteGamesGrid');
        const noFavoritesMessage = document.getElementById('noFavoritesMessage');
        // Ensure necessary elements exist and gamesData is available and valid
        if (!favoritesGrid || !noFavoritesMessage || typeof gamesData === 'undefined' || !Array.isArray(gamesData)) {
             console.warn("renderFavoriteGames: Favorites grid, message, or gamesData not found/available/valid. Cannot render favorites.");
             return;
        }

        // console.log('renderFavoriteGames: Rendering Favorites grid');
        favoritesGrid.innerHTML = ''; // Clear any existing content in the favorites grid

        const localFavs = loadLocalFavorites(); // Load the list of favorite IDs from storage
        // console.log("renderFavoriteGames: Current favorite IDs loaded from storage:", localFavs);


        // Get the full game objects from gamesData for the loaded favorite IDs
        // Use .map and .filter to find the games and filter out any IDs that do not correspond to a valid game in gamesData
        const favoriteGames = localFavs
            .map(id => getGameById(id))
            .filter(game => game !== null); // Only keep games that were successfully found

        // console.log(`renderFavoriteGames: Found ${favoriteGames.length} actual favorite games from loaded IDs.`);

        // Check if there are any actual favorite game objects to display
        if (favoriteGames.length === 0) {
            noFavoritesMessage.style.display = 'block'; // Show the "no favorites" message
            // console.log("renderFavoriteGames: No actual favorites, showing message.");
        } else {
             noFavoritesMessage.style.display = 'none'; // Hide the "no favorites" message
             // Generate and append the HTML string for each favorite game card
             // Favorites are always marked as isFavorited = true when rendered here
             favoriteGames.forEach((game, index) => {
                 favoritesGrid.innerHTML += createGameCardHTML(game, true, index);
             });
        }
    }

    // Orchestrates the rendering of all game lists/grids on the page
    // This function is called initially on DOMContentLoaded and after any action that changes favorite status
    function renderAllGameLists() {
        console.log('renderAllGameLists: Starting full render of favorite games and category sections.');
        // Render the favorites grid first
        renderFavoriteGames();

        // Loop through the categoryMap and render each specific category
        for (const categoryKey in categoryMap) {
            // Use hasOwnProperty to ensure we only process keys directly on the object itself
            if (categoryMap.hasOwnProperty(categoryKey)) {
                // Exclude 'all' and 'favorites' as they are not handled by renderCategoryGames
                if (categoryKey !== 'all' && categoryKey !== 'favorites') {
                     renderCategoryGames(categoryKey);
                }
            }
        }
         console.log('renderAllGameLists: Full render finished.');
    }

    // ========================================
    // EVENT LISTENERS FOR GAMES SECTION (USING DELEGATION)
    // ========================================

    // Add a single click listener to the main '.games' section and handle clicks on its children (game cards, buttons) using event delegation
    const gamesSection = document.querySelector('.games');
    if (gamesSection) {
        console.log('script.js: Games section found, adding delegated click listener.');
        gamesSection.addEventListener('click', (event) => {
            const target = event.target; // The element that was actually clicked

            // --- Handle Play Button Click ---
            // Check if the clicked element, or any of its ancestors up the DOM tree, is a .play-button
            const playButton = target.closest('.play-button');
            if (playButton) {
                event.preventDefault(); // Stop the default button behavior (like submitting a form if inside one)
                const gameCard = playButton.closest('.game-card'); // Find the nearest parent element with class .game-card
                // Get the game path from the data-path attribute on the play button element
                const gamePath = playButton.getAttribute('data-path');
                 // Get the game name from the h4 element inside the found game card, with a fallback to 'Game'
                const gameName = gameCard ? gameCard.querySelector('h4')?.textContent || 'Game' : 'Game'; // Use optional chaining (.?) for safety

                // console.log(`script.js: Play button clicked for game: "${gameName}" path: "${gamePath}"`);

                // Ensure necessary game window elements are found before trying to open the game overlay
                if (gamePath && gameWindowOverlay && gameIframe && gameTitleSpan) {
                    gameIframe.src = gamePath; // Set the iframe source to load the game HTML
                    gameTitleSpan.textContent = gameName; // Update the game title displayed in the overlay controls
                    gameWindowOverlay.style.display = 'flex'; // Make the overlay visible (assuming CSS display: flex)
                    gameWindowOverlay.classList.add('active'); // Add an 'active' class for potential CSS transitions
                    body.classList.add('game-active'); // Add a class to the body (useful for disabling scroll, adding backdrop effects)
                } else {
                    // Log a warning if required elements are missing when a play button is clicked
                    console.warn("Play button clicked, but necessary game window elements or game path missing.", {gamePath, gameWindowOverlay, gameIframe, gameTitleSpan});
                    alert("Game not available or necessary page elements are missing.");
                }
                return; // Stop processing this click event further since we handled a play button click
            }

            // --- Handle Favorite Button Click ---
            // Check if the clicked element, or any of its ancestors up the DOM tree, is a .favorite-button
            const favoriteButton = target.closest('.favorite-button');
            if (favoriteButton) {
                event.stopPropagation(); // Prevent the click event from bubbling up to the parent game card/play listener
                const gameCard = favoriteButton.closest('.game-card'); // Find the nearest parent element with class .game-card
                // Get the game ID from the data-game-id attribute on the game card element
                const gameId = gameCard ? gameCard.getAttribute('data-game-id') : null;

                // console.log(`script.js: Favorite button clicked for game ID: "${gameId}"`);

                // If no game ID is found on the card, log a warning and exit
                if (!gameId) {
                     console.warn("Favorite button clicked but game ID not found on the game card.");
                    return; // Exit if game ID is missing
                }

                let localFavs = loadLocalFavorites(); // Load the current list of favorite IDs from localStorage
                const index = localFavs.indexOf(gameId); // Find the index of this game ID in the favorites list

                if (index > -1) {
                    // If the game ID is found (it's currently favorited), remove it from the array
                    localFavs.splice(index, 1);
                     // console.log(`script.js: Removed game ID "${gameId}" from favorites.`);
                } else {
                    // If the game ID is not found (it's not favorited), add it
                    const gameExists = getGameById(gameId); // First, double-check that this game ID exists in our gamesData
                    if (gameExists) {
                         localFavs.push(gameId); // Add the game ID to the favorites list
                         // console.log(`script.js: Added game ID "${gameId}" to favorites.`);
                    } else {
                         // If the game ID doesn't exist in gamesData, log a warning and don't add it to favorites
                         console.warn(`script.js: Attempted to favorite game with ID "${gameId}", but it does not exist in gamesData. Cannot add to favorites.`);
                         return; // Exit the function without saving if the game ID is invalid
                    }
                }

                saveLocalFavorites(localFavs); // Save the updated favorites list to localStorage
                renderAllGameLists(); // Re-render all game lists/grids to update the heart icons and the favorites section display
            }
        });
    } else {
         // Log a warning if the main '.games' section is not found
         console.warn('script.js: Games section element (.games) not found. Game listing event listeners not attached.');
    }

    // Add event listener for the Clear All Favorites button located within the settings menu
    if (clearFavoritesBtn) {
        console.log('script.js: Clear Favorites button found, adding click listener.');
        clearFavoritesBtn.addEventListener('click', () => {
            console.log('script.js: Clear Favorites button clicked.');
            // Prompt the user for confirmation before clearing all favorites
            if (confirm('Are you sure you want to clear all your favorite games? This cannot be undone.')) {
                saveLocalFavorites([]); // Save an empty array to localStorage, effectively clearing all favorites
                renderAllGameLists(); // Re-render all game lists/grids to reflect the change (favorites section will show "no favorites")
                alert('All favorites have been cleared.'); // Inform the user
                 // The settings menu closing logic (click outside, close button click) will handle hiding the menu
            }
        });
    } else {
         // Log a warning if the Clear Favorites button element is not found
         console.warn('script.js: Clear Favorites button (#clearFavoritesBtn) not found.');
    }


    // ========================================
    // GAME WINDOW CONTROLS (Close, Fullscreen, New Tab)
    // ========================================
    // Ensure all game window control elements are found before adding listeners to avoid errors
    if (gameWindowOverlay && closeGameBtn && fullscreenBtn && newTabBtn && gameIframe) {
        console.log('script.js: Game window overlay and controls elements found.');

        // Event listener for the close button on the game overlay
        closeGameBtn.addEventListener('click', () => {
             console.log('script.js: Game window Close button clicked.');
            // If the document is currently in fullscreen mode, exit fullscreen
            if (document.fullscreenElement) {
                 document.exitFullscreen();
            }
            // Remove the 'active' class to trigger any CSS transition for closing the overlay
            gameWindowOverlay.classList.remove('active');
            // Remove the 'game-active' class from the body (e.g., to re-enable scrolling or remove blur)
            body.classList.remove('game-active');

            // Attempt to stop the content currently loaded in the iframe
            try {
                // Check if iframe content document and its default view exist and have a stop method
                if (gameIframe.contentDocument && gameIframe.contentDocument.defaultView && typeof gameIframe.contentDocument.defaultView.stop === 'function') {
                    gameIframe.contentDocument.defaultView.stop();
                }
            } catch (e) {
                // Catch potential security errors that occur when trying to access contentWindow properties for cross-origin content
                console.warn("Could not stop iframe content (possible cross-origin issue):", e);
            }

            // Use a timeout to allow for the closing CSS transition to play before hiding the overlay completely and clearing the iframe source
            setTimeout(() => {
                gameIframe.src = 'about:blank'; // Set the iframe source to 'about:blank' to ensure content is stopped and the iframe is ready for the next game without security issues
                gameWindowOverlay.style.display = 'none'; // Hide the game overlay completely
                if(gameTitleSpan) gameTitleSpan.textContent = 'Game Title'; // Reset the title displayed in the overlay controls
            }, 300); // This delay (300ms) should match or be slightly longer than your CSS transition duration

        });

        // Event listener for the fullscreen button on the game overlay
        fullscreenBtn.addEventListener('click', () => {
             console.log('script.js: Game window Fullscreen button clicked.');
            // Request fullscreen for the game overlay element (or gameIframe if you prefer only the iframe to be fullscreen)
            const el = gameWindowOverlay; // The element to make fullscreen
            // Use the appropriate fullscreen API method based on browser compatibility
            if (el.requestFullscreen) el.requestFullscreen(); // Standard API
            else if (el.mozRequestFullScreen) el.mozRequestFullScreen(); // Firefox specific prefix
            else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen(); // Chrome, Safari, Opera specific prefix
            else if (el.msRequestFullscreen) el.msRequestFullscreen(); // IE/Edge specific prefix
        });

        // Event listener for the Open in New Tab button on the game overlay
        newTabBtn.addEventListener('click', () => {
             console.log('script.js: Game window New Tab button clicked.');
            const currentGameUrl = gameIframe.src; // Get the current source URL of the iframe
            // Check if the iframe has a valid URL loaded (not empty or 'about:blank')
            if (currentGameUrl && currentGameUrl !== 'about:blank' && currentGameUrl !== '') {
                // Open the current iframe URL in a new browser tab
                // Use 'noopener,noreferrer' for security best practices to prevent the new tab from having a reference to the opening window
                const newW = window.open(currentGameUrl, '_blank', 'noopener,noreferrer');
                if (newW) {
                    // If the new window opened successfully, close the game overlay in the current tab
                    closeGameBtn.click(); // Programmatically click the close button
                } else {
                    // Alert the user if the popup was blocked by the browser
                    alert('Popup blocked! Please allow popups for this site to open the game in a new tab.');
                }
            } else {
                console.warn("New Tab button clicked but no valid game URL available in iframe:", currentGameUrl);
                alert('No game is currently loaded in the window to open in a new tab.');
            }
        });

        // Add a global keyboard event listener to close the game window with the Escape key
        document.addEventListener('keydown', (event) => {
            // If the pressed key is Escape, the game window overlay has the 'active' class, AND we are NOT currently in panic key capturing mode
            if (event.key === 'Escape' && gameWindowOverlay.classList.contains('active') && !isPanicKeyCapturing) {
                event.preventDefault(); // Prevent any default browser action for the Escape key (like closing fullscreen)
                 console.log('script.js: Escape key pressed, closing game window overlay via keydown.');
                closeGameBtn.click(); // Programmatically click the close button
            }
        });
    } else {
        // Log a warning if any of the required game window elements are not found
        console.warn('script.js: One or more game window overlay or control elements not found. Game window controls will not function.', {gameWindowOverlay, closeGameBtn, fullscreenBtn, newTabBtn, gameIframe});
    }


    // ========================================
    // SETTINGS MENU (Dark Mode & Panic Button) - CONTINUED
    // ========================================
    // Functions were defined earlier for Dark Mode and Panic Button UI/Logic

    // Function to apply dark mode class to the body
    function applyDarkMode(isDark) {
        if (body) {
            if (isDark) {
                body.classList.add('dark-mode');
            } else {
                body.classList.remove('dark-mode');
            }
        }
        // Ensure the checkbox reflects the current dark mode state
        if (darkModeToggle) {
             darkModeToggle.checked = isDark;
        }
         // console.log('script.js: Dark mode applied:', isDark);
    }

    // Function to load the dark mode preference from localStorage and apply it
    function loadDarkModePreference() {
        const preference = localStorage.getItem('darkMode');
        // Apply dark mode if the preference is specifically 'enabled', otherwise assume disabled (or default)
        applyDarkMode(preference === 'enabled');
         // console.log('script.js: Dark mode preference loaded:', preference);
    }

    // Event listener for the dark mode toggle switch
    if (darkModeToggle) {
         console.log('script.js: Dark mode toggle found, adding change listener.');
        darkModeToggle.addEventListener('change', () => {
             console.log('script.js: Dark mode toggle changed.');
            // Save the user's preference based on the checkbox state
            if (darkModeToggle.checked) {
                localStorage.setItem('darkMode', 'enabled');
            } else {
                localStorage.setItem('darkMode', 'disabled');
            }
            // Apply the new dark mode state immediately
            applyDarkMode(darkModeToggle.checked);
        });
    } else {
         console.warn('script.js: Dark mode toggle (#darkModeToggle) not found. Dark mode feature disabled.');
    }

    // ========================================
    // PANIC BUTTON LOGIC (Key Capture, Save, Global Trigger) - CONTINUED
    // ========================================

    // Updates the display text for the panic key input and status message
    function updatePanicUIDisplay() {
         if (panicKeyInput) {
             // If we are capturing a key, show the temporary selection. Otherwise, show the saved key or prompt for input.
             const keyDisplay = isPanicKeyCapturing && tempSelectedPanicKey === null ? 'Press any key...' :
                                 tempSelectedPanicKey !== null ? `Selected: ${tempSelectedPanicKey}` :
                                 currentPanicKey !== null ? `Saved: ${currentPanicKey}` :
                                 'Press key...';
             panicKeyInput.value = keyDisplay;
             panicKeyInput.placeholder = 'Press a key (`)...'; // Maintain placeholder text

         }
         // Update the URL input only if it's not currently being edited (to avoid overwriting user typing)
         if (panicUrlInput && document.activeElement !== panicUrlInput) {
             panicUrlInput.value = currentPanicUrl;
         }

        if (panicKeyStatus) {
            // Update the status message based on the current panic key state
            if (isPanicKeyCapturing) {
                 panicKeyStatus.textContent = 'Waiting for key press... Press Esc to cancel.';
                 panicKeyStatus.style.color = 'yellow'; // Indicate waiting state
             } else if (tempSelectedPanicKey !== null) {
                 panicKeyStatus.textContent = `Key captured: '${tempSelectedPanicKey}'. Click Save to confirm.`;
                 panicKeyStatus.style.color = 'lightblue'; // Indicate key captured but not saved
             }
            else if (currentPanicKey !== null) {
                 panicKeyStatus.textContent = `Panic key '${currentPanicKey}' is active.`;
                 panicKeyStatus.style.color = ''; // Reset color to default (usually black/white)
            } else {
                 panicKeyStatus.textContent = 'No panic key set. Click input above.';
                 panicKeyStatus.style.color = 'orange'; // Indicate no key set
            }
        }
         // console.log(`script.js: Panic UI updated. tempSelectedKey: ${tempSelectedPanicKey}, currentKey: ${currentPanicKey}, currentUrl: ${currentPanicUrl}, isCapturing: ${isPanicKeyCapturing}`);
    }

    // Loads the saved panic settings (key and URL) from localStorage and updates the UI
    function loadPanicSettingsFromStorage() {
        currentPanicKey = localStorage.getItem('panicKey');
        currentPanicUrl = localStorage.getItem('panicUrl') || 'https://www.google.com'; // Default URL if none saved
        tempSelectedPanicKey = null; // Ensure temporary key is cleared on load

        // Basic validation for the loaded URL to prevent issues
         if (currentPanicUrl && !(currentPanicUrl.startsWith('http://') || currentPanicUrl.startsWith('https://'))) {
             console.warn(`script.js: Loaded invalid panic URL from storage: "${currentPanicUrl}". Resetting to default.`);
             currentPanicUrl = 'https://www.google.com';
             localStorage.setItem('panicUrl', currentPanicUrl); // Save the corrected default back to storage
         }

        updatePanicUIDisplay(); // Update the UI to show the loaded settings
         console.log(`script.js: Panic settings loaded from storage. Key: ${currentPanicKey}, URL: ${currentPanicUrl}`);
    }

    // *** NEW FUNCTION TO COMMIT PANIC SETTINGS ***
    // Saves the current settings from the input fields/temporary state to localStorage
    function commitPanicSettings() {
         console.log('script.js: Committing panic settings...');
         // Ensure capturing mode is off when settings are committed
         isPanicKeyCapturing = false;

         // 1. Handle URL Saving
         let newUrl = panicUrlInput ? panicUrlInput.value.trim() : '';
         // Validate the entered URL: must start with http:// or https://
         const isValidUrl = newUrl && (newUrl.startsWith('http://') || newUrl.startsWith('https://'));

         if (isValidUrl) {
              currentPanicUrl = newUrl; // Update the active URL state
              localStorage.setItem('panicUrl', currentPanicUrl); // Save to localStorage
              console.log(`script.js: Panic URL saved: "${currentPanicUrl}"`);
         } else if (newUrl === '') {
              // If the input is explicitly empty, reset the URL to the default Google URL
              currentPanicUrl = 'https://www.google.com';
              localStorage.setItem('panicUrl', currentPanicUrl);
              console.log(`script.js: Panic URL reset to default: "${currentPanicUrl}"`);
         } else {
              // If an invalid URL was entered and it wasn't empty, inform the user (only if triggered by Save button),
              // but do NOT save the invalid URL. Keep the previously saved or default URL.
              // We don't alert here because this might be called on menu close.
              console.warn(`script.js: Invalid Panic URL format entered: "${newUrl}". Must start with http:// or https://.`);
              // The currentPanicUrl state and localStorage remain unchanged in this case.
         }

         // 2. Handle Key Saving
         // Determine which key to save: use the temporarily selected key (if one was captured during focus)
         // Otherwise, keep the currently saved key if it exists. If neither, the key will be null.
         const keyToSave = tempSelectedPanicKey !== null ? tempSelectedPanicKey : currentPanicKey;

         if (keyToSave) {
             currentPanicKey = keyToSave; // Update the active key state
             localStorage.setItem('panicKey', currentPanicKey); // Save to localStorage
             console.log(`script.js: Panic key saved: "${currentPanicKey}"`);
         } else {
             // If no key was selected or saved, clear the panic key from state and storage
             currentPanicKey = null;
             localStorage.removeItem('panicKey');
             console.log('script.js: Panic key cleared.');
         }

         tempSelectedPanicKey = null; // Clear the temporary selection after attempting save

         // Always update UI to reflect the final state (which might be the old state if validation failed)
         updatePanicUIDisplay();
          console.log('script.js: Panic settings commit finished.');
     }


     // Function to close settings menu and commit panic settings (calls the new function)
    function closeSettingsAndCommitPanicChanges() {
         console.log('script.js: Attempting to close settings and commit changes.');
         // Check if the menu is actually open before attempting to close
         if (settingsMenu && (settingsMenu.style.display === 'block' || settingsMenu.classList.contains('active'))) { // Added check for 'active' class too
            commitPanicSettings(); // *** THIS NOW CALLS THE DEFINED FUNCTION ***
            // Use opacity/visibility or class for smooth transition if desired by CSS
            // settingsMenu.style.display = 'none'; // Hide immediately, or use class transition
            settingsMenu.classList.remove('active'); // Assuming CSS transition uses 'active' class
            // Use display none *after* transition if needed, via a timeout
            settingsMenu.style.display = 'none'; // Hide immediately (simplest approach)

            body.classList.remove('settings-open'); // Remove body class
             console.log('script.js: Settings menu closed and changes committed.');
             // If using CSS transition for opacity, you might need a timeout to set display: 'none'
             // setTimeout(() => { settingsMenu.style.display = 'none'; }, 300); // Adjust time to match CSS transition
         } else {
             console.log('script.js: closeSettingsAndCommitPanicChanges called, but settings menu was not open.');
         }
    }


    // Handle settings menu toggle visibility via the settings button
    if (settingsBtn && settingsMenu) {
         console.log('script.js: Settings button and menu found, adding click listeners.');
        settingsBtn.addEventListener('click', () => {
             console.log('script.js: Settings button clicked.');
            const isCurrentlyHidden = settingsMenu.style.display === 'none' || settingsMenu.style.display === '';

            // Before checking display, make sure it's not hidden by a class transition ending
            if (settingsMenu.classList.contains('active')) {
                 // If active, consider it open even if display is none temporarily during transition
                 // Or just make sure display is block/flex while active
                 settingsMenu.style.display = 'block'; // Ensure it's block while 'active'
            }

            if (isCurrentlyHidden || settingsMenu.style.display === 'none') {
                // When opening the menu:
                tempSelectedPanicKey = null; // Clear any temporary key selection from a previous attempt
                loadPanicSettingsFromStorage(); // Load and display the currently saved settings
                settingsMenu.style.display = 'block'; // Show the menu immediately
                settingsMenu.classList.add('active'); // Add 'active' class for CSS transition
                body.classList.add('settings-open'); // Add class to body (e.g., for backdrop blur)
                 console.log('script.js: Settings menu opened.');
            } else {
                // When clicking the settings button again to close the menu:
                 closeSettingsAndCommitPanicChanges(); // Use the dedicated closing function
            }
        });
    } else {
        console.warn('script.js: Settings button (#settingsBtn) or menu (#settingsMenu) not found. Settings feature disabled.');
    }

    // Handle click on the close button inside the settings menu
    if (closeSettingsBtn && settingsMenu) {
        console.log('script.js: Close settings button found, adding click listener.');
        closeSettingsBtn.addEventListener('click', () => {
             console.log('script.js: Close settings button clicked.');
             closeSettingsAndCommitPanicChanges(); // Use the dedicated closing function
        });
    } else {
         console.warn('script.js: Close settings button (#closeSettingsBtn) not found.');
    }

    // Handle clicks anywhere on the window to close the settings menu if clicking outside it
    window.addEventListener('click', (event) => {
        // Check if the settings menu is open AND if the click target is outside the settings menu AND outside the settings button
        // Use classList.contains('active') or check for display !== 'none' depending on your CSS hiding method
        const isMenuOpen = settingsMenu && (settingsMenu.classList.contains('active') || settingsMenu.style.display !== 'none');

        if (isMenuOpen && settingsBtn && !settingsMenu.contains(event.target) && !settingsBtn.contains(event.target)) {
             console.log('script.js: Click outside settings menu detected.');
             closeSettingsAndCommitPanicChanges(); // Use the dedicated closing function
        }
    });

    // ========================================
    // ABOUT:BLANK FUNCTIONALITY
    // ========================================
    // Event listener for the "Open in about:blank" button in settings
    if (openInAboutBlankBtn) {
         console.log('script.js: Open in about:blank button found, adding click listener.');
        openInAboutBlankBtn.addEventListener('click', () => {
             console.log('script.js: Open in about:blank button clicked.');
            try {
                const currentUrl = window.location.href; // Get the URL of the current page
                // Open a new window with 'about:blank' as the initial URL
                const newWindow = window.open('about:blank', '_blank');

                if (newWindow) {
                    // Write a minimal HTML document into the new window that immediately redirects back to the original URL
                     newWindow.document.write(`
                         <!DOCTYPE html>
                         <html>
                         <head>
                             <title>Loading...</title>
                             <style>
                                 body { background-color: #1a1a1a; color: #fff; font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; overflow: hidden;}
                                 .spinner { border: 4px solid rgba(255, 255, 255, 0.1); border-top: 4px solid #fff; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; }
                                 @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                             </style>
                         </head>
                         <body>
                             <div class="spinner"></div>
                             <script>
                                 // Use replace to load the target URL. This replaces the 'about:blank' entry in the new tab's history.
                                 window.location.replace("${currentUrl}");
                             </script>
                         </body>
                         </html>
                     `);
                    newWindow.document.close(); // Finish writing to the document

                    // Optional: Redirect the current tab to 'about:blank' as well.
                    // This hides the original site URL in the history of the current tab.
                    window.location.replace('about:blank');

                    console.log('script.js: Redirected current tab to about:blank.');

                } else {
                     console.warn('script.js: Popup blocked when trying about:blank.');
                    alert('Pop-up blocked! Please allow pop-ups for this site to use the about:blank feature.');
                }
            } catch (error) {
                console.error("script.js: Error opening in about:blank:", error);
                alert('An error occurred with about:blank functionality.');
            }
            // Ensure settings menu is closed after the action is attempted
            // Call the close function to ensure panic settings are also committed
            closeSettingsAndCommitPanicChanges(); // Use the dedicated closing function
        });
    } else {
        console.warn('script.js: Open in about:blank button (#openInAboutBlankBtn) not found. about:blank feature disabled.');
    }


    // ========================================
    // PANIC BUTTON LOGIC (Key Capture, Save, Global Trigger)
    // ========================================

    // Add the main global keydown listener to the entire document
    document.addEventListener('keydown', handlePanicKeydown);

    // Handles the global keydown event for both capturing a new key (when input is focused) and triggering the panic action
    function handlePanicKeydown(event) {
        // console.log('script.js: Global Keydown:', event.key, 'isCapturing:', isPanicKeyCapturing, 'currentKey:', currentPanicKey, 'activeElement:', document.activeElement);

        // --- Key Capturing Mode ---
        // If the panic key input is focused and our internal capturing flag is true
        // Note: isPanicKeyCapturing is set on input focus and unset on blur or key capture.
        if (isPanicKeyCapturing) {
            // Prevent default browser actions for most keys pressed during capture mode
            // This stops keys like space, enter, or letter keys from affecting the input field directly or the page
            if (event.key !== 'Escape') { // Allow Escape to work normally to cancel
                 event.preventDefault();
                 // console.log('script.js: Preventing default for key capture:', event.key);
            }

            // If the Escape key is pressed during capturing mode
            if (event.key === 'Escape') {
                // User cancelled key selection
                console.log('script.js: Escape pressed during key capture, cancelling.');
                tempSelectedPanicKey = null; // Clear the temporary selection
                 isPanicKeyCapturing = false; // Exit capturing mode
                 // Blur the input to trigger the blur handler which updates the UI
                 if(panicKeyInput) panicKeyInput.blur();
                 event.stopPropagation(); // Prevent the Escape key from potentially closing the game window if open
            }
            // If any other key (except Escape) is pressed and it's not a repeated keypress (key held down)
            else if (!event.repeat) {
                console.log('script.js: Key captured:', event.key);
                tempSelectedPanicKey = event.key; // Store the captured key temporarily
                isPanicKeyCapturing = false; // Exit capturing mode after capturing one key
                // Blur the input to trigger the blur handler which updates the UI
                 if(panicKeyInput) panicKeyInput.blur();
            }
        }
        // --- Global Panic Trigger ---
        // If not in key capturing mode AND a panic key is currently saved AND the pressed key matches the saved panic key AND it's not a repeated keypress
        else if (currentPanicKey !== null && event.key === currentPanicKey && !event.repeat) {
            // Check the currently focused element to see if the user is typing in an input or textarea
             const activeElement = document.activeElement;
             const isTyping = activeElement &&
                 (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA' || activeElement.isContentEditable); // Check contentEditable too

             // Check if the currently focused element is specifically the panic key input field
             const isPanicInput = activeElement === panicKeyInput;

             // Trigger the panic action ONLY under these conditions:
             // 1. The user is not typing in *any* input/textarea/editable element.
             // OR
             // 2. The user *is* typing, but the active element is the panic key input, AND we are *not* in capturing mode (this second part is an edge case safety check, as blur should turn off capturing).
             if (!isTyping || (isPanicInput && !isPanicKeyCapturing)) {
                 event.preventDefault(); // Prevent any default browser action for the panic key press
                 console.log(`script.js: Panic triggered by key: '${event.key}', redirecting to ${currentPanicUrl}`);
                 // Redirect the current window to the saved panic URL, replacing the current history entry
                 window.location.replace(currentPanicUrl);
             }
        }
    }


    // Event listener for when the panic key input field gains focus
    if (panicKeyInput) {
         console.log('script.js: Panic key input found, adding focus/blur listeners.');
        panicKeyInput.addEventListener('focus', () => {
             console.log('script.js: Panic key input focused, starting key capture mode.');
            // When the input element gets focus, activate key capturing mode
            isPanicKeyCapturing = true;
            tempSelectedPanicKey = null; // Clear any previously held temporary selection
            panicKeyInput.value = 'Press any key...'; // Update the input value to prompt the user
            if (panicKeyStatus) panicKeyStatus.textContent = 'Press the key you want to use for panic. Press Esc to cancel.'; // Update the status message
             // Don't call updatePanicUIDisplay() here, the input value is set manually above
        });

         // Event listener for when the panic key input field loses focus
         panicKeyInput.addEventListener('blur', () => {
             console.log('script.js: Panic key input blurred.');
             // Check if capturing mode was active when the input lost focus
             if (isPanicKeyCapturing) {
                 // If blur happened while capturing was active, it means a key wasn't successfully captured by the keydown handler (e.g., user clicked away)
                 isPanicKeyCapturing = false; // Exit capturing mode
                 // If no key was successfully captured during the focus session (tempSelectedPanicKey is still null)
                 if (tempSelectedPanicKey === null) {
                      if (panicKeyStatus) panicKeyStatus.textContent = 'Key selection cancelled.'; // Indicate that the selection was cancelled
                 }
             }
             // Always update the UI to show the saved key or the captured temp key after blur
             // This handles cases where a key was captured (tempSelectedPanicKey is set) or cancelled (tempSelectedPanicKey is null)
             updatePanicUIDisplay();
         });
    } else {
         console.warn('script.js: Panic key input (#panicKeyInput) not found. Panic button key setting disabled.');
    }

    // *** MODIFIED: Event listener for the "Save Panic Settings" button ***
    // This listener now only calls the commit function and gives feedback specific to the button click
    if (savePanicSettingsBtn) {
         console.log('script.js: Save panic settings button found, adding click listener.');
        savePanicSettingsBtn.addEventListener('click', () => {
            console.log('script.js: Save panic settings button clicked, committing settings.');

            // Call the dedicated commit function that handles saving logic
            commitPanicSettings();

            // After attempting to save, provide feedback based on the URL input validation
            // Check the state *after* commitPanicSettings has run
            const newUrl = panicUrlInput ? panicUrlInput.value.trim() : '';
            const isValidUrl = newUrl && (newUrl.startsWith('http://') || newUrl.startsWith('https://'));

            if (isValidUrl || newUrl === '') { // Success if valid or empty (empty resets to default)
                 alert('Panic settings saved!');
            } else {
                 // Alert specifically on click if the input was invalid and not empty
                 // The commit function already logged a warning
                alert("Invalid Panic URL format. Must start with http:// or https://. Using previously saved or default URL.");
            }

            // The menu is NOT closed by the Save button; it's closed by the close button or clicking outside.
        });
    } else {
        console.warn('script.js: Save panic settings button (#savePanicSettingsBtn) not found.');
    }


    // ========================================
    // SCROLL ARROWS FUNCTIONALITY
    // ========================================
    // Sets up horizontal scroll functionality for a given category section
    function setupScrollArrows(categorySection) {
        // Find the button container (.btn-container) and scroll arrows within this specific section element
        const btnContainer = categorySection.querySelector('.btn-container');
        const leftArrow = categorySection.querySelector('.left-arrow');
        const rightArrow = categorySection.querySelector('.right-arrow');

        // Exit the function if any of the required elements are not found within the section
        // This check ensures this function only runs on sections that have the horizontal scrolling setup
        if (!btnContainer || !leftArrow || !rightArrow) {
             // console.log('setupScrollArrows: Skipping setup, container or arrows not found for section.', categorySection.querySelector('h6')?.textContent);
            return; // Stop here if elements are missing
        }
         // console.log('setupScrollArrows: Setting up scroll arrows for section:', categorySection.querySelector('h6')?.textContent);

        // Function to determine and update the visibility of the scroll arrows based on scroll position
        const updateArrows = () => {
             // Use a small tolerance value to handle potential floating-point inaccuracies when comparing scroll positions
            const tolerance = 5; // Pixels tolerance

            // Show the left arrow only if the container is scrolled rightwards by more than the tolerance
            // If scrollLeft is greater than 5px, display the left arrow using flex (as defined in CSS)
            leftArrow.style.display = btnContainer.scrollLeft > tolerance ? 'flex' : 'none';

            // Calculate the maximum possible scroll position to the right
            const maxScrollLeft = btnContainer.scrollWidth - btnContainer.clientWidth;

            // Determine if there is content overflowing to the right that can be scrolled to
             // If the maximum scroll position is less than or equal to the tolerance, there's no meaningful overflow to the right
             if (maxScrollLeft <= tolerance) {
                 // If content fits or barely overflows, hide the right arrow
                 rightArrow.style.display = 'none';
             } else {
                 // If content overflows, show the right arrow UNLESS we are already scrolled to the very end (within the tolerance)
                 // Check if the sum of the current scroll position and the visible width is less than the total scrollable width minus the tolerance
                 rightArrow.style.display = (btnContainer.scrollLeft + btnContainer.clientWidth) < (btnContainer.scrollWidth - tolerance) ? 'flex' : 'none';
             }
             // Verbose logging to debug arrow visibility logic (uncomment if needed)
             // console.log(`updateArrows: Section ${categorySection.querySelector('h6')?.textContent}. ScrollLeft: ${btnContainer.scrollLeft}, ClientWidth: ${btnContainer.clientWidth}, ScrollWidth: ${btnContainer.scrollWidth}, MaxScroll: ${maxScrollLeft}. Left visible: ${leftArrow.style.display !== 'none'}, Right visible: ${rightArrow.style.display !== 'none'}`);
         };

        // Add an event listener to the button container to update arrow visibility whenever the user scrolls horizontally
        btnContainer.addEventListener('scroll', updateArrows);

        // Use a ResizeObserver to automatically update arrow visibility whenever the size of the button container changes
        // This is important for responsive designs or if content is added/removed dynamically after initial load
        const resizeObserver = new ResizeObserver(updateArrows);
        resizeObserver.observe(btnContainer); // Start observing the button container for resize events

        // Perform an initial check for arrow visibility when the script runs
        // Use a small timeout to give the browser a moment to render the content and calculate accurate scrollWidth/clientWidth
        setTimeout(updateArrows, 100); // 100ms delay


        // Add event listeners to the left and right scroll arrow buttons for manual scrolling
        leftArrow.addEventListener('click', () => {
            // Scroll the container to the left by a calculated amount when the left arrow is clicked
            btnContainer.scrollBy({
                left: -Math.max(300, btnContainer.clientWidth * 0.75), // Scroll left by 75% of the container's visible width, but ensure it scrolls at least 300px
                behavior: 'smooth' // Use a smooth scrolling animation
            });
        });

        rightArrow.addEventListener('click', () => {
            // Scroll the container to the right by a calculated amount when the right arrow is clicked
            btnContainer.scrollBy({
                left: Math.max(300, btnContainer.clientWidth * 0.75), // Scroll right by 75% of the container's visible width, but ensure it scrolls at least 300px
                behavior: 'smooth' // Use a smooth scrolling animation
            });
        });
         // console.log('setupScrollArrows: Setup complete for section:', categorySection.querySelector('h6')?.textContent);
    }


    // ========================================
    // INITIALIZATION CODE (Runs when DOMContentLoaded event is fired)
    // ========================================

    // IMPORTANT: This check verifies that the gamesData array has been loaded successfully.
    // gamesData.js MUST be linked and loaded via a <script> tag *before* this script.js in your index.html.
    if (typeof gamesData === 'undefined' || !Array.isArray(gamesData)) {
        // If gamesData is not available or is not an array, log a critical error message
        console.error("FATAL ERROR: gamesData.js not loaded or is invalid. Cannot render games. Please ensure assets/JS/gamesData.js is correctly linked BEFORE assets/JS/script.js in your HTML and that the file contains a 'gamesData' array.");

        // Display an error message directly on the page in the game containers instead of attempting to render games
        const errorHtml = "<p style='color: red; text-align: center; width: 100%;'>Error loading games data. Check console for details and ensure gamesData.js is loaded correctly.</p>";

        // Target the favorite games grid container
        const favoriteGamesGridElement = document.getElementById('favoriteGamesGrid');
         if(favoriteGamesGridElement) {
             favoriteGamesGridElement.innerHTML = errorHtml; // Show the error message in the favorites grid
              const noFavoritesMessageElement = document.getElementById('noFavoritesMessage');
              if(noFavoritesMessageElement) {
                  noFavoritesMessageElement.style.display = 'none'; // Hide the default "no favorites" message
              }
         }

        // Target all horizontal category containers by their common class
        document.querySelectorAll('.game-category .btn-container').forEach(container => {
             container.innerHTML = errorHtml; // Show the error message in each category container
        });

        // Stop the execution of the rest of the script as core data is missing
        return;
    }

     // Log a success message if gamesData is loaded and appears valid
     console.log('script.js: gamesData loaded successfully. Found', gamesData.length, 'games.');

    // Load user preferences (dark mode state and panic button settings) from localStorage
    loadDarkModePreference(); // Loads dark mode preference and applies it
    loadPanicSettingsFromStorage(); // Loads panic settings and updates their display in the settings menu

    // Start the initial rendering process for all visible game sections on the page
    // This includes the favorites grid and all the defined category sections
    renderAllGameLists(); // This function orchestrates rendering favorites and all specific categories

    // Note: The setupScrollArrows function is called *after* each horizontal category container
    // is rendered within the renderCategoryGames function itself. This ensures the arrows are
    // set up only for the containers that are actually populated and need scrolling.


    console.log('script.js: DOMContentLoaded tasks finished.');

}); // END OF DOMContentLoaded event listener