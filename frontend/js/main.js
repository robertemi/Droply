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
    initializeMobileMenu();
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

// Mobile menu initialization
function initializeMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;
    
    // Create overlay element
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    body.appendChild(overlay);
    
    if (mobileMenuToggle && navMenu) {
        // Toggle mobile menu
        mobileMenuToggle.addEventListener('click', () => {
            toggleMobileMenu();
        });
        
        // Close menu when clicking overlay
        overlay.addEventListener('click', () => {
            closeMobileMenu();
        });
        
        // Close menu when clicking nav links
        const navLinks = navMenu.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeMobileMenu();
            });
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    }
    
    function toggleMobileMenu() {
        mobileMenuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        body.classList.toggle('menu-open');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
        }
    }
    
    function closeMobileMenu() {
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        overlay.classList.remove('active');
        body.classList.remove('menu-open');
        body.style.overflow = '';
    }
}

// Add support button and popup to the page
document.addEventListener('DOMContentLoaded', function() {
    // Create support button and popup
    const supportButton = document.createElement('button');
    supportButton.className = 'support-btn';
    supportButton.innerHTML = '<i class="fas fa-comment-dots"></i> Support';

    const supportPopup = document.createElement('div');
    supportPopup.className = 'support-popup';
    supportPopup.innerHTML = `
        <button class="close-btn">&times;</button>
        <h3>How can we help?</h3>
        <textarea placeholder="Describe your issue..."></textarea>
        <button class="send-btn">Send Message</button>
    `;

    // Add elements to the page
    document.body.appendChild(supportButton);
    document.body.appendChild(supportPopup);

    // Handle support button click
    supportButton.addEventListener('click', () => {
        supportPopup.classList.add('active');
    });

    // Handle close button click
    const closeBtn = supportPopup.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        supportPopup.classList.remove('active');
    });

    // Handle send button click
    const sendBtn = supportPopup.querySelector('.send-btn');
    sendBtn.addEventListener('click', () => {
        const message = supportPopup.querySelector('textarea').value;
        if (message.trim()) {
            // Create mailto link with the message
            const mailtoLink = `mailto:support@droply.com?subject=Support Request&body=${encodeURIComponent(message)}`;
            window.location.href = mailtoLink;
            
            // Clear textarea and close popup
            supportPopup.querySelector('textarea').value = '';
            supportPopup.classList.remove('active');
        }
    });

    // Close popup when clicking outside
    document.addEventListener('click', (e) => {
        if (!supportPopup.contains(e.target) && !supportButton.contains(e.target)) {
            supportPopup.classList.remove('active');
        }
    });
});

// Ensure initApp is defined if it's not already
if (typeof initApp === 'undefined') {
    function initApp() {
        console.log('Application initialized');
    }
}