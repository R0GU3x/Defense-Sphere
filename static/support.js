document.addEventListener("DOMContentLoaded", function() {
    // Page transition logic
    const links = document.querySelectorAll('.transition-link');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default link behavior
            const targetUrl = this.getAttribute('href'); // Get the target URL

            // Fade out the current page
            gsap.to("body", {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    window.location.href = targetUrl; // Navigate to the new page
                }
            });
        });
    });
});
gsap.registerPlugin(ScrollTrigger);

    // Animate the welcome section
    gsap.from(".welcome", {
        scrollTrigger: {
            trigger: ".welcome",
            start: "top 80%", // Start animation when the top of the section is 80% from the top of the viewport
            toggleActions: "play none none reverse" // Play on enter, reverse on leave
        },
        opacity: 0,
        y: -80, // Move down 50px
        duration: 1
    });

    // Animate the support topics section
    gsap.from(".support-topics", {
        scrollTrigger: {
            trigger: ".support-topics",
            start: "top 80%", // Start animation when the top of the section is 80% from the top of the viewport
            toggleActions: "play none none reverse" // Play on enter, reverse on leave
        },
        opacity: 0,
        y: 80, // Move down 50px
        duration: 1
    });
document.addEventListener('DOMContentLoaded', function() {
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Hero section animation
    gsap.from('.hero h1, .hero p', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.2,
    });
    // Scam alert animation
    gsap.from('.scam-content', {
        scrollTrigger: {
            trigger: '.scam-alert',
            start: 'top 80%',
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out',
    });

    // FAQ section animation
    gsap.from('.faq-item', {
        scrollTrigger: {
            trigger: '.faq',
            start: 'top 80%',
        },
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power2.out',
    });
});


