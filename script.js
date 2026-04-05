// Affirmations collection
const affirmations = [
    "I am strong, capable, and worthy of all good things.",
    "My voice matters and my opinions are valuable.",
    "I embrace my unique journey and celebrate my progress.",
    "I am enough exactly as I am right now.",
    "I trust myself to make the right decisions for my life.",
    "My potential is limitless and I am constantly growing.",
    "I deserve respect, love, and kindness.",
    "I am the author of my own story.",
    "My dreams are valid and achievable.",
    "I radiate confidence and positive energy.",
    "I am proud of how far I've come.",
    "I choose to focus on what I can control.",
    "My self-worth is not determined by others' opinions.",
    "I am resilient and can overcome any challenge.",
    "I celebrate my strengths and accept my imperfections.",
    "I am creating the life I want to live.",
    "My happiness is a priority.",
    "I trust the timing of my life.",
    "I am worthy of success and abundance.",
    "I choose to see the good in myself and others."
];

let currentAffirmation = "";
let favorites = [];

// Initialize app
function init() {
    loadFavorites();
    displayRandomAffirmation();
    renderFavorites();
}

// Display random affirmation
function displayRandomAffirmation() {
    const randomIndex = Math.floor(Math.random() * affirmations.length);
    currentAffirmation = affirmations[randomIndex];
    document.getElementById("affirmationText").textContent = currentAffirmation;
}

// Save to favorites
function saveFavorite() {
    if (!currentAffirmation) return;
    
    // Check for duplicates
    if (favorites.includes(currentAffirmation)) {
        alert("This affirmation is already in your favorites!");
        return;
    }
    
    favorites.push(currentAffirmation);
    saveFavoritesToStorage();
    renderFavorites();
}

// Remove from favorites
function removeFavorite(affirmation) {
    favorites = favorites.filter(fav => fav !== affirmation);
    saveFavoritesToStorage();
    renderFavorites();
}

// Render favorites list
function renderFavorites() {
    const favoritesList = document.getElementById("favoritesList");
    
    if (favorites.length === 0) {
        favoritesList.innerHTML = '<p class="empty-message">No favorites yet. Save your first affirmation!</p>';
        return;
    }
    
    favoritesList.innerHTML = favorites.map(fav => `
        <div class="favorite-item">
            <p class="favorite-text">${fav}</p>
            <button class="remove-btn" onclick="removeFavorite('${fav.replace(/'/g, "\\'")}')">Remove</button>
        </div>
    `).join("");
}

// LocalStorage functions
function saveFavoritesToStorage() {
    localStorage.setItem("sheaffirm-favorites", JSON.stringify(favorites));
}

function loadFavorites() {
    const stored = localStorage.getItem("sheaffirm-favorites");
    if (stored) {
        favorites = JSON.parse(stored);
    }
}

// Event listeners
document.getElementById("newAffirmationBtn").addEventListener("click", displayRandomAffirmation);
document.getElementById("saveFavoriteBtn").addEventListener("click", saveFavorite);

// Initialize on page load
init();
