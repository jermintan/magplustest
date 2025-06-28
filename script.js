// --- The ONE correct function to load all hero content ---
function loadHeroContent() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;

    const workerUrl = 'https://magplus-cms-v2.uxjermin.workers.dev';

    fetch(workerUrl + '/')
        .then(response => {
            if (!response.ok) { throw new Error('Network response was not ok'); }
            return response.json();
        })
        .then(data => {
            // Check if data and properties exist before trying to use them
            if (data && data.imageUrl) {
                // Use the new property name: imageUrl
                heroSection.style.backgroundImage = `linear-gradient(rgba(13, 71, 161, 0.7), rgba(233, 30, 99, 0.7)), url('${data.imageUrl}')`;
            }
            if (data && data.headline) {
                // Set the headline text
                document.querySelector('.hero h1').textContent = data.headline;
            }
            if (data && data.subtext) {
                // Set the subtext
                document.querySelector('.hero p').textContent = data.subtext;
            }
        })
        .catch(error => console.error('Error loading hero content:', error));
}


// --- The ONE main event listener that runs when the page loads ---
document.addEventListener('DOMContentLoaded', function() {
    
    // Action 1: Always try to load the dynamic hero content
    loadHeroContent();

    // Action 2: Setup the hamburger menu
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const mainNav = document.querySelector('.main-nav');
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', function() {
            mainNav.classList.toggle('active');
        });
    }

    // Action 3: Setup the product filter ONLY if filter controls exist on the page
    const filterContainer = document.querySelector('.filter-controls');
    if (filterContainer) {
        const filterButtons = filterContainer.querySelectorAll('.filter-btn');
        const productCards = document.querySelectorAll('#product-grid .product-card');

        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter');

                productCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    card.style.display = (filterValue === 'all' || filterValue === cardCategory) ? 'block' : 'none';
                });
            });
        });
    }
});