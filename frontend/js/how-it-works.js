// How It Works page specific functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize section animations for the How It Works page
    initSectionAnimations();
});

function initSectionAnimations() {
    // Get all sections to animate
    const sections = document.querySelectorAll('.hero-section, .for-customers, .safe-deliveries, .for-drivers, .driver-benefits, .faq-section, .cta-section');
    
    // Set initial visibility for sections that are already in view when page loads
    checkSectionVisibility(sections);
    
    // Check section visibility on scroll
    window.addEventListener('scroll', function() {
        checkSectionVisibility(sections);
    });
}

function checkSectionVisibility(sections) {
    const windowHeight = window.innerHeight;
    const triggerPoint = windowHeight * 0.8; // Trigger animation when section is 80% in view
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        
        if (sectionTop < triggerPoint) {
            section.classList.add('section-visible');
        }
    });
}

// Handle smooth scrolling for in-page navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});
