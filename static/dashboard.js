document.addEventListener('DOMContentLoaded', function() {
    // Simulating user data
    // document.getElementById('user-name').textContent = 'John Doe';

    // Slider functionality
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.slider-dots');
    let currentSlide = 0;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    function goToSlide(n) {
        slides[currentSlide].classList.remove('active');
        document.querySelectorAll('.dot')[currentSlide].classList.remove('active');
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        document.querySelectorAll('.dot')[currentSlide].classList.add('active');
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    // Auto-advance slides every 5 seconds
    setInterval(nextSlide, 5000);
});