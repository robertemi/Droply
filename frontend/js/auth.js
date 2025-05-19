// auth.js
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            // Basic validation - actual validation and submission would involve backend
            const email = loginForm.email.value;
            const password = loginForm.password.value;

            if (email && password) {
                alert('Login form submitted (placeholder).');
                // Here you would typically send data to a backend API
                // For now, redirect to dashboard as if login was successful
                // This is a placeholder and needs actual auth logic
                localStorage.setItem('userRole', 'company'); // Mock login
                window.location.href = 'dashboard.html';
            } else {
                alert('Please fill in all fields.');
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', (event) => {
            event.preventDefault();
            // Basic validation
            const username = registerForm.username.value;
            const email = registerForm.email.value;
            const password = registerForm.password.value;
            const confirmPassword = registerForm.confirmPassword.value;
            const userType = registerForm.userType.value;

            if (!username || !email || !password || !confirmPassword || !userType) {
                alert('Please fill in all fields.');
                return;
            }

            if (password !== confirmPassword) {
                alert('Passwords do not match.');
                return;
            }

            alert(`Registration form submitted (placeholder) for ${userType}.`);
            // Here you would typically send data to a backend API
            // For now, redirect to login page
            window.location.href = 'login.html';
        });
    }
});
