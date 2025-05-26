/**
 * Main application script
 * Contains global functionality used across all pages
 */

// Global initialization
function initApp() {
    // Any global initialization code
    console.log('Application initialized');
}

// Document ready handler
document.addEventListener('DOMContentLoaded', () => {
    initApp();
    initializeTheme();
});

function initializeTheme() {
    // Support both the original theme-toggle-button and the new theme-toggle
    const themeToggleButton = document.getElementById('theme-toggle-button') || document.getElementById('theme-toggle');
    const body = document.body;
    const sunIcon = themeToggleButton && themeToggleButton.querySelector('.icon-sun');
    const moonIcon = themeToggleButton && themeToggleButton.querySelector('.icon-moon');
    const fontAwesomeIcon = themeToggleButton && themeToggleButton.querySelector('.fas');
    
    // Apply saved theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    
    function applyTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark-theme');
            
            // Handle both icon types - old style with separate elements
            if (sunIcon && moonIcon) {
                sunIcon.style.display = 'inline-block';
                moonIcon.style.display = 'none';
            }
            
            // New style with Font Awesome
            if (fontAwesomeIcon) {
                fontAwesomeIcon.classList.remove('fa-moon');
                fontAwesomeIcon.classList.add('fa-sun');
            }
        } else {
            body.classList.remove('dark-theme');
            
            // Handle both icon types - old style
            if (sunIcon && moonIcon) {
                sunIcon.style.display = 'none';
                moonIcon.style.display = 'inline-block';
            }
            
            // New style with Font Awesome
            if (fontAwesomeIcon) {
                fontAwesomeIcon.classList.remove('fa-sun');
                fontAwesomeIcon.classList.add('fa-moon');
            }
        }
    }
    
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        // Default to light theme if no preference is saved
        applyTheme('light');
    }

    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            if (body.classList.contains('dark-theme')) {
                applyTheme('light');
                localStorage.setItem('theme', 'light');
            } else {
                applyTheme('dark');
                localStorage.setItem('theme', 'dark');
            }
        });
    } else {
        // If the theme toggle button is not on the current page,
        // still apply the theme from localStorage.
        if (savedTheme) {
            applyTheme(savedTheme);
        }
    }
}

// Ensure initApp is defined if it's not already
if (typeof initApp === 'undefined') {
    function initApp() {
        console.log('Application initialized');
    }
}