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
                // Hide both result sections
                trackingResult.classList.add('hidden');
                noResults.classList.add('hidden');
                
                // Show loading indicator
                showLoading();
                
                // Make real API call to backend
                fetchTrackingData(trackingNumber)
                    .then(data => {
                        hideLoading();
                        
                        if (data && !data.error) {
                            // Update tracking number in the result
                            if (resultTrackingNumber) {
                                resultTrackingNumber.textContent = trackingNumber.toUpperCase();
                            }
                            
                            // Populate tracking results with real data
                            populateTrackingResults(data);
                            
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
                    })
                    .catch(error => {                        hideLoading();
                        console.error('Tracking error:', error);
                        
                        // Show enhanced error message
                        const errorMessage = document.createElement('div');
                        errorMessage.className = 'error-message';
                        errorMessage.innerHTML = `
                            <h3>Tracking Error</h3>
                            <p>We couldn't find your package. This could be because:</p>
                            <ul>
                                <li>The tracking number is incorrect or doesn't exist</li>
                                <li>There might be a temporary connection issue</li>
                                <li>The package information hasn't been updated yet</li>
                            </ul>
                            <p><strong>Please check your tracking number and try again.</strong></p>
                            <p>If the problem persists, contact customer support.</p>
                        `;
                        
                        // Add error message to no results section
                        const errorContainer = noResults.querySelector('.error-container') || noResults;
                        errorContainer.appendChild(errorMessage);
                        
                        // Show no results section
                        noResults.classList.remove('hidden');
                        noResults.scrollIntoView({ behavior: 'smooth' });
                    });
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

// Fetch tracking data from backend API
async function fetchTrackingData(trackingNumber) {
    console.log('Fetching tracking data for:', trackingNumber);
    const url = `https://droply-backend.onrender.com/api/orders/track/${trackingNumber}`;
    console.log('Request URL:', url);
    
    try {
        const response = await fetch(url, {
            method: 'GET'
        });

        console.log('Response status:', response.status);
        console.log('Response headers:', Object.fromEntries(response.headers.entries()));

        if (response.ok) {
            const data = await response.json();
            console.log('Success response data:', data);
            return data;
        } else if (response.status === 404) {
            console.log('404 - Tracking number not found');
            const errorData = await response.json();
            console.log('Error response data:', errorData);
            return { error: 'Tracking number not found' };
        } else {
            console.log('Non-OK response:', response.status);
            const errorText = await response.text();
            console.log('Error response text:', errorText);
            throw new Error('Failed to fetch tracking data');
        }
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

// Populate tracking results with real data
function populateTrackingResults(trackingData) {
    // Update tracking number
    const trackingNumberEl = document.getElementById('result-tracking-number');
    if (trackingNumberEl) {
        trackingNumberEl.textContent = trackingData.tracking_number;
    }

    // Update current status
    const statusEl = document.querySelector('.status-current .status-label');
    if (statusEl) {
        statusEl.textContent = trackingData.current_status || 'In Transit';
    }

    // Update addresses
    const pickupEl = document.getElementById('pickup-address');
    const deliveryEl = document.getElementById('delivery-address');
    if (pickupEl) pickupEl.textContent = trackingData.pickup_address || 'N/A';
    if (deliveryEl) deliveryEl.textContent = trackingData.delivery_address || 'N/A';

    // Update status timeline
    updateStatusTimeline(trackingData.status_history || []);

    // Update estimated delivery
    updateEstimatedDelivery(trackingData.created_at);
}

// Update status timeline with real data
function updateStatusTimeline(statusHistory) {
    const timelineEl = document.querySelector('.status-timeline');
    if (!timelineEl || !statusHistory.length) return;

    // Clear existing timeline
    timelineEl.innerHTML = '';

    // Add status history items
    statusHistory.forEach((status, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item active';
        
        const statusDate = new Date(status.timestamp);
        const formattedDate = statusDate.toLocaleDateString();
        const formattedTime = statusDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        timelineItem.innerHTML = `
            <div class="timeline-icon">
                <i class="fas fa-check"></i>
            </div>
            <div class="timeline-content">
                <h4>${status.status}</h4>
                <p class="timeline-time">${formattedDate} at ${formattedTime}</p>
                ${status.location ? `<p class="timeline-location">${status.location}</p>` : ''}
            </div>
        `;

        timelineEl.appendChild(timelineItem);
    });

    // If no status history, show default
    if (statusHistory.length === 0) {
        timelineEl.innerHTML = `
            <div class="timeline-item active">
                <div class="timeline-icon">
                    <i class="fas fa-check"></i>
                </div>
                <div class="timeline-content">
                    <h4>Order Created</h4>
                    <p class="timeline-time">Order has been created and is being processed</p>
                </div>
            </div>
        `;
    }
}

// Update estimated delivery based on order creation date
function updateEstimatedDelivery(createdAt) {
    const deliveryInfoEl = document.querySelector('.delivery-info');
    if (!deliveryInfoEl || !createdAt) return;

    const orderDate = new Date(createdAt);
    const estimatedDate = new Date(orderDate.getTime() + (24 * 60 * 60 * 1000)); // Add 1 day
    
    const dateOptions = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    
    const timeOptions = {
        hour: '2-digit',
        minute: '2-digit'
    };

    const formattedDate = estimatedDate.toLocaleDateString('en-US', dateOptions);
    const formattedTime = estimatedDate.toLocaleTimeString('en-US', timeOptions);

    // Update the delivery info content
    const deliveryDateEl = deliveryInfoEl.querySelector('.delivery-date');
    const deliveryTimeEl = deliveryInfoEl.querySelector('.delivery-time');
    
    if (deliveryDateEl) {
        deliveryDateEl.textContent = formattedDate;
    }
    
    if (deliveryTimeEl) {
        deliveryTimeEl.textContent = `by ${formattedTime}`;
    }
}
