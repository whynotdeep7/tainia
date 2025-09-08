// Simple Signup System
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signupForm');
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');

    // Handle form submission
    form.addEventListener('submit', handleSignup);

    function handleSignup(e) {
        e.preventDefault();

        // Get form values
        const fullName = fullNameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        // Simple validation
        if (!fullName || !email || !password || !confirmPassword) {
            showMessage('nameError', 'Please fill all fields.');
            return;
        }

        if (password !== confirmPassword) {
            showMessage('confirmPasswordError', 'Passwords do not match.');
            return;
        }

        // Check if user already exists
        if (localStorage.getItem(email) !== null) {
            showMessage('emailError', 'User already exists. Please login.');
            return;
        }

        // Store user in localStorage (simple example)
        localStorage.setItem(email, password);
        showMessage('success', 'Signup successful! Redirecting to login...');
        
        // Clear form
        form.reset();
        
        // Redirect to login page after 2 seconds
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    }

    function showMessage(elementId, message) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = message;
            element.classList.add('show');
        }
    }
});