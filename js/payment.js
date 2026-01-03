// Basai - Payment Page Functionality
// Payment Method Selection and Form Handling

class PaymentManager {
    constructor() {
        this.selectedMethod = null;
        this.init();
    }

    init() {
        this.setupPaymentMethodSelection();
        this.setupFormValidation();
        this.setupPaymentSubmission();
        this.loadOrderSummary();
    }

    setupPaymentMethodSelection() {
        const paymentOptions = document.querySelectorAll('.payment-option input[type="radio"]');

        paymentOptions.forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.selectedMethod = e.target.value;

                // Hide all payment details
                document.querySelectorAll('.payment-details').forEach(details => {
                    details.style.display = 'none';
                    details.style.maxHeight = '0';
                });

                // Show selected payment details
                const selectedDetails = e.target.closest('.payment-option').querySelector('.payment-details');
                if (selectedDetails) {
                    selectedDetails.style.display = 'block';
                    setTimeout(() => {
                        selectedDetails.style.maxHeight = selectedDetails.scrollHeight + 'px';
                    }, 10);
                }

                // Update payment button text
                this.updatePaymentButton();
            });
        });
    }

    updatePaymentButton() {
        const submitBtn = document.querySelector('.btn-submit-payment');
        if (!submitBtn) return;

        const methodNames = {
            'esewa': 'Pay with eSewa',
            'khalti': 'Pay with Khalti',
            'card': 'Pay with Card',
            'bank': 'Upload Payment Proof',
            'cash': 'Confirm Booking'
        };

        submitBtn.textContent = methodNames[this.selectedMethod] || 'Complete Payment';

        // Add method icon
        const icons = {
            'esewa': 'fa-wallet',
            'khalti': 'fa-mobile-alt',
            'card': 'fa-credit-card',
            'bank': 'fa-university',
            'cash': 'fa-money-bill-wave'
        };

        const icon = document.createElement('i');
        icon.className = `fas ${icons[this.selectedMethod]}`;
        submitBtn.prepend(icon);
        submitBtn.prepend(' ');
    }

    setupFormValidation() {
        // Card number formatting
        const cardNumber = document.getElementById('card-number');
        if (cardNumber) {
            cardNumber.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\s/g, '');
                let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
                e.target.value = formattedValue;

                // Validate card number
                this.validateCardNumber(value);
            });
        }

        // Expiry date formatting
        const expiryDate = document.getElementById('expiry-date');
        if (expiryDate) {
            expiryDate.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length >= 2) {
                    value = value.slice(0, 2) + '/' + value.slice(2, 4);
                }
                e.target.value = value;
            });
        }

        // CVV validation
        const cvv = document.getElementById('cvv');
        if (cvv) {
            cvv.addEventListener('input', (e) => {
                e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3);
            });
        }

        // Bank transfer file upload
        const fileUpload = document.getElementById('payment-receipt');
        if (fileUpload) {
            fileUpload.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    this.previewFile(file);
                }
            });
        }
    }

    validateCardNumber(cardNumber) {
        const cardType = this.getCardType(cardNumber);
        const cardIcon = document.querySelector('.card-type-icon');

        if (cardIcon) {
            if (cardType) {
                cardIcon.innerHTML = `<i class="fab fa-cc-${cardType}"></i>`;
                cardIcon.style.display = 'block';
            } else {
                cardIcon.style.display = 'none';
            }
        }

        // Luhn algorithm validation
        return this.luhnCheck(cardNumber);
    }

    getCardType(cardNumber) {
        const patterns = {
            'visa': /^4/,
            'mastercard': /^5[1-5]/,
            'amex': /^3[47]/,
            'discover': /^6(?:011|5)/
        };

        for (const [type, pattern] of Object.entries(patterns)) {
            if (pattern.test(cardNumber)) {
                return type;
            }
        }
        return null;
    }

    luhnCheck(cardNumber) {
        let sum = 0;
        let isEven = false;

        for (let i = cardNumber.length - 1; i >= 0; i--) {
            let digit = parseInt(cardNumber[i]);

            if (isEven) {
                digit *= 2;
                if (digit > 9) {
                    digit -= 9;
                }
            }

            sum += digit;
            isEven = !isEven;
        }

        return sum % 10 === 0;
    }

    previewFile(file) {
        const preview = document.querySelector('.file-preview');
        if (!preview) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            preview.innerHTML = `
                <div class="file-info">
                    <i class="fas fa-file-image"></i>
                    <span>${file.name}</span>
                    <span class="file-size">${(file.size / 1024).toFixed(2)} KB</span>
                </div>
            `;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }

    setupPaymentSubmission() {
        const paymentForm = document.querySelector('.payment-methods form');
        if (!paymentForm) return;

        paymentForm.addEventListener('submit', (e) => {
            e.preventDefault();

            if (!this.selectedMethod) {
                this.showError('Please select a payment method');
                return;
            }

            // Validate based on selected method
            if (!this.validatePaymentMethod()) {
                return;
            }

            // Process payment
            this.processPayment();
        });
    }

    validatePaymentMethod() {
        switch (this.selectedMethod) {
            case 'esewa':
                return this.validateESewa();
            case 'khalti':
                return this.validateKhalti();
            case 'card':
                return this.validateCard();
            case 'bank':
                return this.validateBankTransfer();
            case 'cash':
                return true;
            default:
                return false;
        }
    }

    validateESewa() {
        const phone = document.getElementById('esewa-phone');
        if (!phone || !phone.value) {
            this.showError('Please enter your eSewa phone number');
            return false;
        }
        return true;
    }

    validateKhalti() {
        const mobile = document.getElementById('khalti-mobile');
        const pin = document.getElementById('khalti-pin');
        if (!mobile || !mobile.value) {
            this.showError('Please enter your Khalti mobile number');
            return false;
        }
        if (!pin || !pin.value) {
            this.showError('Please enter your Khalti PIN');
            return false;
        }
        return true;
    }

    validateCard() {
        const cardNumber = document.getElementById('card-number');
        const cardName = document.getElementById('card-name');
        const expiryDate = document.getElementById('expiry-date');
        const cvv = document.getElementById('cvv');

        if (!cardNumber || !cardNumber.value) {
            this.showError('Please enter card number');
            return false;
        }
        if (!this.luhnCheck(cardNumber.value.replace(/\s/g, ''))) {
            this.showError('Invalid card number');
            return false;
        }
        if (!cardName || !cardName.value) {
            this.showError('Please enter cardholder name');
            return false;
        }
        if (!expiryDate || !expiryDate.value) {
            this.showError('Please enter expiry date');
            return false;
        }
        if (!cvv || !cvv.value || cvv.value.length < 3) {
            this.showError('Please enter valid CVV');
            return false;
        }
        return true;
    }

    validateBankTransfer() {
        const receipt = document.getElementById('payment-receipt');
        if (!receipt || !receipt.files || receipt.files.length === 0) {
            this.showError('Please upload payment receipt');
            return false;
        }
        return true;
    }

    processPayment() {
        // Show loading state
        const submitBtn = document.querySelector('.btn-submit-payment');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

        // Simulate payment processing
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;

            // Redirect to success page
            this.showSuccess();
        }, 2000);
    }

    showSuccess() {
        // Create success modal
        const modal = document.createElement('div');
        modal.className = 'payment-success-modal';
        modal.innerHTML = `
            <div class="success-content">
                <div class="success-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h2>Payment Successful!</h2>
                <p>Your accommodation has been booked successfully.</p>
                <p class="booking-ref">Booking Reference: <strong>#BSA${Date.now()}</strong></p>
                <div class="success-actions">
                    <a href="dashboard.html" class="btn btn-primary">View My Bookings</a>
                    <a href="index.html" class="btn btn-secondary">Back to Home</a>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        setTimeout(() => {
            modal.classList.add('show');
        }, 100);
    }

    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'payment-error';
        errorDiv.innerHTML = `
            <i class="fas fa-exclamation-triangle"></i>
            <span>${message}</span>
        `;

        const existingError = document.querySelector('.payment-error');
        if (existingError) {
            existingError.remove();
        }

        document.querySelector('.payment-methods').prepend(errorDiv);
        errorDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }

    loadOrderSummary() {
        // Load order details from session storage or URL params
        const urlParams = new URLSearchParams(window.location.search);
        const hostelName = urlParams.get('hostel') || 'Thamel Student House';
        const duration = urlParams.get('duration') || '6 Months';
        const price = urlParams.get('price') || '90,000';

        // Update order summary if elements exist
        const hostelNameEl = document.querySelector('.order-hostel-name');
        const durationEl = document.querySelector('.order-duration');
        const priceEl = document.querySelector('.order-price');

        if (hostelNameEl) hostelNameEl.textContent = hostelName;
        if (durationEl) durationEl.textContent = duration;
        if (priceEl) priceEl.textContent = `NPR ${price}`;
    }
}

// Initialize Payment Manager
if (document.querySelector('.payment-section')) {
    document.addEventListener('DOMContentLoaded', () => {
        new PaymentManager();
    });
}
