// Simple Login System
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    // Handle form submission
    form.addEventListener('submit', handleLogin);

    function handleLogin(e) {
        e.preventDefault();

        // Get form values
        const email = emailInput.value.trim();
        const password = passwordInput.value;

        // Simple validation
        if (!email || !password) {
            showMessage('emailError', 'Please fill all fields.');
            return;
        }

        // Check if user exists in localStorage
        let storedPassword = localStorage.getItem(email);

        if (storedPassword === null) {
            showMessage('emailError', 'User not found. Please signup.');
        } else if (storedPassword === password) {
            // Set logged-in status
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUser', email);
            showMessage('success', 'Login successful! Redirecting to movies...');
            // Clear form
            form.reset();
            // Redirect to movies page after 2 seconds
            setTimeout(() => {
                window.location.href = 'movies.html';
            }, 2000);
        } else {
            showMessage('passwordError', 'Incorrect password.');
        }
    }

    function showMessage(elementId, message) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = message;
            element.classList.add('show');
        }
    }
});