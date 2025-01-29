document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('main-header');
    const featureTabs = document.querySelectorAll('.feature-tab');
    const featureDetails = document.querySelectorAll('.feature-detail');
    const shield = document.getElementById('animated-shield');
    const featureCards = document.querySelectorAll('.feature-card');
    const tipCards = document.querySelectorAll('.tip-card');
    const testimonialCard = document.querySelector('.testimonial-card');
    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Animated shield
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop) {
            // Scrolling down
            shield.style.animation = 'rotate 10s linear infinite';
        } else {
            // Scrolling up
            shield.style.animation = 'float 3s ease-in-out infinite';
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });

    // Intersection Observer for fade-in effect
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    // Observe feature cards
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        fadeInObserver.observe(card);
    });

    // Observe tip cards
    tipCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translate 0.5s ease, transform 0.5s ease';
        fadeInObserver.observe(card);
    });

    // Observe testimonial card
    testimonialCard.style.opacity = '0';
    testimonialCard.style.transform = 'scale(0.9)';
    testimonialCard.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    fadeInObserver.observe(testimonialCard);

    // Email form submission
    const emailForm = document.getElementById('email-form');
    emailForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for subscribing!');
        emailForm.reset();
    });

    // Feature tabs functionality
    featureTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const feature = tab.getAttribute('data-feature');
            featureTabs.forEach(t => t.classList.remove('active'));
            featureDetails.forEach(d => d.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(feature).classList.add('active');
        });
    });
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});