// Basai - Filters and Search Functionality
// For Browse Accommodations Page

class HostelFilter {
    constructor() {
        this.hostels = [];
        this.filteredHostels = [];
        this.init();
    }

    init() {
        this.setupFilterListeners();
        this.setupSortListeners();
        this.setupSearchListener();
        this.loadHostels();
    }

    setupSearchListener() {
        // Search input
        const searchInput = document.getElementById('hostel-search');
        const searchButton = document.querySelector('.btn-search-full');

        if (searchInput) {
            searchInput.addEventListener('input', () => this.applyFilters());
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.applyFilters();
                }
            });
        }

        if (searchButton) {
            searchButton.addEventListener('click', () => this.applyFilters());
        }
    }

    setupFilterListeners() {
        // Location checkboxes
        document.querySelectorAll('.filter-checkbox input[name="location"]').forEach(checkbox => {
            checkbox.addEventListener('change', () => this.applyFilters());
        });

        // Price range slider
        const priceSlider = document.querySelector('.price-slider');
        if (priceSlider) {
            priceSlider.addEventListener('input', (e) => {
                // Update display if there's a price value element
                const priceValue = document.getElementById('price-value');
                if (priceValue) {
                    priceValue.textContent = `NPR ${parseInt(e.target.value).toLocaleString()}`;
                }
            });
            priceSlider.addEventListener('change', () => this.applyFilters());
        }

        // Room type checkboxes
        document.querySelectorAll('.filter-checkbox input[name="room-type"]').forEach(checkbox => {
            checkbox.addEventListener('change', () => this.applyFilters());
        });

        // Amenities checkboxes
        document.querySelectorAll('.filter-checkbox input[name="amenity"]').forEach(checkbox => {
            checkbox.addEventListener('change', () => this.applyFilters());
        });

        // Gender preference (if exists)
        document.querySelectorAll('.filter-radio[name="gender"]').forEach(radio => {
            radio.addEventListener('change', () => this.applyFilters());
        });

        // Rating filter
        document.querySelectorAll('.filter-checkbox input[name="rating"]').forEach(checkbox => {
            checkbox.addEventListener('change', () => this.applyFilters());
        });

        // Hostel type filter
        document.querySelectorAll('.filter-checkbox input[name="type"]').forEach(checkbox => {
            checkbox.addEventListener('change', () => this.applyFilters());
        });

        // Clear filters button
        const clearBtn = document.querySelector('.btn-clear-filters');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.clearAllFilters());
        }
    }

    setupSortListeners() {
        const sortSelect = document.getElementById('sort-select');
        if (sortSelect) {
            sortSelect.addEventListener('change', () => this.sortHostels());
        }
    }

    loadHostels() {
        // Get all hostel cards
        const hostelCards = document.querySelectorAll('.hostel-list-item');
        this.hostels = Array.from(hostelCards).map(card => {
            const nameElement = card.querySelector('h3');
            const locationElement = card.querySelector('.hostel-list-location span');
            const priceElement = card.querySelector('.price-amount');
            const ratingElement = card.querySelector('.hostel-list-rating span');

            return {
                element: card,
                name: nameElement?.textContent || '',
                location: locationElement?.textContent || '',
                price: this.extractPrice(priceElement?.textContent || ''),
                rating: parseFloat(ratingElement?.textContent.split('(')[0] || '0'),
                amenities: this.extractAmenities(card),
                roomType: this.extractRoomType(card),
                gender: card.dataset.gender || 'mixed'
            };
        });
        this.filteredHostels = [...this.hostels];
    }

    extractPrice(priceText) {
        const match = priceText.match(/[\d,]+/);
        return match ? parseInt(match[0].replace(/,/g, '')) : 0;
    }

    extractAmenities(card) {
        const amenities = [];
        card.querySelectorAll('.hostel-list-features span').forEach(span => {
            const text = span.textContent.toLowerCase();
            if (text.includes('wifi')) amenities.push('wifi');
            if (text.includes('parking')) amenities.push('parking');
            if (text.includes('breakfast')) amenities.push('breakfast');
            if (text.includes('ac') || text.includes('conditioning')) amenities.push('ac');
            if (text.includes('laundry')) amenities.push('laundry');
            if (text.includes('gym')) amenities.push('gym');
        });
        return amenities;
    }

    extractRoomType(card) {
        const roomTypes = [];
        const text = card.textContent.toLowerCase();
        if (text.includes('single')) roomTypes.push('single');
        if (text.includes('shared') || text.includes('double')) roomTypes.push('shared');
        if (text.includes('dorm')) roomTypes.push('dormitory');
        return roomTypes;
    }

    applyFilters() {
        this.filteredHostels = this.hostels.filter(hostel => {
            // Search filter
            const searchTerm = document.getElementById('hostel-search')?.value.toLowerCase().trim() || '';
            if (searchTerm) {
                const matchesSearch = hostel.name.toLowerCase().includes(searchTerm) ||
                    hostel.location.toLowerCase().includes(searchTerm);
                if (!matchesSearch) return false;
            }

            // Location filter
            const selectedLocations = this.getCheckedValues('location');
            if (selectedLocations.length > 0) {
                const matchesLocation = selectedLocations.some(loc =>
                    hostel.location.toLowerCase().includes(loc.toLowerCase())
                );
                if (!matchesLocation) return false;
            }

            // Price filter
            const maxPrice = parseInt(document.getElementById('price-range')?.value || 50000);
            if (hostel.price > maxPrice) return false;

            // Room type filter
            const selectedRoomTypes = this.getCheckedValues('room-type');
            if (selectedRoomTypes.length > 0) {
                const matchesRoomType = selectedRoomTypes.some(type =>
                    hostel.roomType.includes(type.toLowerCase())
                );
                if (!matchesRoomType) return false;
            }

            // Amenities filter
            const selectedAmenities = this.getCheckedValues('amenities');
            if (selectedAmenities.length > 0) {
                const hasAllAmenities = selectedAmenities.every(amenity =>
                    hostel.amenities.some(a => a.includes(amenity.toLowerCase()))
                );
                if (!hasAllAmenities) return false;
            }

            // Gender filter
            const selectedGender = document.querySelector('.filter-radio[name="gender"]:checked')?.value;
            if (selectedGender && selectedGender !== 'any' && hostel.gender !== selectedGender) {
                return false;
            }

            // Rating filter
            const selectedRatings = this.getCheckedValues('rating');
            if (selectedRatings.length > 0) {
                const minRating = Math.min(...selectedRatings.map(r => parseFloat(r)));
                if (hostel.rating < minRating) return false;
            }

            return true;
        });

        this.sortHostels();
        this.displayResults();
    }

    getCheckedValues(name) {
        const checked = document.querySelectorAll(`.filter-checkbox input[name="${name}"]:checked, .filter-radio[name="${name}"]:checked`);
        return Array.from(checked).map(cb => cb.value);
    }

    sortHostels() {
        const sortBy = document.getElementById('sort-select')?.value || 'popular';

        switch (sortBy) {
            case 'price-low':
                this.filteredHostels.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                this.filteredHostels.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                this.filteredHostels.sort((a, b) => b.rating - a.rating);
                break;
            case 'popular':
            default:
                // Keep original order or sort by rating
                this.filteredHostels.sort((a, b) => b.rating - a.rating);
                break;
        }

        this.displayResults();
    }

    displayResults() {
        const hostelList = document.querySelector('.hostels-list');
        if (!hostelList) return;

        // Hide all hostels
        this.hostels.forEach(hostel => {
            hostel.element.style.display = 'none';
        });

        // Show filtered hostels
        this.filteredHostels.forEach(hostel => {
            hostel.element.style.display = 'grid';
        });

        // Update results count
        const resultsHeader = document.querySelector('.results-header h3');
        if (resultsHeader) {
            resultsHeader.textContent = `${this.filteredHostels.length} hostels found`;
        }

        // Show no results message
        if (this.filteredHostels.length === 0) {
            let noResults = hostelList.querySelector('.no-results');
            if (!noResults) {
                noResults = document.createElement('div');
                noResults.className = 'no-results';
                noResults.style.cssText = 'text-align: center; padding: 3rem; grid-column: 1/-1;';
                noResults.innerHTML = `
                    <i class="fas fa-search" style="font-size: 3rem; color: var(--text-gray); margin-bottom: 1rem;"></i>
                    <h3>No hostels found</h3>
                    <p>Try adjusting your filters or search criteria</p>
                    <button class="btn btn-primary btn-clear-filters" style="margin-top: 1rem;">Clear Filters</button>
                `;
                hostelList.appendChild(noResults);
                noResults.querySelector('.btn-clear-filters').addEventListener('click', () => {
                    this.clearAllFilters();
                });
            }
            noResults.style.display = 'block';
        } else {
            const noResults = hostelList.querySelector('.no-results');
            if (noResults) {
                noResults.style.display = 'none';
            }
        }
    }

    clearAllFilters() {
        // Clear search input
        const searchInput = document.getElementById('hostel-search');
        if (searchInput) {
            searchInput.value = '';
        }

        // Uncheck all checkboxes
        document.querySelectorAll('.filter-checkbox input[type="checkbox"]').forEach(cb => cb.checked = false);

        // Reset radio buttons
        document.querySelectorAll('.filter-radio').forEach(radio => {
            if (radio.value === 'any') radio.checked = true;
        });

        // Reset price slider
        const priceSlider = document.querySelector('.price-slider');
        if (priceSlider) {
            priceSlider.value = priceSlider.max;
        }

        // Reset sort
        const sortSelect = document.getElementById('sort-select');
        if (sortSelect) {
            sortSelect.value = 'popular';
        }

        // Reapply filters (which will show all)
        this.applyFilters();
    }
}

// Initialize filter system when DOM is ready
if (document.querySelector('.browse-section')) {
    document.addEventListener('DOMContentLoaded', () => {
        new HostelFilter();
    });
}
