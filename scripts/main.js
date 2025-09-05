// Main JavaScript file for Tainía Movie Booking App

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));
    }
});

// Form validation utilities
const FormValidator = {
    // Email validation
    validateEmail: function(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    // Password strength validation
    validatePassword: function(password) {
        return {
            isValid: password.length >= 8,
            hasUpperCase: /[A-Z]/.test(password),
            hasLowerCase: /[a-z]/.test(password),
            hasNumbers: /\d/.test(password),
            hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
        };
    },

    // Name validation
    validateName: function(name) {
        return name.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(name.trim());
    },

    // Show error message
    showError: function(inputElement, message) {
        inputElement.classList.add('error');
        const errorElement = inputElement.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
    },

    // Clear error message
    clearError: function(inputElement) {
        inputElement.classList.remove('error');
        const errorElement = inputElement.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.classList.remove('show');
        }
    }
};

// Local storage utilities
const Storage = {
    // Save user data (in a real app, this would be encrypted)
    saveUser: function(userData) {
        localStorage.setItem('currentUser', JSON.stringify(userData));
    },

    // Get current user
    getCurrentUser: function() {
        const user = localStorage.getItem('currentUser');
        return user ? JSON.parse(user) : null;
    },

    // Check if user is logged in
    isLoggedIn: function() {
        return this.getCurrentUser() !== null;
    },

    // Logout user
    logout: function() {
        localStorage.removeItem('currentUser');
    },

    // Booking functionality removed for simplified version
};

// Movie data (in a real app, this would come from an API)
const MovieData = {
    movies: [
        {
            id: 1,
            title: "The Dark Knight",
            genre: "Action, Crime, Drama",
            rating: 9.0,
            duration: "152 min",
            poster: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UX1000_.jpg",
            description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
            price: 450,
            // Showtimes removed for simplified version
        },
        {
            id: 2,
            title: "Inception",
            genre: "Sci-Fi, Thriller",
            rating: 8.8,
            duration: "148 min",
            poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_FMjpg_UX1000_.jpg",
            description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
            price: 400,
            // Showtimes removed for simplified version
        },
        {
            id: 3,
            title: "Interstellar",
            genre: "Sci-Fi, Drama",
            rating: 8.6,
            duration: "169 min",
            poster: "https://m.media-amazon.com/images/M/MV5BYzdjMDAxZGItMjI2My00ODA1LTlkNzItOWFjMDU5ZDJlYWY3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
            description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
            price: 500,
            // Showtimes removed for simplified version
        },
        {
            id: 4,
            title: "Avengers: Endgame",
            genre: "Action, Adventure, Drama",
            rating: 8.4,
            duration: "181 min",
            poster: "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_FMjpg_UX1000_.jpg",
            description: "After the devastating events of Infinity War, the Avengers assemble once more to reverse Thanos' actions and restore balance to the universe.",
            price: 480,
            // Showtimes removed for simplified version
        },
        {
            id: 5,
            title: "Parasite",
            genre: "Comedy, Drama, Thriller",
            rating: 8.5,
            duration: "132 min",
            poster: "https://m.media-amazon.com/images/M/MV5BYjk1Y2U4MjQtY2ZiNS00OWQyLWI3MmYtZWUwNmRjYWRiNWNhXkEyXkFqcGc@._V1_.jpg",
            description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
            price: 350,
            // Showtimes removed for simplified version
        },
        {
            id: 6,
            title: "Spider-Man: No Way Home",
            genre: "Action, Adventure, Sci-Fi",
            rating: 8.2,
            duration: "148 min",
            poster: "https://m.media-amazon.com/images/M/MV5BODk2OGM5YTgtMDc2MC00NjUwLThlZWMtN2U5ZTY4ZjdmZTUyXkEyXkFqcGc@._V1_.jpg",
            description: "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear.",
            price: 420,
            // Showtimes removed for simplified version
        }
    ],

    getMovieById: function(id) {
        return this.movies.find(movie => movie.id === parseInt(id));
    },

    getAllMovies: function() {
        return this.movies;
    }
};

// Booking functionality removed for simplified version

// Animation utilities removed for simplified version

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { FormValidator, Storage, MovieData };
}