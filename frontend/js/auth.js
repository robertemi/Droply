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
    const registerForm = document.getElementById('registerForm');    // Handle login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const selectedRole = document.getElementById('userRole').value;
            
            // Store the role along with other login info
            localStorage.setItem('userRole', selectedRole);
            
            // Here you would typically make an API call to verify credentials
            if (email && password) {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userEmail', email);
                
                // Redirect based on role
                if (selectedRole === 'company') {
                    const url = 'https://droply-backend.onrender.com/api/companies/log_in'
                    fetch(url,{
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'

                        },
                        body: JSON.stringify({
                            company_email: email,
                            password: password
                        })
                    })
                    .then(response => response.json().then(data => ({ status: response.status, body: data })))
                    .then(({ status, body }) => {
                        if (status === 200 && body.success){
                            localStorage.setItem('company_id', body.company_id);
                            alert('Company login successful! Redirecting to dashboard...');
                            window.location.href = 'dashboard.html';
                        }else {
                            alert(`Registration failed: ${body.error || 'Unknown error'}`);
                        }
                    })
                    .catch(error => {
                    console.error('Registration error:', error);
                    alert('Error during registration. Please try again later.');
                    });                     
                } else if (selectedRole === 'deliverer') {
                    const url = 'https://droply-backend.onrender.com/api/couriers/log_in'
                    fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            courier_email: email,
                            password: password
                        })
                    })
                    .then(response => response.json().then(data => ({ status: response.status, body: data})))
                    .then(({ status, body }) => {
                        if (status === 200 && body.success){
                            localStorage.setItem('courier_id', body.courier_id);
                            alert('Courier login successful! Redirecting to dashboard...');
                            window.location.href = 'dashboard.html';
                        }else{
                            alert(`Registration failed: ${body.error || 'Unknown error'}`);
                        }
                    })
                    .catch(error => {
                    console.error('Registration error:', error);
                    alert('Error during registration. Please try again later.');
                    });
                }
            }
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
        const name = companyRegisterForm.name.value;
        const address = companyRegisterForm.address.value;
        const email = companyRegisterForm.company_email.value;
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
                name: name,
                address: address,
                company_email: email,
                password: password
            })
        })
        .then(response => response.json().then(data => ({ status: response.status, body: data })))
        .then(({ status, body }) => {
            if ((status === 201 || status === 200) && body.company_id) {
                localStorage.setItem('company_id', body.company_id); // Save company_id
                alert('Company registration successful! Redirecting to dashboard...');
                window.location.href = 'dashboard.html';
            } else {
                alert(`Registration failed: ${body.error || 'Unknown error'}`);
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
            .then(response => response.json().then(data => ({ status: response.status, body: data })))
            .then(({ status, body }) => {
                if (status === 201 && body.courier_id) {
                    localStorage.setItem('courier_id', body.courier_id);
                    alert('Driver registration successful! Redirecting to dashboard...');
                    window.location.href = 'dashboard.html';
                } else {
                    alert(`Registration failed: ${body.error || 'Unknown error'}`);
                }
            })
            .catch(error => {
                console.error('Registration error:', error);
                alert('Error during registration. Please try again later.');
            });
        });
    }

    // Dynamic auth links in header (e.g., on login/register pages themselves)
    const authNavLinksContainer = document.querySelector('header nav ul'); // Generic selector
    if (authNavLinksContainer) {
        authNavLinksContainer.innerHTML = ''; // Clear existing

        // Only show Register on login page, and Login on register page
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
});