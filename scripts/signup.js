document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signupForm');
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');

    form.addEventListener('submit', handleSignup);

    function handleSignup(e) {
        e.preventDefault();

        const fullName = fullNameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        
        clearErrors();

     
        if (!fullName || !email || !password || !confirmPassword) {
            showMessage('nameError', 'Please fill all fields.');
            return;
        }

        
        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;

        if (!passwordRegex.test(password)) {
            showMessage('passwordError', 'Password must contain atleast 6 char, 1 number and 1 special char.');
            return;
        }

        if (password !== confirmPassword) {
            showMessage('confirmPasswordError', 'Passwords do not match.');
            return;
        }

        if (localStorage.getItem(email) !== null) {
            showMessage('emailError', 'User already exists. Please login.');
            return;
        }

        localStorage.setItem(email, password);
        showMessage('success', 'Signup successful! Redirecting to login...');
        
        form.reset();
        
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

    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(el => {
            el.textContent = '';
            el.classList.remove('show');
        });
    }
});