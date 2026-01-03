// Basai - Booking Page Functionality
// Multi-step form and booking management

class BookingManager {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 3;
        this.bookingData = {};
        this.init();
    }

    init() {
        this.setupStepNavigation();
        this.setupFormValidation();
        this.setupServiceSelection();
        this.loadBookingDetails();
        this.calculatePrices();
    }

    setupStepNavigation() {
        const nextButtons = document.querySelectorAll('.btn-next-step');
        const prevButtons = document.querySelectorAll('.btn-prev-step');

        nextButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                if (this.validateCurrentStep()) {
                    this.goToStep(this.currentStep + 1);
                }
            });
        });

        prevButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.goToStep(this.currentStep - 1);
            });
        });

        // Step number clicks
        document.querySelectorAll('.step-number').forEach((step, index) => {
            step.addEventListener('click', () => {
                if (index < this.currentStep) {
                    this.goToStep(index + 1);
                }
            });
        });
    }

    goToStep(step) {
        if (step < 1 || step > this.totalSteps) return;

        // Hide all sections
        document.querySelectorAll('.booking-card-section').forEach(section => {
            section.style.display = 'none';
        });

        // Show target section
        const targetSection = document.querySelector(`[data-step="${step}"]`);
        if (targetSection) {
            targetSection.style.display = 'block';
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        // Update step indicators
        document.querySelectorAll('.step').forEach((stepEl, index) => {
            if (index < step) {
                stepEl.classList.add('completed');
                stepEl.classList.remove('active');
            } else if (index === step - 1) {
                stepEl.classList.add('active');
                stepEl.classList.remove('completed');
            } else {
                stepEl.classList.remove('active', 'completed');
            }
        });

        this.currentStep = step;
    }

    validateCurrentStep() {
        const currentSection = document.querySelector(`[data-step="${this.currentStep}"]`);
        if (!currentSection) return false;

        const requiredFields = currentSection.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
                this.showFieldError(field, 'This field is required');
            } else {
                field.classList.remove('error');
                this.clearFieldError(field);
            }
        });

        // Email validation
        const emailFields = currentSection.querySelectorAll('input[type="email"]');
        emailFields.forEach(field => {
            if (field.value && !this.isValidEmail(field.value)) {
                isValid = false;
                field.classList.add('error');
                this.showFieldError(field, 'Please enter a valid email');
            }
        });

        // Phone validation
        const phoneFields = currentSection.querySelectorAll('input[type="tel"]');
        phoneFields.forEach(field => {
            if (field.value && !this.isValidPhone(field.value)) {
                isValid = false;
                field.classList.add('error');
                this.showFieldError(field, 'Please enter a valid phone number');
            }
        });

        if (!isValid) {
            const firstError = currentSection.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstError.focus();
            }
        }

        return isValid;
    }

    showFieldError(field, message) {
        let errorDiv = field.parentElement.querySelector('.field-error');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'field-error';
            field.parentElement.appendChild(errorDiv);
        }
        errorDiv.textContent = message;
    }

    clearFieldError(field) {
        const errorDiv = field.parentElement.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    isValidPhone(phone) {
        return /^[0-9]{10}$/.test(phone.replace(/[\s-]/g, ''));
    }

    setupFormValidation() {
        const form = document.querySelector('.booking-form');
        if (!form) return;

        // Real-time validation
        form.querySelectorAll('input, select, textarea').forEach(field => {
            field.addEventListener('blur', () => {
                if (field.hasAttribute('required') && !field.value.trim()) {
                    field.classList.add('error');
                    this.showFieldError(field, 'This field is required');
                } else {
                    field.classList.remove('error');
                    this.clearFieldError(field);
                }
            });

            field.addEventListener('input', () => {
                if (field.classList.contains('error') && field.value.trim()) {
                    field.classList.remove('error');
                    this.clearFieldError(field);
                }
            });
        });

        // Form submission
        const submitBtn = document.querySelector('.btn-submit-booking');
        if (submitBtn) {
            submitBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (this.validateCurrentStep()) {
                    this.submitBooking();
                }
            });
        }
    }

    setupServiceSelection() {
        const serviceCheckboxes = document.querySelectorAll('.service-option input[type="checkbox"]');

        serviceCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.calculatePrices();
            });
        });
    }

    calculatePrices() {
        // Base price from room selection
        const basePriceEl = document.querySelector('.price-base');
        let basePrice = 0;

        if (basePriceEl) {
            basePrice = parseFloat(basePriceEl.textContent.replace(/[^\d.]/g, ''));
        }

        // Additional services
        let servicesCost = 0;
        document.querySelectorAll('.service-option input[type="checkbox"]:checked').forEach(checkbox => {
            const priceText = checkbox.closest('.service-option').querySelector('.service-price')?.textContent;
            if (priceText) {
                servicesCost += parseFloat(priceText.replace(/[^\d.]/g, ''));
            }
        });

        // Security deposit
        const securityDeposit = basePrice * 1; // One month's rent

        // Calculate totals
        const subtotal = basePrice + servicesCost;
        const tax = subtotal * 0.13; // 13% VAT
        const total = subtotal + tax + securityDeposit;

        // Update display
        this.updatePriceDisplay('subtotal', subtotal);
        this.updatePriceDisplay('services', servicesCost);
        this.updatePriceDisplay('tax', tax);
        this.updatePriceDisplay('deposit', securityDeposit);
        this.updatePriceDisplay('total', total);
    }

    updatePriceDisplay(className, amount) {
        const element = document.querySelector(`.price-${className}`);
        if (element) {
            element.textContent = `NPR ${amount.toLocaleString('en-NP', { maximumFractionDigits: 0 })}`;
        }
    }

    loadBookingDetails() {
        // Load from URL parameters or session storage
        const urlParams = new URLSearchParams(window.location.search);

        this.bookingData = {
            hostelId: urlParams.get('hostel_id'),
            hostelName: urlParams.get('hostel') || 'Thamel Student House',
            roomType: urlParams.get('room') || 'Single Room',
            moveInDate: urlParams.get('date') || '',
            duration: urlParams.get('duration') || '6 Months',
            price: parseFloat(urlParams.get('price') || '90000')
        };

        // Populate summary sidebar
        const hostelNameEl = document.querySelector('.summary-hostel-name');
        const roomTypeEl = document.querySelector('.summary-room-type');
        const moveInDateEl = document.querySelector('.summary-move-in');
        const durationEl = document.querySelector('.summary-duration');
        const basePriceEl = document.querySelector('.price-base');

        if (hostelNameEl) hostelNameEl.textContent = this.bookingData.hostelName;
        if (roomTypeEl) roomTypeEl.textContent = this.bookingData.roomType;
        if (moveInDateEl) moveInDateEl.textContent = this.bookingData.moveInDate || 'Not selected';
        if (durationEl) durationEl.textContent = this.bookingData.duration;
        if (basePriceEl) {
            basePriceEl.textContent = `NPR ${this.bookingData.price.toLocaleString()}`;
        }

        // Populate form if data exists in sessionStorage
        const savedData = sessionStorage.getItem('bookingFormData');
        if (savedData) {
            const formData = JSON.parse(savedData);
            this.populateForm(formData);
        }
    }

    populateForm(data) {
        Object.keys(data).forEach(key => {
            const field = document.querySelector(`[name="${key}"]`);
            if (field) {
                field.value = data[key];
            }
        });
    }

    submitBooking() {
        // Collect all form data
        const formData = new FormData(document.querySelector('.booking-form'));
        const bookingData = {
            ...this.bookingData,
            guestInfo: {},
            arrivalInfo: {},
            selectedServices: []
        };

        // Collect guest information
        formData.forEach((value, key) => {
            if (key.startsWith('guest-')) {
                bookingData.guestInfo[key.replace('guest-', '')] = value;
            } else if (key.startsWith('arrival-')) {
                bookingData.arrivalInfo[key.replace('arrival-', '')] = value;
            }
        });

        // Collect selected services
        document.querySelectorAll('.service-option input[type="checkbox"]:checked').forEach(checkbox => {
            bookingData.selectedServices.push(checkbox.value);
        });

        // Save to sessionStorage
        sessionStorage.setItem('bookingData', JSON.stringify(bookingData));

        // Show loading
        const submitBtn = document.querySelector('.btn-submit-booking');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

        // Simulate API call
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;

            // Redirect to payment page
            const price = document.querySelector('.price-total')?.textContent.replace(/[^\d]/g, '') || '90000';
            window.location.href = `payment.html?hostel=${encodeURIComponent(this.bookingData.hostelName)}&duration=${encodeURIComponent(this.bookingData.duration)}&price=${price}`;
        }, 1500);
    }
}

// Initialize Booking Manager
if (document.querySelector('.booking-section')) {
    document.addEventListener('DOMContentLoaded', () => {
        new BookingManager();
    });
}

// Auto-save form data
window.addEventListener('beforeunload', () => {
    const form = document.querySelector('.booking-form');
    if (form) {
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        sessionStorage.setItem('bookingFormData', JSON.stringify(data));
    }
});
