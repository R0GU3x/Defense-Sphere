// Ensure GSAP is loaded before this script
gsap.registerPlugin(ScrollTrigger);
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

document.addEventListener("DOMContentLoaded", function() {
    // GSAP animation for the hero section
    gsap.from(".hero .container", {
        duration: 2,
        opacity: 0,
        y: -80,
        ease: "power2.out"
    });
});
// Function to animate sections
const animateSections = () => {
    const sections = document.querySelectorAll('.hero, .about-section');

    sections.forEach(section => {
        gsap.from(section, {
            opacity: 0,
            y: 50, // Move down 50px
            duration: 1,
            scrollTrigger: {
                trigger: section,
                start: "top 80%", // Start animation when the top of the section is 80% from the top of the viewport
                toggleActions: "play none none reverse" // Play on enter, reverse on leave
            }

        });
    });
};

// Call the function to animate sections
animateSections();