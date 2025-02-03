// Intersection Observer for fade-in animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

// Apply fade-in to elements
document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
});

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Image gallery modal
document.querySelectorAll('.gallery-img').forEach(image => {
    image.addEventListener('click', () => {
        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <img src="${image.src}" alt="${image.alt}">
            </div>
        `;
        document.body.appendChild(modal);
        
        modal.querySelector('.close-modal').onclick = () => {
            modal.remove();
        };
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add loading animation to Book Now button
document.querySelectorAll('.book-now').forEach(button => {
    button.addEventListener('click', function(e) {
        this.classList.add('loading');
        setTimeout(() => {
            this.classList.remove('loading');
        }, 2000);
    });
});

// Typing effect
function setupTypingEffect() {
    const element = document.querySelector('.typing-text');
    
    // Only run the typing effect if the element exists
    if (element) {
        const texts = ['Experience Acadia', 'From the Water', 'Book Now'];
        let textIndex = 0;
        
        function typeText() {
            const text = texts[textIndex];
            let charIndex = 0;
            
            function type() {
                if (charIndex < text.length) {
                    element.textContent += text.charAt(charIndex);
                    charIndex++;
                    setTimeout(type, 100);
                } else {
                    setTimeout(erase, 2000);
                }
            }
            
            function erase() {
                if (element.textContent.length > 0) {
                    element.textContent = element.textContent.slice(0, -1);
                    setTimeout(erase, 50);
                } else {
                    textIndex = (textIndex + 1) % texts.length;
                    setTimeout(type, 500);
                }
            }
            
            type();
        }
        
        typeText();
    }
}

// Parallax effect
window.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('.parallax');
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const offset = window.pageYOffset * speed;
        element.style.transform = `translateY(${offset}px)`;
    });
});

// Initialize all effects
document.addEventListener('DOMContentLoaded', () => {
    setupTypingEffect();
    setupReviewSlider();
});

// Add this to your existing script.js
document.addEventListener('DOMContentLoaded', function() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and panes
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            // Add active class to clicked button and corresponding pane
            btn.classList.add('active');
            document.getElementById(btn.dataset.tab).classList.add('active');
        });
    });
});

// Add this to your existing script.js
function setupReviewSlider() {
    const container = document.querySelector('.reviews-container');
    const cards = document.querySelectorAll('.review-card');
    const prevBtn = document.querySelector('.prev-review');
    const nextBtn = document.querySelector('.next-review');
    let currentIndex = 0;

    if (!container || !cards.length) return;

    // Hide all cards except the first one
    cards.forEach((card, index) => {
        if (index !== 0) card.style.display = 'none';
    });

    function showCard(index) {
        cards.forEach(card => card.style.display = 'none');
        cards[index].style.display = 'block';
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        showCard(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % cards.length;
        showCard(currentIndex);
    });
} 