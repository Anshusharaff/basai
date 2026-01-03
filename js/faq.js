// Basai - FAQ Page Functionality
// Accordion and Category Filtering

class FAQManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupAccordion();
        this.setupCategoryFilter();
        this.setupSearch();
    }

    setupAccordion() {
        const faqQuestions = document.querySelectorAll('.faq-question');

        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const faqItem = question.parentElement;
                const isOpen = faqItem.classList.contains('open');

                // Close all other FAQ items
                document.querySelectorAll('.faq-item').forEach(item => {
                    item.classList.remove('open');
                });

                // Toggle current item
                if (!isOpen) {
                    faqItem.classList.add('open');
                }
            });
        });
    }

    setupCategoryFilter() {
        const categoryButtons = document.querySelectorAll('.faq-category');
        const faqItems = document.querySelectorAll('.faq-item');

        categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                const category = button.dataset.category;

                // Update active button
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Filter FAQ items
                faqItems.forEach(item => {
                    if (category === 'all' || item.dataset.category === category) {
                        item.style.display = 'block';
                        // Animate in
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(10px)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });

                // Update results count
                this.updateResultsCount();
            });
        });
    }

    setupSearch() {
        const searchInput = document.getElementById('faq-search');
        if (!searchInput) return;

        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const faqItems = document.querySelectorAll('.faq-item');

            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question h3').textContent.toLowerCase();
                const answer = item.querySelector('.faq-answer p').textContent.toLowerCase();

                if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                    item.style.display = 'block';
                    // Highlight matching text
                    this.highlightText(item, searchTerm);
                } else {
                    item.style.display = 'none';
                }
            });

            // Update results count
            this.updateResultsCount();

            // Show no results message
            const visibleItems = Array.from(faqItems).filter(item =>
                item.style.display !== 'none'
            );

            if (visibleItems.length === 0 && searchTerm) {
                this.showNoResults();
            } else {
                this.hideNoResults();
            }
        });
    }

    highlightText(item, searchTerm) {
        if (!searchTerm) return;

        const question = item.querySelector('.faq-question h3');
        const answer = item.querySelector('.faq-answer p');

        [question, answer].forEach(element => {
            const originalText = element.textContent;
            const regex = new RegExp(`(${searchTerm})`, 'gi');
            const highlightedText = originalText.replace(regex, '<mark>$1</mark>');
            element.innerHTML = highlightedText;
        });
    }

    updateResultsCount() {
        const visibleItems = document.querySelectorAll('.faq-item[style*="display: block"], .faq-item:not([style*="display"])');
        const countElement = document.querySelector('.faq-results-count');

        if (countElement) {
            countElement.textContent = `${visibleItems.length} questions`;
        }
    }

    showNoResults() {
        let noResults = document.querySelector('.faq-no-results');
        if (!noResults) {
            noResults = document.createElement('div');
            noResults.className = 'faq-no-results';
            noResults.innerHTML = `
                <i class="fas fa-question-circle"></i>
                <h3>No FAQs Found</h3>
                <p>We couldn't find any questions matching your search.</p>
                <p>Try different keywords or <a href="contact.html">contact us</a> for help.</p>
            `;
            document.querySelector('.faq-list').appendChild(noResults);
        }
        noResults.style.display = 'block';
    }

    hideNoResults() {
        const noResults = document.querySelector('.faq-no-results');
        if (noResults) {
            noResults.style.display = 'none';
        }
    }
}

// Initialize FAQ Manager
if (document.querySelector('.faq-section')) {
    document.addEventListener('DOMContentLoaded', () => {
        new FAQManager();
    });
}

// Add smooth scroll to FAQ from external links
const urlParams = new URLSearchParams(window.location.search);
const faqId = urlParams.get('question');
if (faqId) {
    window.addEventListener('load', () => {
        const targetFaq = document.getElementById(faqId);
        if (targetFaq) {
            targetFaq.scrollIntoView({ behavior: 'smooth', block: 'center' });
            targetFaq.classList.add('open');
            targetFaq.classList.add('highlight');
            setTimeout(() => {
                targetFaq.classList.remove('highlight');
            }, 2000);
        }
    });
}
