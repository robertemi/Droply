// Pricing page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize pricing tabs
    initPricingTabs();
    
    // Initialize price calculator
    initPriceCalculator();
    
    // Initialize FAQs accordion
    initAccordion();
    
    // Add section animations
    initSectionAnimations();
    
    // Add sticky header functionality
    initStickyHeader();
    
    // Initialize micro-interactions
    initMicroInteractions();
});

// Handle tab switching between customer and driver pricing
function initPricingTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const pricingContents = document.querySelectorAll('.pricing-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all tabs
            tabBtns.forEach(tab => tab.classList.remove('active'));
            
            // First fade out the current content
            pricingContents.forEach(content => {
                if (!content.classList.contains('hidden')) {
                    content.classList.add('fade-out');
                    
                    // After fade-out animation completes, hide old content and show new
                    setTimeout(() => {
                        // Hide all pricing content
                        pricingContents.forEach(c => {
                            c.classList.add('hidden');
                            c.classList.remove('fade-out');
                        });
                        
                        // Add active class to current tab
                        btn.classList.add('active');
                        
                        // Show selected pricing content with fade-in
                        const selectedTab = btn.getAttribute('data-tab');
                        const newContent = document.getElementById(selectedTab + '-pricing');
                        newContent.classList.remove('hidden');
                        newContent.classList.add('fade-in');
                    }, 300);
                }
            });
            
            // If all are hidden (first load), show selected immediately
            if (Array.from(pricingContents).every(content => content.classList.contains('hidden'))) {
                btn.classList.add('active');
                const selectedTab = btn.getAttribute('data-tab');
                const content = document.getElementById(selectedTab + '-pricing');
                content.classList.remove('hidden');
                content.classList.add('fade-in');
            }
        });
    });
}

// Handle price calculator functionality
function initPriceCalculator() {
    const weightSelect = document.getElementById('package-weight');
    const distanceInput = document.getElementById('distance');
    const distanceValue = document.getElementById('distance-value');
    const speedSelect = document.getElementById('delivery-speed');
    const calculateBtn = document.getElementById('calculate-btn');
    const citySelect = document.getElementById('city-select');
    
    // Update distance value display when slider moves
    distanceInput.addEventListener('input', () => {
        distanceValue.textContent = distanceInput.value;
        // Real-time calculation as user drags slider
        calculateDeliveryPrice();
    });
    
    // Calculate when weight changes
    weightSelect.addEventListener('change', () => {
        calculateDeliveryPrice();
    });
    
    // Calculate when speed changes
    speedSelect.addEventListener('change', () => {
        calculateDeliveryPrice();
    });
    
    // Calculate price when button is clicked
    calculateBtn.addEventListener('click', () => {
        calculateDeliveryPrice();
        // Add a highlight effect when button is clicked
        document.querySelector('.calculator-result').classList.add('highlight');
        setTimeout(() => {
            document.querySelector('.calculator-result').classList.remove('highlight');
        }, 700);
    });
    
    // Update distance slider and value when city is selected
    if (citySelect) {
        citySelect.addEventListener('change', () => {
            const selectedValue = citySelect.value;
            if (selectedValue !== 'custom') {
                // Set the distance slider to the selected city's distance
                const cityDistance = parseInt(selectedValue);
                distanceInput.value = cityDistance;
                distanceValue.textContent = cityDistance;
                
                // Calculate delivery price with the new distance
                calculateDeliveryPrice();
            }
        });
    }
    
    // Initial calculation
    calculateDeliveryPrice();
    
    function calculateDeliveryPrice() {
        // Get input values
        const weight = parseInt(weightSelect.value);
        const distance = parseInt(distanceInput.value);
        const speed = speedSelect.value;
        
        // Base pricing
        let baseFee = speed === 'express' ? 12 : 3;
        let distanceRate = speed === 'express' ? 0.40 : 0.50;
        let weightSurcharge = 0;
          // Add weight surcharges
        if (weight > 5 && weight <= 10) {
            weightSurcharge = 2;
        } else if (weight > 10 && weight <= 20) {
            weightSurcharge = 5;
        } else if (weight > 20) {
            weightSurcharge = 10;
        }
        
        // Calculate components
        const distanceFee = distance * distanceRate;
        const totalPrice = baseFee + distanceFee + weightSurcharge;
        
        // Update display
        document.getElementById('price-amount').textContent = totalPrice.toFixed(2) + ' RON';
        document.getElementById('base-fee').textContent = baseFee.toFixed(2) + ' RON';
        document.getElementById('distance-fee').textContent = distanceFee.toFixed(2) + ' RON';
        document.getElementById('weight-fee').textContent = weightSurcharge.toFixed(2) + ' RON';
        
        // Animate the price change
        animatePriceChange();
    }
    
    function animatePriceChange() {
        const priceElement = document.getElementById('price-amount');
        priceElement.classList.add('price-updated');
        
        setTimeout(() => {
            priceElement.classList.remove('price-updated');
        }, 600);
    }
}

// Handle FAQ accordion
function initAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            // Toggle active class for the current header
            header.classList.toggle('active');
            
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
    const sections = document.querySelectorAll('.pricing-plans, .price-calculator, .pricing-faq, .contact-section, .cta-section');
    
    // Check visibility when page loads
    checkSectionVisibility(sections);
    
    // Check visibility on scroll
    window.addEventListener('scroll', () => {
        checkSectionVisibility(sections);
    });
    
    function checkSectionVisibility(sections) {
        const windowHeight = window.innerHeight;
        const triggerPoint = windowHeight * 0.85;
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            
            if (sectionTop < triggerPoint) {
                section.classList.add('fade-in');
            }
        });
    }
}

// Handle form submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const company = document.getElementById('company').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;
            
            // Construct email body
            const emailBody = `Name: ${name}
                            Company: ${company}
                            Phone: ${phone}
                            Email: ${email}
                            Message: ${message}
`;
            
            // Create mailto link
            const mailtoLink = `mailto:droply55@gmail.com?subject=Custom Solution Request - ${company}&body=${encodeURIComponent(emailBody)}`;
            
            // Create a success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <div class="success-content">
                    <i class="fas fa-check-circle"></i>
                    <h3>Thank you for your interest!</h3>
                    <p>Your email client will open to send your request.</p>
                    <p>If it doesn't open automatically, <a href="${mailtoLink}">click here</a>.</p>
                </div>
            `;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Clear the form
            this.reset();
            
            // Show success message
            const formContainer = this.parentElement;
            formContainer.appendChild(successMessage);
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        });
    }
});

// Add sticky header effect
function initStickyHeader() {
    const header = document.querySelector('.site-header');
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

// Add micro-interactions to pricing page elements
function initMicroInteractions() {
    // Add hover effect for pricing cards
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            pricingCards.forEach(c => {
                if (c !== card) c.style.opacity = '0.7';
            });
        });
        
        card.addEventListener('mouseleave', () => {
            pricingCards.forEach(c => {
                c.style.opacity = '1';
            });
        });
    });
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.button, .tab-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.classList.add('ripple');
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}
