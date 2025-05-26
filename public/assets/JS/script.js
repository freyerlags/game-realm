// assets/js/script.js

document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;

    // --- Global Elements (likely on most pages) ---
    const settingsBtn = document.getElementById('settingsBtn');
    const settingsMenu = document.getElementById('settingsMenu');
    const closeSettingsBtn = document.getElementById('closeSettingsBtn');
    const darkModeToggle = document.getElementById('darkModeToggle');

    // --- Settings Menu: about:blank and Panic Button Elements ---
    const openInAboutBlankBtn = document.getElementById('openInAboutBlankBtn');
    const panicKeyInput = document.getElementById('panicKeyInput');
    const panicUrlInput = document.getElementById('panicUrlInput');
    const panicKeyStatus = document.getElementById('panicKeyStatus');

    // --- Game Specific Elements (may not be on all pages) ---
    const favoriteGamesGrid = document.getElementById('favoriteGamesGrid');
    const allGamesGrid = document.getElementById('allGamesGrid');
    const noFavoritesMessage = document.getElementById('noFavoritesMessage');
    const gameWindowOverlay = document.getElementById('gameWindowOverlay');
    const gameIframe = document.getElementById('gameIframe');
    const gameTitleSpan = document.getElementById('gameTitle');
    const closeGameBtn = document.getElementById('closeBtn'); // HTML ID is 'closeBtn' for game overlay
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const newTabBtn = document.getElementById('newTabBtn');
    const clearFavoritesBtn = document.getElementById('clearFavoritesBtn');

    // --- State Variables ---
    let currentPanicKey = null;       // The actually active/saved panic key
    let currentPanicUrl = 'https://www.google.com'; // The actually active/saved panic URL
    let isPanicKeyGloballyActive = false;
    let panicKeyActivationTimeoutId = null;
    let tempSelectedPanicKey = null; // Key selected during focus, BEFORE it's committed by closing menu
    // `favoriteGames` array is managed locally within game listing block if it exists

    // ========================================
    // SETTINGS MENU & DARK MODE
    // ========================================

    function applyDarkMode(isDark) {
        if (isDark) {
            body.classList.add('dark-mode');
            if (darkModeToggle) darkModeToggle.checked = true;
        } else {
            body.classList.remove('dark-mode');
            if (darkModeToggle) darkModeToggle.checked = false;
        }
    }

    function loadDarkModePreference() {
        const preference = localStorage.getItem('darkMode');
        applyDarkMode(preference === 'enabled');
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', () => {
            if (darkModeToggle.checked) {
                body.classList.add('dark-mode');
                localStorage.setItem('darkMode', 'enabled');
            } else {
                body.classList.remove('dark-mode');
                localStorage.setItem('darkMode', 'disabled');
            }
        });
    }
    
    function closeSettingsAndCommitPanicChanges() {
        if (settingsMenu && settingsMenu.style.display === 'block') {
            commitPanicSettings(); 
            settingsMenu.style.display = 'none';
            body.classList.remove('settings-open');
            tempSelectedPanicKey = null; 
            loadPanicSettingsFromStorage(); 
        }
    }

    if (settingsBtn && settingsMenu) {
        settingsBtn.addEventListener('click', () => {
            const isCurrentlyHidden = settingsMenu.style.display === 'none' || settingsMenu.style.display === '';
            if (isCurrentlyHidden) {
                tempSelectedPanicKey = null; 
                loadPanicSettingsFromStorage(); 
                settingsMenu.style.display = 'block';
                body.classList.add('settings-open');
            } else {
                closeSettingsAndCommitPanicChanges();
            }
        });
    }

    if (closeSettingsBtn && settingsMenu) {
        closeSettingsBtn.addEventListener('click', () => {
            closeSettingsAndCommitPanicChanges();
        });
    }

    window.addEventListener('click', (event) => {
        if (settingsMenu && settingsMenu.style.display === 'block' &&
            settingsBtn && !settingsMenu.contains(event.target) &&
            !settingsBtn.contains(event.target)) {
            closeSettingsAndCommitPanicChanges();
        }
    });

    // ========================================
    // ABOUT:BLANK
    // ========================================
    if (openInAboutBlankBtn && settingsMenu) {
        openInAboutBlankBtn.addEventListener('click', () => {
            try {
                const pageHTML = document.documentElement.outerHTML;
                const newWindow = window.open('about:blank', '_blank');

                if (newWindow) {
                    newWindow.document.write(pageHTML);
                    newWindow.document.close();
                    window.location.href = 'about:blank';
                } else {
                    alert('Pop-up blocked! Please allow pop-ups for this site.');
                }
            } catch (error) {
                console.error("Error opening in about:blank:", error);
                alert('An error occurred with about:blank.');
            }
            settingsMenu.style.display = 'none'; 
            body.classList.remove('settings-open');
            tempSelectedPanicKey = null; 
        });
    }

    // ========================================
    // PANIC BUTTON - AUTO SAVE ON MENU CLOSE - REFINED
    // ========================================

    function updatePanicUIDisplay() {
        const displayKey = tempSelectedPanicKey !== null ? tempSelectedPanicKey : currentPanicKey;
        if (panicKeyInput) {
            if (displayKey) {
                panicKeyInput.value = `Key: ${displayKey}`;
            } else {
                panicKeyInput.value = '';
                panicKeyInput.placeholder = 'Press a key (e.g., `)';
            }
        }
        if (panicUrlInput && document.activeElement !== panicUrlInput) {
            panicUrlInput.value = currentPanicUrl;
        }
    }

    function loadPanicSettingsFromStorage() {
        currentPanicKey = localStorage.getItem('panicKey');
        currentPanicUrl = localStorage.getItem('panicUrl') || 'https://www.google.com';

        if (currentPanicKey) {
            isPanicKeyGloballyActive = true;
            if (panicKeyStatus) panicKeyStatus.textContent = `Panic key '${currentPanicKey}' is active.`;
        } else {
            isPanicKeyGloballyActive = false;
            if (panicKeyStatus) panicKeyStatus.textContent = 'No panic key set. Click input above.';
        }
        updatePanicUIDisplay();
    }

    if (panicKeyInput) {
        panicKeyInput.addEventListener('focus', () => {
            isPanicKeyGloballyActive = false; 
            
            if (panicKeyActivationTimeoutId) {
                clearTimeout(panicKeyActivationTimeoutId);
                panicKeyActivationTimeoutId = null;
            }

            panicKeyInput.value = 'Press a key...';
            panicKeyInput.classList.add('key-capture-active');
            if (panicKeyStatus) panicKeyStatus.textContent = 'Waiting for key press... Press Esc to cancel.';

            const keydownHandler = (event) => {
                event.preventDefault();
                if (event.key === 'Escape') {
                    tempSelectedPanicKey = null; 
                    if (panicKeyStatus) panicKeyStatus.textContent = 'Key selection cancelled.';
                } else {
                    tempSelectedPanicKey = event.key; 
                    if (panicKeyStatus) panicKeyStatus.textContent = `Selected key: ${tempSelectedPanicKey}. Close settings to save.`;
                }
                updatePanicUIDisplay(); 
                panicKeyInput.classList.remove('key-capture-active');
                panicKeyInput.blur();
            };
            document.addEventListener('keydown', keydownHandler, { capture: true, once: true });
        });
    }

    function commitPanicSettings() {
        if (!panicUrlInput || !panicKeyInput) return;

        if (panicKeyActivationTimeoutId) {
            clearTimeout(panicKeyActivationTimeoutId);
            panicKeyActivationTimeoutId = null;
        }

        const newUrlFromInput = panicUrlInput.value.trim();
        let urlToSave = currentPanicUrl; 

        if (newUrlFromInput && (newUrlFromInput.startsWith('http://') || newUrlFromInput.startsWith('https://'))) {
            urlToSave = newUrlFromInput;
        } else if (newUrlFromInput === '') { 
            urlToSave = 'https://www.google.com'; 
        } else if (newUrlFromInput !== currentPanicUrl) { 
            alert("Panic URL is invalid and was not saved. It must start with http:// or https://. Reverting to previous URL.");
        }
        currentPanicUrl = urlToSave; 
        localStorage.setItem('panicUrl', currentPanicUrl);

        const keyToCommit = tempSelectedPanicKey !== null ? tempSelectedPanicKey : currentPanicKey;

        if (keyToCommit) {
            currentPanicKey = keyToCommit; 
            localStorage.setItem('panicKey', currentPanicKey);
            isPanicKeyGloballyActive = false; 
            if (panicKeyStatus) {
                panicKeyStatus.textContent = `Panic key '${currentPanicKey}' will activate in 2 seconds.`;
            }
            
            panicKeyActivationTimeoutId = setTimeout(() => {
                isPanicKeyGloballyActive = true;
                if (panicKeyStatus) {
                    if (currentPanicKey === localStorage.getItem('panicKey')) {
                        panicKeyStatus.textContent = `Panic key '${currentPanicKey}' is NOW ACTIVE.`;
                    } else {
                        panicKeyStatus.textContent = `Panic key settings changed again.`;
                    }
                }
                panicKeyActivationTimeoutId = null;
            }, 2000);

        } else { 
            currentPanicKey = null;
            localStorage.removeItem('panicKey');
            isPanicKeyGloballyActive = false;
            if (panicKeyStatus) panicKeyStatus.textContent = 'Panic key cleared.';
        }
    }

    document.addEventListener('keydown', (event) => {
        if (isPanicKeyGloballyActive && currentPanicKey && event.key === currentPanicKey) {
            if (document.activeElement && 
                (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') &&
                !(panicKeyInput && panicKeyInput.classList.contains('key-capture-active'))) {
                return;
            }
            if (settingsMenu && settingsMenu.style.display === 'block' && settingsMenu.contains(document.activeElement)) {
                return; 
            }
            window.location.href = currentPanicUrl;
        }
    });

    // ========================================
    // GAME LISTING & FAVORITES (Only if game grids exist)
    // ========================================
    if (favoriteGamesGrid && allGamesGrid && noFavoritesMessage && typeof gamesData !== 'undefined') {

        function loadLocalFavorites() {
            try {
                const favs = JSON.parse(localStorage.getItem('favGames'));
                return Array.isArray(favs) ? favs : [];
            } catch (e) { 
                // console.error("Error loading favGames from localStorage:", e); // Optional: for debugging
                return []; 
            }
        }

        function saveLocalFavorites(favs) {
            try {
                localStorage.setItem('favGames', JSON.stringify(favs));
            } catch (e) { 
                console.error("Error saving favGames to localStorage:", e); 
            }
        }

        function updateHeartIcon(heartIconElement, isFavorited) {
            if (heartIconElement) {
                isFavorited ? heartIconElement.classList.add('favorited') : heartIconElement.classList.remove('favorited');
            }
        }

        function updateNoFavoritesMessageDisplay() {
            if (noFavoritesMessage) {
                 const localFavs = loadLocalFavorites();
                 noFavoritesMessage.style.display = localFavs.length === 0 ? 'block' : 'none';
            }
        }

        function createGameCardHTML(game, isFavorited = false, index = 0) {
            const animationDelay = `${index * 0.05}s`;
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

        function renderGameGrids() {
            const localFavs = loadLocalFavorites();
            // This favoriteGames is local to this function's scope for rendering purposes
            const currentFavoriteGames = gamesData.filter(game => localFavs.includes(game.id));
            const nonFavoritedGames = gamesData.filter(game => !localFavs.includes(game.id));

            favoriteGamesGrid.innerHTML = '';
            allGamesGrid.innerHTML = '';

            if (currentFavoriteGames.length > 0) {
                currentFavoriteGames.forEach((game, index) => {
                    favoriteGamesGrid.innerHTML += createGameCardHTML(game, true, index);
                });
            }
            updateNoFavoritesMessageDisplay();

            nonFavoritedGames.forEach((game, index) => {
                allGamesGrid.innerHTML += createGameCardHTML(game, false, index);
            });
        }

        if (clearFavoritesBtn) {
            clearFavoritesBtn.addEventListener('click', () => {
                if (confirm('Are you sure you want to clear all your favorite games?')) {
                    saveLocalFavorites([]); 
                    renderGameGrids();   
                    alert('All favorites have been cleared.');
                    // Settings menu will close via its own mechanics if user clicks close or outside
                }
            });
        }

        const gamesSection = document.querySelector('.games');
        if (gamesSection) {
            gamesSection.addEventListener('click', (event) => {
                const target = event.target;
                const playButton = target.closest('.play-button');
                const favoriteButton = target.closest('.favorite-button');

                if (playButton && gameWindowOverlay && gameIframe && gameTitleSpan) {
                    event.preventDefault();
                    const gamePath = playButton.getAttribute('data-path');
                    const gameCard = playButton.closest('.game-card');
                    const gameName = gameCard ? gameCard.querySelector('h4').textContent : 'Game';

                    if (gamePath) {
                        gameWindowOverlay.style.display = 'flex';
                        gameIframe.src = gamePath;
                        gameTitleSpan.textContent = gameName;
                        gameWindowOverlay.classList.add('active');
                        body.classList.add('game-active');
                    } else {
                        alert("Game not available.");
                    }
                    return;
                }

                if (favoriteButton) {
                    event.stopPropagation();
                    const gameCard = favoriteButton.closest('.game-card');
                    const gameId = gameCard ? gameCard.getAttribute('data-game-id') : null;
                    const heartIcon = favoriteButton.querySelector('.heart-icon');

                    if (!gameId || !heartIcon) return;

                    let localFavs = loadLocalFavorites();
                    const isCurrentlyFavorited = heartIcon.classList.contains('favorited');

                    if (isCurrentlyFavorited) {
                        localFavs = localFavs.filter(id => id !== gameId);
                    } else {
                        if (!localFavs.includes(gameId)) {
                            localFavs.push(gameId);
                        }
                    }
                    saveLocalFavorites(localFavs);
                    renderGameGrids();
                }
            });
        }
        renderGameGrids(); // Initial render for game pages
    } 

    // ========================================
    // GAME WINDOW CONTROLS 
    // ========================================
    if (gameWindowOverlay && closeGameBtn && fullscreenBtn && newTabBtn && gameIframe) {
        closeGameBtn.addEventListener('click', () => {
            gameWindowOverlay.classList.remove('active');
            body.classList.remove('game-active');
            try {
                if (gameIframe.contentWindow) gameIframe.contentWindow.stop();
            } catch (e) { /* ignore error */ }
            gameIframe.src = 'about:blank';
            setTimeout(() => {
                gameWindowOverlay.style.display = 'none';
                if(gameTitleSpan) gameTitleSpan.textContent = 'Game Title';
            }, 300); 
            if (document.fullscreenElement) document.exitFullscreen();
        });

        fullscreenBtn.addEventListener('click', () => {
            const el = gameWindowOverlay;
            if (el.requestFullscreen) el.requestFullscreen();
            else if (el.mozRequestFullScreen) el.mozRequestFullScreen();
            else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
            else if (el.msRequestFullscreen) el.msRequestFullscreen();
        });

        newTabBtn.addEventListener('click', () => {
            const currentGameUrl = gameIframe.src;
            if (currentGameUrl && currentGameUrl !== 'about:blank' && currentGameUrl !== '') {
                const newW = window.open(currentGameUrl, '_blank', 'noopener,noreferrer');
                if (newW) {
                    closeGameBtn.click(); // Close the overlay in current tab
                } else {
                    alert('Popup blocked! Please allow popups for this site.');
                }
            } else {
                alert('No game is currently loaded.');
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && gameWindowOverlay.classList.contains('active')) {
                closeGameBtn.click();
            }
        });
    }

    // ========================================
    // INITIAL LOADS
    // ========================================
    loadDarkModePreference();
    loadPanicSettingsFromStorage(); // This loads and sets initial active state & UI for panic button

}); // END OF DOMContentLoaded