document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Reset error messages
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const termsChecked = document.getElementById('terms').checked;
    
    // Validation flags
    let isValid = true;
    
    // Name validation
    if (name === '') {
        document.getElementById('nameError').textContent = 'Full name is required';
        isValid = false;
    }
    
    // Email validation
    if (email === '') {
        document.getElementById('emailError').textContent = 'Email is required';
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email';
        isValid = false;
    }
    
    // Password validation
    if (password === '') {
        document.getElementById('passwordError').textContent = 'Password is required';
        isValid = false;
    } else if (password.length < 8) {
        document.getElementById('passwordError').textContent = 'Password must be at least 8 characters';
        isValid = false;
    }
    
    // Confirm password validation
    if (confirmPassword === '') {
        document.getElementById('confirmPasswordError').textContent = 'Please confirm your password';
        isValid = false;
    } else if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').textContent = 'Passwords do not match';
        isValid = false;
    }
    
    // Terms validation
    if (!termsChecked) {
        document.getElementById('termsError').textContent = 'You must accept the terms';
        isValid = false;
    }
    
    // If all validations pass
    if (isValid) {
        // Here you would typically send the data to a server
        alert('Sign up successful! (This is a demo)');
        // Reset form
        this.reset();
    }
});

// Add real-time validation for better UX
document.getElementById('name').addEventListener('input', function() {
    if (this.value.trim() !== '') {
        document.getElementById('nameError').textContent = '';
    }
});

document.getElementById('email').addEventListener('input', function() {
    if (this.value.trim() !== '') {
        document.getElementById('emailError').textContent = '';
    }
});

document.getElementById('password').addEventListener('input', function() {
    if (this.value.length >= 8) {
        document.getElementById('passwordError').textContent = '';
    }
});

document.getElementById('confirmPassword').addEventListener('input', function() {
    const password = document.getElementById('password').value;
    if (this.value === password) {
        document.getElementById('confirmPasswordError').textContent = '';
    }
});

document.getElementById('terms').addEventListener('change', function() {
    if (this.checked) {
        document.getElementById('termsError').textContent = '';
    }
});