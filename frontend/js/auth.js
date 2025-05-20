/**
 * Authentication and user role management
 * Handles login/logout and user role checks
 */

  /**
   * Use for requiring login before accesing the dashboard
   */

// Check authentication state and redirect if needed
// function checkAuthState() {
//     const userRole = localStorage.getItem('userRole');
//     const currentPage = window.location.pathname.split('/').pop();
    
//     // Redirect logic based on user role
//     if (userRole === "deliverer" && !currentPage.includes('deliverer')) {
//         window.location.href = '/frontend/pages/deliverer-dashboard.html';
//     } else if (userRole === "admin" && !currentPage.includes('admin')) {
//         window.location.href = '/frontend/pages/admin-dashboard.html';
//     } else if (!userRole && !currentPage.includes('login') && !currentPage.includes('register')) {
//         window.location.href = '/frontend/pages/login.html';
//     }
    
//     return userRole;
// }

// Handle logout functionality
function setupLogout() {
    const logoutButtons = document.querySelectorAll('.logout-btn');
    
    logoutButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('userRole');
            localStorage.removeItem('selectedUserType');
            window.location.href = '../pages/login.html';
        });
    });
}

// Initialize auth module
document.addEventListener('DOMContentLoaded', () => {
    checkAuthState();
    setupLogout();
});