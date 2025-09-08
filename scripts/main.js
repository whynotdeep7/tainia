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
    
    // Hide login/signup buttons if user is logged in
    hideAuthButtonsIfLoggedIn();
});

// Check if user is logged in
function isUserLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true' && localStorage.getItem('currentUser');
}

// Hide login and signup buttons if user is logged in
function hideAuthButtonsIfLoggedIn() {
    if (isUserLoggedIn()) {
        // Find and hide login and signup nav items
        const loginLink = document.querySelector('a[href*="login.html"]');
        const signupLink = document.querySelector('a[href*="signup.html"]');
        
        if (loginLink) {
            loginLink.parentElement.style.display = 'none';
        }
        if (signupLink) {
            signupLink.parentElement.style.display = 'none';
        }
    }
}