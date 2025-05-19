// Dashboard specific JavaScript will go here
// For example, logic to show/hide role-specific dashboards
// and handle sidebar navigation.

document.addEventListener('DOMContentLoaded', () => {
    console.log('Dashboard JS loaded');

    // Placeholder: Logic to determine user role and show the correct dashboard
    // This would typically involve checking a session or token
    // For now, we can manually show one for testing, e.g., showCompanyDashboard();

    function showCompanyDashboard() {
        hideAllDashboards();
        document.getElementById('companyDashboard').style.display = 'block';
        populateSidebar(['Create Order', 'Order History', 'Notifications']);
    }

    function showDelivererDashboard() {
        hideAllDashboards();
        document.getElementById('delivererDashboard').style.display = 'block';
        populateSidebar(['Available Orders', 'Accepted Orders', 'Track Deliveries', 'Virtual Wallet']);
    }

    function showAdminDashboard() {
        hideAllDashboards();
        document.getElementById('adminDashboard').style.display = 'block';
        populateSidebar(['Manage Users', 'Moderate Orders', 'Verify Documents', 'Platform Stats', 'User Support', 'Manage Fees']);
    }

    function hideAllDashboards() {
        document.getElementById('companyDashboard').style.display = 'none';
        document.getElementById('delivererDashboard').style.display = 'none';
        document.getElementById('adminDashboard').style.display = 'none';
    }

    function populateSidebar(items) {
        const menu = document.getElementById('sidebarMenu');
        menu.innerHTML = ''; // Clear existing items
        items.forEach(item => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = `#${item.toLowerCase().replace(/\s+/g, '-')}`;
            a.textContent = item;
            li.appendChild(a);
            menu.appendChild(li);
        });
    }

    // Example: Detect user role (replace with actual logic)
    // You can change this to "deliverer" or "admin" to test other views
    const userRole = "company"; 

    if (userRole === "company") {
        showCompanyDashboard();
    } else if (userRole === "deliverer") {
        showDelivererDashboard();
    } else if (userRole === "admin") {
        showAdminDashboard();
    } else {
        // Default view if role is unknown or not logged in
        hideAllDashboards();
        populateSidebar([]); // No specific menu
    }

    // Logout functionality (placeholder)
    const logoutButton = document.getElementById('logoutButton');
    if(logoutButton) {
        logoutButton.addEventListener('click', (event) => {
            event.preventDefault();
            alert('Logout functionality to be implemented');
            // Add actual logout logic here (e.g., clear session, redirect to login)
            window.location.href = '../index.html';
        });
    }
});
