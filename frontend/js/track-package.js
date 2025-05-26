// Track package functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tracking form
    initTrackingForm();
    
    // Initialize FAQ accordion
    initAccordion();
    
    // Add section animations
    initSectionAnimations();
    
    // Add sticky header functionality (reused from other pages)
    initStickyHeader();
});

// Handle tracking form submission
function initTrackingForm() {
    const trackingForm = document.getElementById('tracking-form');
    const trackingResult = document.getElementById('tracking-result');
    const noResults = document.getElementById('no-tracking-results');
    const recentShipments = document.getElementById('recent-shipments');
    const tryAgainBtn = document.getElementById('btn-try-again');
    const resultTrackingNumber = document.getElementById('result-tracking-number');
    
    if (trackingForm) {
        trackingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const trackingNumber = document.getElementById('tracking-number').value.trim();
            
            if (trackingNumber) {
                // In a real application, you would make an API call to a backend service
                // For now, we'll simulate a response based on the input
                
                // Hide both result sections
                trackingResult.classList.add('hidden');
                noResults.classList.add('hidden');
                
                // Show loading indicator
                showLoading();
                
                // Simulate API call delay
                setTimeout(() => {
                    hideLoading();
                    
                    if (isValidTrackingNumber(trackingNumber)) {
                        // Update tracking number in the result
                        if (resultTrackingNumber) {
                            resultTrackingNumber.textContent = trackingNumber.toUpperCase();
                        }
                        
                        // Show results
                        trackingResult.classList.remove('hidden');
                        
                        // Scroll to results
                        trackingResult.scrollIntoView({ behavior: 'smooth' });
                        
                        // If user is logged in, show recent shipments
                        if (isUserLoggedIn()) {
                            recentShipments.classList.remove('hidden');
                        }
                    } else {
                        // Show no results
                        noResults.classList.remove('hidden');
                        
                        // Scroll to no results
                        noResults.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 1500);
            }
        });
    }
    
    // Try again button
    if (tryAgainBtn) {
        tryAgainBtn.addEventListener('click', function() {
            // Hide no results
            noResults.classList.add('hidden');
            
            // Scroll to form
            document.querySelector('.tracking-form-container').scrollIntoView({ behavior: 'smooth' });
            
            // Focus on tracking input
            document.getElementById('tracking-number').focus();
        });
    }
    
    // Track buttons in recent shipments
    const trackButtons = document.querySelectorAll('.track-btn');
    trackButtons.forEach(button => {
        button.addEventListener('click', function() {
            const trackingId = this.closest('.shipment-card').querySelector('.shipment-tracking').textContent;
            document.getElementById('tracking-number').value = trackingId;
            trackingForm.dispatchEvent(new Event('submit'));
        });
    });
    
    // Check for tracking number in URL parameters
    checkUrlForTrackingNumber();
}

// Show loading indicator
function showLoading() {
    const loadingEl = document.createElement('div');
    loadingEl.className = 'loading-overlay';
    loadingEl.innerHTML = `
        <div class="loading-spinner">
            <div class="spinner"></div>
            <p>Looking for your package...</p>
        </div>
    `;
    document.body.appendChild(loadingEl);
    
    // Add styles if not already in CSS
    const style = document.createElement('style');
    style.textContent = `
        .loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
        }
        .loading-spinner {
            background-color: white;
            padding: 30px;
            border-radius: 10px;
            text-align: center;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }
        .spinner {
            width: 40px;
            height: 40px;
            margin: 0 auto 15px;
            border: 4px solid rgba(0, 121, 107, 0.2);
            border-top-color: rgba(0, 121, 107, 1);
            border-radius: 50%;
            animation: spin 1s infinite linear;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}

// Hide loading indicator
function hideLoading() {
    const loadingEl = document.querySelector('.loading-overlay');
    if (loadingEl) {
        loadingEl.remove();
    }
}

// Basic tracking number validation (example only)
function isValidTrackingNumber(trackingNumber) {
    // In a real application, this would validate against a specific format
    // For demo purposes, we'll consider all tracking numbers valid except for "invalid"
    trackingNumber = trackingNumber.toLowerCase();
    return trackingNumber !== 'invalid' && trackingNumber.length >= 6;
}

// Check if user is logged in (example only)
function isUserLoggedIn() {
    // In a real application, this would check authentication state
    // For demo purposes, we'll randomly determine login state
    return Math.random() > 0.5;
}

// Check URL for tracking number parameter
function checkUrlForTrackingNumber() {
    const urlParams = new URLSearchParams(window.location.search);
    const trackingParam = urlParams.get('tracking');
    
    if (trackingParam) {
        const trackingInput = document.getElementById('tracking-number');
        const trackingForm = document.getElementById('tracking-form');
        
        if (trackingInput && trackingForm) {
            trackingInput.value = trackingParam;
            
            // Submit the form after a short delay to allow the page to fully load
            setTimeout(() => {
                trackingForm.dispatchEvent(new Event('submit'));
            }, 500);
        }
    }
}

// Handle FAQ accordion
function initAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            // Toggle active class for the current header
            header.classList.toggle('active');
            
            // Get the parent accordion item
            const accordionItem = header.parentElement;
            
            // Toggle active class for the parent
            accordionItem.classList.toggle('active');
            
            // Get the corresponding content
            const accordionContent = header.nextElementSibling;
            
            // Toggle max-height
            if (header.classList.contains('active')) {
                accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
            } else {
                accordionContent.style.maxHeight = 0;
            }
        });
    });
    
    // Open first accordion item by default
    if (accordionHeaders.length > 0) {
        accordionHeaders[0].click();
    }
}

// Add animations to sections when scrolling
function initSectionAnimations() {
    const sections = document.querySelectorAll('.tracking-result, .tracking-faq, .recent-shipments, .no-tracking-results, .cta-section');
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85
        );
    }
    
    // Add fade-in class to visible sections
    function handleScroll() {
        sections.forEach(section => {
            if (isInViewport(section) && !section.classList.contains('fade-in')) {
                section.classList.add('fade-in');
            }
        });
    }
    
    // Add initial fade-in class to sections that are already visible
    handleScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Add CSS if not in main stylesheet
    const style = document.createElement('style');
    style.textContent = `
        .tracking-result, .tracking-faq, .recent-shipments, .no-tracking-results, .cta-section {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .fade-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// Add sticky header effect (reused from other pages)
function initStickyHeader() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    
    const headerHeight = header.offsetHeight;
    let isSticky = false;
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        
        if (scrollPosition > headerHeight && !isSticky) {
            header.classList.add('sticky-header');
            document.body.style.paddingTop = headerHeight + 'px';
            isSticky = true;
        } else if (scrollPosition <= headerHeight && isSticky) {
            header.classList.remove('sticky-header');
            document.body.style.paddingTop = '0px';
            isSticky = false;
        }
    });
}

// Handle notification button clicks
document.addEventListener('DOMContentLoaded', function() {
    const notifyButton = document.getElementById('btn-notify');
    const reportButton = document.getElementById('btn-problem');
    
    if (notifyButton) {
        notifyButton.addEventListener('click', function() {
            // In a real app, this would open a modal or navigate to a settings page
            alert('You will now receive SMS and email notifications for this delivery!');
        });
    }
    
    if (reportButton) {
        reportButton.addEventListener('click', function() {
            // In a real app, this would open a report form
            alert('Our support team has been notified and will contact you shortly.');
        });
    }
});
