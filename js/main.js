// Basai - Main JavaScript File
// Student Accommodation Management System

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    });
}

// Sticky Navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Search Form - Duration and Room Type
const searchContainer = document.querySelector('.search-container');
if (searchContainer) {
    const locationInput = searchContainer.querySelector('input[placeholder*="Location"]');
    const durationSelect = searchContainer.querySelector('select[option*="Duration"]');
    const searchBtn = searchContainer.querySelector('.btn-search');

    if (searchBtn) {
        searchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Collect search parameters
            const location = locationInput ? locationInput.value : '';
            const moveInDate = document.querySelector('input[type="date"]') ? document.querySelector('input[type="date"]').value : '';
            const duration = durationSelect ? durationSelect.value : '';

            // Redirect to browse page with parameters
            if (location || moveInDate || duration) {
                window.location.href = `hostels.html?location=${encodeURIComponent(location)}&date=${moveInDate}&duration=${duration}`;
            } else {
                window.location.href = 'hostels.html';
            }
        });
    }
}

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Hostel Card Favorite Toggle
document.querySelectorAll('.btn-favorite, .btn-wishlist').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        btn.classList.toggle('active');
        const icon = btn.querySelector('i');
        if (icon) {
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                showNotification('Added to favorites!');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                showNotification('Removed from favorites');
            }
        }
    });
});

// Image Gallery Lightbox
const galleryImages = document.querySelectorAll('.gallery-item img, .review-images img');
if (galleryImages.length > 0) {
    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            openLightbox(img.src);
        });
    });
}

function openLightbox(imageSrc) {
    // Create lightbox overlay
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox-overlay';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="lightbox-close">&times;</span>
            <img src="${imageSrc}" alt="Gallery Image">
        </div>
    `;
    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';

    // Close lightbox
    lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
        document.body.removeChild(lightbox);
        document.body.style.overflow = 'auto';
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            document.body.removeChild(lightbox);
            document.body.style.overflow = 'auto';
        }
    });
}

// Notification System
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Form Validation
function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');
            showError(field, 'This field is required');
        } else {
            field.classList.remove('error');
            clearError(field);
        }
    });

    // Email validation
    const emailFields = form.querySelectorAll('input[type="email"]');
    emailFields.forEach(field => {
        if (field.value && !isValidEmail(field.value)) {
            isValid = false;
            field.classList.add('error');
            showError(field, 'Please enter a valid email address');
        }
    });

    // Phone validation
    const phoneFields = form.querySelectorAll('input[type="tel"]');
    phoneFields.forEach(field => {
        if (field.value && !isValidPhone(field.value)) {
            isValid = false;
            field.classList.add('error');
            showError(field, 'Please enter a valid phone number');
        }
    });

    return isValid;
}

function showError(field, message) {
    let errorDiv = field.parentElement.querySelector('.error-message');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        field.parentElement.appendChild(errorDiv);
    }
    errorDiv.textContent = message;
}

function clearError(field) {
    const errorDiv = field.parentElement.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.remove();
    }
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
    return /^[0-9]{10}$/.test(phone.replace(/[\s-]/g, ''));
}

// Contact Form Submission
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateForm(contactForm)) {
            showNotification('Thank you! Your message has been sent successfully.');
            contactForm.reset();
        }
    });
}

// Review Helpful Button
document.querySelectorAll('.btn-helpful').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (!btn.classList.contains('clicked')) {
            btn.classList.add('clicked');
            const countSpan = btn.querySelector('span:last-child');
            if (countSpan) {
                const currentCount = parseInt(countSpan.textContent);
                countSpan.textContent = currentCount + 1;
            }
            showNotification('Thank you for your feedback!');
        }
    });
});

// Load More Reviews
const loadMoreBtn = document.querySelector('.btn-load-more');
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showNotification('Loading more reviews...');
        // Simulate loading
        setTimeout(() => {
            showNotification('No more reviews to load');
        }, 1000);
    });
}

// Price Range Slider
const priceSlider = document.getElementById('price-range');
const priceValue = document.getElementById('price-value');
if (priceSlider && priceValue) {
    priceSlider.addEventListener('input', (e) => {
        priceValue.textContent = `NPR ${parseInt(e.target.value).toLocaleString()}`;
    });
}

// Filter Toggle for Mobile
const filterToggle = document.querySelector('.filter-toggle');
const filterSidebar = document.querySelector('.filters-sidebar');
if (filterToggle && filterSidebar) {
    filterToggle.addEventListener('click', () => {
        filterSidebar.classList.toggle('active');
    });
}

// Animation on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .hostel-card, .testimonial-card, .stat-card').forEach(el => {
    observer.observe(el);
});

// Booking Summary Price Calculation
function updateBookingSummary() {
    const basePrice = parseFloat(document.querySelector('.base-price')?.textContent?.replace(/[^\d.]/g, '') || 0);
    const serviceFees = document.querySelectorAll('.service-option input:checked');
    let additionalCost = 0;

    serviceFees.forEach(service => {
        const priceText = service.closest('.service-option').querySelector('.service-price')?.textContent;
        if (priceText) {
            additionalCost += parseFloat(priceText.replace(/[^\d.]/g, ''));
        }
    });

    const totalElement = document.querySelector('.total-price');
    if (totalElement) {
        totalElement.textContent = `NPR ${(basePrice + additionalCost).toLocaleString()}`;
    }
}

// Listen for service changes
document.querySelectorAll('.service-option input').forEach(checkbox => {
    checkbox.addEventListener('change', updateBookingSummary);
});

console.log('Basai - Student Accommodation System loaded successfully');
