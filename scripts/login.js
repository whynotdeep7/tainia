// Simple Login System
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is already logged in
    if (localStorage.getItem('currentUser')) {
        window.location.href = '../index.html';
        return;
    }

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
        if (!email) {
            showMessage('emailError', 'Email is required');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showMessage('emailError', 'Please enter a valid email address');
            return;
        }

        if (!password) {
            showMessage('passwordError', 'Password is required');
            return;
        }

        // Check if user exists in local storage
        const users = getStoredUsers();
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            // Login successful
            loginSuccess(user);
        } else {
            // Check if user exists but wrong password
            const userExists = users.find(u => u.email === email);
            if (userExists) {
                showMessage('passwordError', 'Incorrect password');
            } else {
                showMessage('emailError', 'No account found with this email');
            }
        }
    }

    function loginSuccess(user) {
        // Store current user session
        localStorage.setItem('currentUser', JSON.stringify({
            email: user.email,
            fullName: user.fullName,
            loginTime: new Date().toISOString()
        }));

        // Show success message
        showMessage('success', 'Login successful! Redirecting...');

        // Redirect to homepage after 2 seconds
        setTimeout(() => {
            window.location.href = '../index.html';
        }, 2000);
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