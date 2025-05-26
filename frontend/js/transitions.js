// Page transitions handling
document.addEventListener('DOMContentLoaded', function() {
    initPageTransitions();
});

function initPageTransitions() {    // Add transition classes to the main elements
    const mainElement = document.querySelector('main');
    if (mainElement) {
        mainElement.classList.add('page-transition');
          // Different animation based on page type
        if (document.body.classList.contains('login-body-bg') || 
            document.body.classList.contains('register-body-bg')) {
            mainElement.classList.add('fade-in-up');
        } else if (window.location.pathname.includes('how-it-works.html')) {
            mainElement.classList.add('fade-in-slide');
        } else if (window.location.pathname.includes('pricing.html')) {
            mainElement.classList.add('fade-in-scale');
        } else {
            mainElement.classList.add('fade-in');
        }
    }
    
    // Add animations to specific elements based on page
    const formContainers = document.querySelectorAll('.auth-form-container, .register-form-area, .login-form-area');
    formContainers.forEach(container => {
        container.classList.add('page-transition', 'zoom-in');
    });
    
    // Dashboard-specific animations
    const dashboardContent = document.getElementById('dashboardContent');
    if (dashboardContent) {
        dashboardContent.classList.add('page-transition', 'fade-in');
    }
    
    // Add transition to navigation links
    setupLinkTransitions();
}

function setupLinkTransitions() {
    // Get all navigation links (except those with target="_blank" or download attributes)
    const links = document.querySelectorAll('a:not([target="_blank"]):not([download])');
    
    links.forEach(link => {
        // Skip if it's a hash link (same-page anchor)
        if (link.getAttribute('href') && link.getAttribute('href').startsWith('#')) {
            return;
        }
        
        link.addEventListener('click', function(e) {
            // Skip if modifier keys are pressed (user might want to open in new tab)
            if (e.ctrlKey || e.metaKey || e.shiftKey) {
                return;
            }
            
            const href = this.getAttribute('href');
            // Only handle internal links
            if (href && !href.startsWith('http')) {
                e.preventDefault();
                
                // Add exit animation
                const mainElement = document.querySelector('main');
                if (mainElement) {
                    // Remove existing animation classes
                    mainElement.classList.remove('fade-in', 'fade-in-up', 'slide-in-right', 'slide-in-left', 'zoom-in');
                    // Add fade out animation
                    mainElement.classList.add('fade-out');
                    
                    // Wait for animation to complete before navigating
                    setTimeout(() => {
                        // Store the animation preference in sessionStorage
                        const destination = this.getAttribute('href');
                        sessionStorage.setItem('lastNavigatedFrom', window.location.pathname);
                        window.location.href = destination;
                    }, 300); // Slightly shorter than the CSS animation duration
                } else {
                    // If no main element, navigate immediately
                    window.location.href = href;
                }
            }
        });
    });
}

// Handle back/forward browser navigation
window.addEventListener('pageshow', function(event) {
    // When navigating back, the page might be loaded from cache
    // This ensures animations still work
    if (event.persisted) {
        initPageTransitions();
    }
    
    // Check if we have navigation history to determine animation
    const lastPage = sessionStorage.getItem('lastNavigatedFrom');
    if (lastPage) {
        const currentPath = window.location.pathname;
        
        // Choose animation based on navigation flow
        let animationClass = 'fade-in';
        
        // Add specific page flow animations here
        // For example:
        if (lastPage.includes('login') && currentPath.includes('register')) {
            animationClass = 'slide-in-right';
        } else if (lastPage.includes('register') && currentPath.includes('login')) {
            animationClass = 'slide-in-left';
        } else if (currentPath.includes('dashboard')) {
            animationClass = 'fade-in-up';
        }
        
        const mainElement = document.querySelector('main');
        if (mainElement) {
            mainElement.classList.remove('fade-in', 'fade-in-up', 'slide-in-right', 'slide-in-left');
            mainElement.classList.add(animationClass);
        }
    }
});
