/**
 * Authentication and user role management
 * Handles login/logout and user role checks
 */

  /**
   * Use for requiring login before accesing the dashboard
   */

// Handle logout functionality
function setupLogout() {
    const logoutButtons = document.querySelectorAll('.logout-btn'); // This class might be on dashboard logout
    
    logoutButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('userRole');
            localStorage.removeItem('isLoggedIn');
            // localStorage.removeItem('selectedUserType'); // Redundant if using userRole
            window.location.href = '../pages/login.html'; // Adjusted path
        });
    });

    // Also handle logout from the main dashboard logout button if it exists
    const mainLogoutButton = document.getElementById('logout-button'); // from dashboard.js
    if (mainLogoutButton) {
        mainLogoutButton.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('userRole');
            localStorage.removeItem('isLoggedIn');
            window.location.href = '../index.html'; // Redirect to home after logout
        });
    }
}

// Initialize auth module
document.addEventListener('DOMContentLoaded', () => {
    // checkAuthState(); // We will handle auth checks more directly for now
    setupLogout();

    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Simulate login - in a real app, you'd validate credentials
            const email = loginForm.email.value;
            // For now, we'll just set a mock role. 
            // A real app would fetch this after validating credentials.
            // We'll try to retrieve the role registered, or default to 'company' for direct logins for now.
            let userRole = localStorage.getItem('userRole'); // Get role if previously registered
            if (!userRole && email.includes('deliverer')) { // Simple mock logic
                userRole = 'deliverer';
            } else if (!userRole) {
                userRole = 'company'; // Default mock role
            }
            
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userRole', userRole); // Store the determined/retrieved role
            alert('Login successful! Redirecting to dashboard...');
            window.location.href = 'dashboard.html'; 
        });
    }    // Handle registration form tabs and submissions
    const companyTab = document.getElementById('companyTab');
    const driverTab = document.getElementById('driverTab');
    const companyRegisterForm = document.getElementById('companyRegisterForm');
    const driverRegisterForm = document.getElementById('driverRegisterForm');

    // Tab switching functionality
    if (companyTab && driverTab) {
        companyTab.addEventListener('click', () => {
            companyTab.classList.add('active');
            driverTab.classList.remove('active');
            companyRegisterForm.classList.add('active');
            driverRegisterForm.classList.remove('active');
        });

        driverTab.addEventListener('click', () => {
            driverTab.classList.add('active');
            companyTab.classList.remove('active');
            driverRegisterForm.classList.add('active');
            companyRegisterForm.classList.remove('active');
        });

        // Check URL for user type parameter to preselect tab
        const urlParams = new URLSearchParams(window.location.search);
        const userType = urlParams.get('type');
        
        if (userType === 'deliverer') {
            driverTab.click();
        } else {
            companyTab.click(); // Default to company tab
        }
    }

    // Company registration form handling
if (companyRegisterForm) {
    companyRegisterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = companyRegisterForm.name.value; // Changed from 'name' to 'username' to match form field
        const address = companyRegisterForm.address.value;
        const email = companyRegisterForm.company_email.value; // Changed to match form field name
        const password = companyRegisterForm.password.value;
        const confirmPassword = companyRegisterForm.confirmPassword.value;
        const userType = 'company';

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        // Simulate registration for company
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userRole', userType);
        localStorage.setItem('username', name);
        localStorage.setItem('email', email);
        
        // If integrating with backend API
        const url = 'https://droply-backend.onrender.com/api/companies';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name, // Changed from 'username' to 'name' to match backend expectation
                address: address,
                company_email: email, // Changed to match backend expectation
                password: password
            })
        })
        .then(response => {
            if (response.ok) {
                alert('Company registration successful! Redirecting to dashboard...');
                window.location.href = 'dashboard.html';
            } else {
                response.json().then(err => {
                    alert(`Registration failed: ${err.error || 'Unknown error'}`);
                });
            }
        })
        .catch(error => {
            console.error('Registration error:', error);
            alert('Registration failed. Please check console for details.');
        });

    });
}
    
    // Driver registration form handling
    if (driverRegisterForm) {
        driverRegisterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = driverRegisterForm.name.value;
            const vehicleType = driverRegisterForm.vehicle_type.value; // Changed to match form field name
            const email = driverRegisterForm.courier_email.value; // Changed to match form field name
            const password = driverRegisterForm.password.value;
            const confirmPassword = driverRegisterForm.confirmPassword.value;
            const userType = 'deliverer';

            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }

            if (!vehicleType) {
                alert('Please select a vehicle type!');
                return;
            }

            // Simulate registration for driver
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userRole', userType);
            localStorage.setItem('username', name);
            localStorage.setItem('email', email);
            localStorage.setItem('vehicleType', vehicleType);
            
            // If integrating with backend API
            const url = 'https://droply-backend.onrender.com/api/couriers';
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    vehicle_type: vehicleType,
                    courier_email: email,
                    password: password
                })
            })
            .then(response => {
                if (response.ok) {
                    alert('Driver registration successful! Redirecting to dashboard...');
                    window.location.href = 'dashboard.html';
                } else {
                    alert('Registration failed. Please try again.');
                }
            })
            .catch(error => {
                console.error('Registration error:', error);
                // Fallback for demo/testing if API is not available
                // alert('Driver registration successful! (Demo mode) Redirecting to dashboard...');
                // window.location.href = 'dashboard.html';
            });
        });
    }

    // Dynamic auth links in header (e.g., on login/register pages themselves)
    const authNavLinksContainer = document.querySelector('header nav ul'); // Generic selector
    if (authNavLinksContainer) {
        const isLoggedIn = !!localStorage.getItem('isLoggedIn');
        authNavLinksContainer.innerHTML = ''; // Clear existing

        if (isLoggedIn) {
            const dashboardLink = document.createElement('li');
            dashboardLink.innerHTML = '<a href="dashboard.html">Dashboard</a>';
            authNavLinksContainer.appendChild(dashboardLink);
            // A logout on these pages might be less common, but can be added if needed
        } else {
            if (window.location.pathname.includes('login.html')) {
                const registerLink = document.createElement('li');
                registerLink.innerHTML = '<a href="register.html">Register</a>';
                authNavLinksContainer.appendChild(registerLink);
            } else if (window.location.pathname.includes('register.html')) {
                const loginLink = document.createElement('li');
                loginLink.innerHTML = '<a href="login.html">Login</a>';
                authNavLinksContainer.appendChild(loginLink);
            }
        }
    }
});