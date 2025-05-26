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
    const navLinks = document.getElementById('nav-links');
    const userRole = localStorage.getItem('userRole');
    
    // Clear existing links
    navLinks.innerHTML = '';
    
    // Home link
    const homeLi = document.createElement('li');
    homeLi.innerHTML = '<a href="../index.html">Home</a>';
    navLinks.appendChild(homeLi);
      // How It Works link
    const howItWorksLi = document.createElement('li');
    howItWorksLi.innerHTML = '<a href="how-it-works.html">How It Works</a>';
    navLinks.appendChild(howItWorksLi);
    
    // Pricing link
    const pricingLi = document.createElement('li');
    pricingLi.innerHTML = '<a href="pricing.html">Pricing</a>';
    navLinks.appendChild(pricingLi);
    
    // Track Package link
    const trackPackageLi = document.createElement('li');
    trackPackageLi.innerHTML = '<a href="track-package.html">Track Package</a>';
    navLinks.appendChild(trackPackageLi);
    
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
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.getElementById('nav-links');
    const sidebarLinks = document.getElementById('sidebar-links');
    const logoutButton = document.getElementById('logout-button');
    const welcomeMessage = document.getElementById('welcome-message');
    const roleSpecificIntro = document.getElementById('role-specific-intro');
    const dashboardContent = document.getElementById('dashboard-content');
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const sidebar = document.getElementById('sidebar');
    const currentYear = document.getElementById('current-year');

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    const companyDashboard = document.getElementById('company-dashboard');
    const delivererDashboard = document.getElementById('deliverer-dashboard');
    const adminDashboard = document.getElementById('admin-dashboard');

    // Mock user data - in a real app, this would come from a login process
    const userRole = localStorage.getItem('userRole'); // 'company', 'deliverer', 'admin'
    const isLoggedIn = !!localStorage.getItem('isLoggedIn');

    function updateAuthLinks() {
        if (!navLinks) return;
        navLinks.innerHTML = ''; // Clear existing links

        if (isLoggedIn) {
            const dashboardLink = document.createElement('li');
            dashboardLink.innerHTML = `<a href="dashboard.html">Dashboard</a>`;
            navLinks.appendChild(dashboardLink);

            const logoutLinkItem = document.createElement('li');
            const logoutLink = document.createElement('a');
            logoutLink.href = "#";
            logoutLink.textContent = 'Logout';
            logoutLink.id = 'dynamic-logout-button'; // For event listener
            logoutLinkItem.appendChild(logoutLink);
            navLinks.appendChild(logoutLinkItem);

            logoutLink.addEventListener('click', (e) => {
                e.preventDefault();
                handleLogout();
            });

        } else {
            const loginLink = document.createElement('li');
            loginLink.innerHTML = `<a href="login.html">Login</a>`;
            navLinks.appendChild(loginLink);

            const registerLink = document.createElement('li');
            registerLink.innerHTML = `<a href="register.html">Register</a>`;
            navLinks.appendChild(registerLink);
        }
    }
    
    // Call on pages that have the header nav
    if (navLinks) {
        updateAuthLinks();
    }

    if (!isLoggedIn && (window.location.pathname.includes('dashboard.html'))) {
        window.location.href = 'login.html';
        return; // Stop further execution if not logged in
    }    function handleLogout() {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userRole');
        // Potentially clear other session-related data
        window.location.href = 'how-it-works.html'; // Redirect to how-it-works page after logout
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', handleLogout);
    }    function populateSidebar(role) {
        if (!sidebarLinks) return;
        sidebarLinks.innerHTML = ''; // Clear existing links

        const commonLinks = [
            { text: 'Home', href: 'dashboard.html' },
            { text: 'How It Works', href: 'how-it-works.html' },
            { text: 'Pricing', href: 'pricing.html' },
            { text: 'Profile', href: '#' }, // Placeholder
            { text: 'Settings', href: '#' }  // Placeholder
        ];

        let roleSpecificLinks = [];

        if (role === 'company') {
            roleSpecificLinks = [
                { text: 'My Orders', href: '#company-orders-list' },
                { text: 'Post New Order', href: '#' }, // Placeholder
                { text: 'Financials', href: '#company-balance' }
            ];
        } else if (role === 'deliverer') {
            roleSpecificLinks = [
                { text: 'Available Orders', href: '#available-orders-list' },
                { text: 'My Inventory', href: '#deliverer-inventory-list' },
                { text: 'My Earnings', href: '#deliverer-balance' }
            ];
        } else if (role === 'admin') {
            roleSpecificLinks = [
                { text: 'User Management', href: '#' },
                { text: 'System Analytics', href: '#' },
                { text: 'Content Moderation', href: '#' }
            ];
        }

        [...commonLinks, ...roleSpecificLinks].forEach(link => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.textContent = link.text;
            a.href = link.href;
            if (link.href.startsWith('#')) { // Smooth scroll for in-page links
                a.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetElement = document.querySelector(link.href);
                    if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                    }
                    if (window.innerWidth < 769 && sidebar.classList.contains('active')) {
                        sidebar.classList.remove('active');
                        hamburgerMenu.classList.remove('active');
                        hamburgerMenu.setAttribute('aria-expanded', 'false');
                    }
                });
            }
            li.appendChild(a);
            sidebarLinks.appendChild(li);
        });
    }

    function displayDashboardContent(role) {
        if (!welcomeMessage || !roleSpecificIntro) return;

        // Hide all views first
        if(companyDashboard) companyDashboard.style.display = 'none';
        if(delivererDashboard) delivererDashboard.style.display = 'none';
        if(adminDashboard) adminDashboard.style.display = 'none';

        welcomeMessage.textContent = `Welcome, ${role ? role.charAt(0).toUpperCase() + role.slice(1) : 'User'}!`;

        if (role === 'company') {
            if(companyDashboard) companyDashboard.style.display = 'block';
            roleSpecificIntro.textContent = 'Manage your orders and view your balance.';
            populateCompanyDashboard();
        } else if (role === 'deliverer') {
            if(delivererDashboard) delivererDashboard.style.display = 'block';
            roleSpecificIntro.textContent = 'Find available orders, manage your inventory, and track your earnings.';
            populateDelivererDashboard();
        } else if (role === 'admin') {
            if(adminDashboard) adminDashboard.style.display = 'block';
            roleSpecificIntro.textContent = 'Oversee the platform, manage users, and view analytics.';
            // populateAdminDashboard(); // Future function
        } else {
            roleSpecificIntro.textContent = 'Your role is not defined. Please contact support.';
        }
    }

    function populateCompanyDashboard() {
        const ordersList = document.getElementById('company-orders-list');
        const balanceEl = document.getElementById('company-balance');

        if (ordersList) {
            // Mock data for company orders
            const orders = [
                { id: 'ORD001', item: 'Package A', status: 'Pending Pickup', deliverer: 'N/A', fee: 50 },
                { id: 'ORD002', item: 'Documents B', status: 'In Transit', deliverer: 'John D.', fee: 30 },
                { id: 'ORD003', item: 'Electronics C', status: 'Delivered', deliverer: 'Jane S.', fee: 75 },
                { id: 'ORD004', item: 'Groceries D', status: 'Pending Pickup', deliverer: 'N/A', fee: 40 }
            ];
            ordersList.innerHTML = '<ul>' + orders.map(order => 
                `<li><strong>${order.id}</strong>: ${order.item} - <em>${order.status}</em> (Deliverer: ${order.deliverer}) - Fee: $${order.fee}</li>`
            ).join('') + '</ul>';
        }
        if (balanceEl) {
            // Mock calculation for balance
            const deliveredOrdersFee = 105; // Sum of ORD003 for example
            balanceEl.textContent = `$${deliveredOrdersFee.toFixed(2)}`;
        }
    }

    function populateDelivererDashboard() {
        const availableOrdersList = document.getElementById('available-orders-list');
        const inventoryList = document.getElementById('deliverer-inventory-list');
        const balanceEl = document.getElementById('deliverer-balance');

        if (availableOrdersList) {
            // Mock data for available orders
            const availableOrders = [
                { id: 'ORD101', item: 'Small Parcel', pickup: '123 Main St', destination: '456 Oak Ave', payout: 20 },
                { id: 'ORD102', item: 'Food Delivery', pickup: 'Restaurant Z', destination: '789 Pine Rd', payout: 15 },
                { id: 'ORD103', item: 'Urgent Documents', pickup: 'Office A', destination: 'Client B', payout: 25 }
            ];
            availableOrdersList.innerHTML = '<ul>' + availableOrders.map(order => 
                `<li><strong>${order.id}</strong>: ${order.item} (From: ${order.pickup} To: ${order.destination}) - Payout: $${order.payout} <button class="btn-accept-order" data-order-id="${order.id}">Accept</button></li>`
            ).join('') + '</ul>';
            
            // Add event listeners for accept buttons (basic example)
            availableOrdersList.querySelectorAll('.btn-accept-order').forEach(button => {
                button.addEventListener('click', (e) => {
                    const orderId = e.target.dataset.orderId;
                    alert(`Order ${orderId} accepted! (This is a mock action)`);
                    // In a real app, move this order to inventory and update backend
                    e.target.closest('li').remove(); // Remove from available list
                    // Add to inventory (mock)
                    const acceptedOrder = availableOrders.find(o => o.id === orderId);
                    if (acceptedOrder && inventoryList) {
                        const inventoryItem = document.createElement('li');
                        inventoryItem.textContent = `${acceptedOrder.item} - Status: Accepted (Waiting for pickup)`;
                        if (inventoryList.querySelector('p')) { // Remove 'No orders' message
                            inventoryList.innerHTML = '<ul></ul>';
                        }
                        inventoryList.querySelector('ul').appendChild(inventoryItem);
                    }
                });
            });
        }

        if (inventoryList) {
            // Mock data for deliverer's inventory (initially empty or loaded from storage)
            // For now, it's populated by accepting orders above.
            // If you want initial items: 
            // inventoryList.innerHTML = '<ul><li>Sample Accepted Order 1 - Status: In Transit</li></ul>';
        }

        if (balanceEl) {
            // Mock calculation for balance
            const earnings = 0; // Example, would be calculated from completed deliveries
            balanceEl.textContent = `$${earnings.toFixed(2)}`;
        }
    }

    // Hamburger menu toggle
    if (hamburgerMenu && sidebar) {
        hamburgerMenu.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            hamburgerMenu.classList.toggle('active');
            const isExpanded = sidebar.classList.contains('active');
            hamburgerMenu.setAttribute('aria-expanded', isExpanded.toString());
        });
    }

    // Initialize dashboard if on dashboard page
    if (window.location.pathname.includes('dashboard.html')) {
        if (!isLoggedIn) {
            // This check is a bit redundant due to the earlier redirect, but good for safety
            window.location.href = 'login.html'; 
        } else {
            populateSidebar(userRole);
            displayDashboardContent(userRole);
        }
    }
});