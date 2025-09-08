// Simple Movies Page JavaScript

// Movie data
const movies = [
    {
        id: 1,
        title: "The Dark Knight",
        genre: "Action, Crime, Drama",
        rating: 9.0,
        duration: "152 min",
        poster: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UX1000_.jpg",
        description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
        price: 450
    },
    {
        id: 2,
        title: "Inception",
        genre: "Sci-Fi, Thriller",
        rating: 8.8,
        duration: "148 min",
        poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_FMjpg_UX1000_.jpg",
        description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
        price: 400
    },
    {
        id: 3,
        title: "Interstellar",
        genre: "Sci-Fi, Drama",
        rating: 8.6,
        duration: "169 min",
        poster: "https://m.media-amazon.com/images/M/MV5BYzdjMDAxZGItMjI2My00ODA1LTlkNzItOWFjMDU5ZDJlYWY3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        price: 500
    },
    {
        id: 4,
        title: "Avengers: Endgame",
        genre: "Action, Adventure, Drama",
        rating: 8.4,
        duration: "181 min",
        poster: "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_FMjpg_UX1000_.jpg",
        description: "After the devastating events of Infinity War, the Avengers assemble once more to reverse Thanos' actions and restore balance to the universe.",
        price: 480
    },
    {
        id: 5,
        title: "Parasite",
        genre: "Comedy, Drama, Thriller",
        rating: 8.5,
        duration: "132 min",
        poster: "https://m.media-amazon.com/images/M/MV5BYjk1Y2U4MjQtY2ZiNS00OWQyLWI3MmYtZWUwNmRjYWRiNWNhXkEyXkFqcGc@._V1_.jpg",
        description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
        price: 350
    },
    {
        id: 6,
        title: "Spider-Man: No Way Home",
        genre: "Action, Adventure, Sci-Fi",
        rating: 8.2,
        duration: "148 min",
        poster: "https://m.media-amazon.com/images/M/MV5BODk2OGM5YTgtMDc2MC00NjUwLThlZWMtN2U5ZTY4ZjdmZTUyXkEyXkFqcGc@._V1_.jpg",
        description: "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear.",
        price: 420
    }
];

document.addEventListener('DOMContentLoaded', function() {
    renderMovies();
});

// Check if user is logged in
function isUserLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true' && localStorage.getItem('currentUser');
}

function renderMovies() {
    const moviesGrid = document.getElementById('moviesGrid');
    const isLoggedIn = isUserLoggedIn();
    
    if (movies.length === 0) {
        moviesGrid.innerHTML = `
            <div class="empty-state">
                <h3>No movies available</h3>
                <p>Check back later for new movie releases.</p>
            </div>
        `;
        return;
    }
    
    // Using map to create movie cards
    const movieCards = movies.map(movie => `
        <div class="movie-card" data-movie-id="${movie.id}">
            <img src="${movie.poster}" alt="${movie.title}" class="movie-poster" loading="lazy">
            <div class="movie-info">
                <h3 class="movie-title">${movie.title}</h3>
                <p class="movie-genre">${movie.genre}</p>
                <div class="movie-details">
                    <span class="movie-rating">★ ${movie.rating}</span>
                    <span class="movie-duration">${movie.duration}</span>
                </div>
                <div class="movie-price">₹${movie.price}</div>
                <p class="movie-description">${movie.description}</p>
                ${isLoggedIn ? '<button class="book-btn">Book Now</button>' : ''}
            </div>
        </div>
    `).join('');
    
    moviesGrid.innerHTML = movieCards;
}