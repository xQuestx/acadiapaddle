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

// Add this to your existing script.js
document.addEventListener('DOMContentLoaded', function() {
    // FAQ Functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});

// Weather functionality
function updateWeather() {
    // Bar Harbor coordinates
    const latitude = 44.3876;
    const longitude = -68.2039;
    
    // First, get the forecast office and grid coordinates
    fetch(`https://api.weather.gov/points/${latitude},${longitude}`)
        .then(response => response.json())
        .then(data => {
            // Get the forecast URL from the response
            const forecastUrl = data.properties.forecast;
            return fetch(forecastUrl);
        })
        .then(response => response.json())
        .then(data => {
            const currentPeriod = data.properties.periods[0];
            
            const weatherIcon = document.querySelector('.weather-icon');
            const temp = document.querySelector('.temp');
            const description = document.querySelector('.description');
            const wind = document.querySelector('.wind');
            
            // Update the weather information
            temp.textContent = currentPeriod.temperature;
            description.textContent = currentPeriod.shortForecast;
            wind.textContent = `${currentPeriod.windSpeed}`;
            
            // Set weather icon based on the forecast
            weatherIcon.innerHTML = getWeatherIconNWS(currentPeriod.shortForecast);
        })
        .catch(error => {
            console.error('Error fetching weather:', error);
        });
}

function getWeatherIconNWS(forecast) {
    const lowerForecast = forecast.toLowerCase();
    
    if (lowerForecast.includes('sunny')) {
        return '<i class="fas fa-sun"></i>';
    } else if (lowerForecast.includes('clear')) {
        return '<i class="fas fa-moon"></i>';
    } else if (lowerForecast.includes('cloudy') && lowerForecast.includes('partly')) {
        return '<i class="fas fa-cloud-sun"></i>';
    } else if (lowerForecast.includes('cloudy')) {
        return '<i class="fas fa-cloud"></i>';
    } else if (lowerForecast.includes('rain') && lowerForecast.includes('light')) {
        return '<i class="fas fa-cloud-rain"></i>';
    } else if (lowerForecast.includes('rain')) {
        return '<i class="fas fa-cloud-showers-heavy"></i>';
    } else if (lowerForecast.includes('snow')) {
        return '<i class="fas fa-snowflake"></i>';
    } else if (lowerForecast.includes('thunder')) {
        return '<i class="fas fa-bolt"></i>';
    } else {
        return '<i class="fas fa-cloud"></i>';
    }
}

// Update weather when page loads
document.addEventListener('DOMContentLoaded', () => {
    updateWeather();
    // Update weather every hour
    setInterval(updateWeather, 3600000);
}); 