document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('main-header');
    const featureTabs = document.querySelectorAll('.feature-tab');
    const featureDetails = document.querySelectorAll('.feature-detail');
    const emailForm = document.getElementById('email-form');

    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
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

    // Email form submission
    emailForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for subscribing!');
        emailForm.reset();
    });

    // GSAP animations
    gsap.registerPlugin(ScrollTrigger);

    // Hero section animation
    gsap.from('#hero h1, #hero p, #hero .cta-button', {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out'
    });

    // Feature cards animation
    // gsap.from('.feature-card', {
    //     scrollTrigger: {
    //         trigger: '#features',
    //         start: 'top bottom-=100px',
    //         toggleActions: 'play none none none'
    //     },
    //     opacity: 0,
    //     y: 30,
    //     stagger: 0.2,
    //     duration: 0.8,
    //     ease: 'power2.out'
    // });

    // Testimonial animation
    gsap.from('.testimonial-card', {
        scrollTrigger: {
            trigger: '#testimonial',
            start: 'top 80%'
        },
        opacity: 0,
        scale: 0.8,
        duration: 1,
        ease: 'power3.out'
    });

    // CTA section animation
    gsap.from('#cta h2, #cta p, #email-form', {
        scrollTrigger: {
            trigger: '#cta',
            start: 'top 80%'
        },
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out'
    });

    // Security tips animation
    gsap.from('.tip-card', {
        scrollTrigger: {
            trigger: '#security-tips',
            start: 'top 80%'
        },
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power2.out'
    });

    setTimeout(() => {
        ScrollTrigger.refresh();
    }, 100);
});