/**
 * Dashboard-specific functionality
 * Handles sidebar, navigation, and UI interactions
 */

// Initialize dashboard
function initDashboard() {
    setupHamburgerMenu();
    setupSidebarLinks();
    updateNavLinks();
}

// Hamburger menu toggle for mobile
function setupHamburgerMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
    }
}

// Setup sidebar navigation links
function setupSidebarLinks() {
    const sidebar = document.querySelector('.sidebar');
    const sidebarLinks = document.querySelectorAll('.sidebar ul li a');
    const currentPath = window.location.pathname;
    
    sidebarLinks.forEach(link => {
        // Set active state
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active-link');
        }
        
        // Click handler
        link.addEventListener('click', function() {
            sidebarLinks.forEach(l => l.classList.remove('active-link'));
            this.classList.add('active-link');
            
            // Close sidebar on mobile after click
            if (window.innerWidth <= 768 && sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
            }
        });
    });
}

// Update navigation links based on auth state
function updateNavLinks() {
    const navLinks = document.getElementById('navLinks');
    const userRole = localStorage.getItem('userRole');
    const homeLink = navLinks.querySelector('li a[href="../index.html"]');
    
    // Clear existing links except Home
    navLinks.innerHTML = '';
    
    if (homeLink) {
        const homeLi = document.createElement('li');
        homeLi.appendChild(homeLink);
        navLinks.appendChild(homeLi);
    }
    
    if (userRole) {
        // User is logged in - show logout
        const logoutLi = document.createElement('li');
        logoutLi.innerHTML = '<a href="#" class="logout-btn">Logout</a>';
        navLinks.appendChild(logoutLi);
    } else {
        // User is logged out - show login/register
        const loginLi = document.createElement('li');
        loginLi.innerHTML = '<a href="login.html">Login</a>';
        navLinks.appendChild(loginLi);
        
        const registerLi = document.createElement('li');
        registerLi.innerHTML = '<a href="register.html">Register</a>';
        navLinks.appendChild(registerLi);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initDashboard);