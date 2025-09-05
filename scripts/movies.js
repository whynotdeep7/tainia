// Simple Movies Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    renderMovies();
});

function renderMovies() {
    const movies = MovieData.getAllMovies();
    renderMoviesGrid(movies);
}

function renderMoviesGrid(movies) {
    const moviesGrid = document.getElementById('moviesGrid');
    
    if (movies.length === 0) {
        moviesGrid.innerHTML = `
            <div class="empty-state">
                <h3>No movies available</h3>
                <p>Check back later for new movie releases.</p>
            </div>
        `;
        return;
    }
    
    moviesGrid.innerHTML = movies.map(movie => createMovieCard(movie)).join('');
}

function createMovieCard(movie) {
    return `
        <div class="movie-card" data-movie-id="${movie.id}">
            <img src="${movie.poster}" alt="${movie.title}" class="movie-poster" loading="lazy">
            <div class="movie-info">
                <h3 class="movie-title">${movie.title}</h3>
                <p class="movie-genre">${movie.genre}</p>
                <div class="movie-details">
                    <span class="movie-rating">${movie.rating}</span>
                    <span class="movie-duration">${movie.duration}</span>
                </div>
                <div class="movie-price">₹${movie.price}</div>
                <div class="movie-description">${movie.description || 'A great movie to watch!'}</div>
            </div>
        </div>
    `;
}