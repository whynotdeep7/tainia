// Simple Signup System
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is already logged in
    if (localStorage.getItem('currentUser')) {
        window.location.href = '../index.html';
        return;
    }

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
        if (!fullName) {
            showMessage('nameError', 'Full name is required');
            return;
        }

        if (fullName.length < 2) {
            showMessage('nameError', 'Full name must be at least 2 characters long');
            return;
        }

        if (!/^[a-zA-Z\s]+$/.test(fullName)) {
            showMessage('nameError', 'Full name can only contain letters and spaces');
            return;
        }

        if (!email) {
            showMessage('emailError', 'Email is required');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showMessage('emailError', 'Please enter a valid email address');
            return;
        }

        // Check if email already exists
        const existingUsers = getStoredUsers();
        if (existingUsers.find(user => user.email === email)) {
            showMessage('emailError', 'An account with this email already exists');
            return;
        }

        if (!password) {
            showMessage('passwordError', 'Password is required');
            return;
        }

        if (password.length < 6) {
            showMessage('passwordError', 'Password must be at least 6 characters long');
            return;
        }

        if (!confirmPassword) {
            showMessage('confirmPasswordError', 'Please confirm your password');
            return;
        }

        if (password !== confirmPassword) {
            showMessage('confirmPasswordError', 'Passwords do not match');
            return;
        }

        // Create new user
        const newUser = {
            fullName: fullName,
            email: email,
            password: password,
            registrationDate: new Date().toISOString()
        };

        // Save user to local storage
        saveUser(newUser);

        // Show success message and redirect
        showMessage('success', 'Account created successfully! Redirecting to login...');
        
        // Clear form
        form.reset();

        // Redirect to login page after 2 seconds
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    }

    function saveUser(user) {
        const existingUsers = getStoredUsers();
        existingUsers.push(user);
        localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));
    }

    function getStoredUsers() {
        const users = localStorage.getItem('registeredUsers');
        return users ? JSON.parse(users) : [];
    }

    function showMessage(elementId, message) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = message;
            element.classList.add('show');
        }
    }
});