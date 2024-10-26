document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    let prevScrollPos = window.pageYOffset;

    /* Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            targetElement.scrollIntoView({ behavior: 'smooth' });
        });
    }); */
    // Form submission
    const emailForm = document.getElementById('email-form');
    emailForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        // Here you would typically send the email to your server
        // For this example, we'll just show an alert
        alert(`Thank you for subscribing with email: ${email}`);
        emailInput.value = '';
    });

    // Add a scroll-to-top button
    const scrollToTopButton = document.createElement('button');
    scrollToTopButton.innerHTML = '&uarr;';
    scrollToTopButton.setAttribute('aria-label', 'Scroll to top');
    scrollToTopButton.id = 'scroll-to-top';
    document.body.appendChild(scrollToTopButton);

    scrollToTopButton.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Show/hide scroll-to-top button and navbar based on scroll position THIS SHITTY SECTION IS PREVENTING THE HYPERLINK TO WORK PROPERLY
    window.addEventListener('scroll', function() {
        const currentScrollPos = window.pageYOffset;

        if (currentScrollPos > 300) {
            scrollToTopButton.style.display = 'block';
        } else {
            scrollToTopButton.style.display = 'none';
        }

        if (prevScrollPos > currentScrollPos) {
            navbar.style.top = '0';
        } else {
            navbar.style.top = '-80px';
        }

        prevScrollPos = currentScrollPos;
    });
}); 

// additionalF stuff
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.additionalF-button');
    const additionalFs = document.querySelectorAll('.additionalF');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const additionalFId = button.getAttribute('data-additionalF');
            
            // Update active button
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Update active additionalF
            additionalFs.forEach(additionalF => {
                if (additionalF.id === additionalFId) {
                    additionalF.classList.add('active');
                } else {
                    additionalF.classList.remove('active');
                }
            });
        });
    });
});
/* for revealing box transition*/ 
document.addEventListener('DOMContentLoaded', function() {
    const stepBoxes = document.querySelectorAll('.step-box');

    stepBoxes.forEach(box => {
        box.addEventListener('mouseenter', function() {
            this.querySelector('.step-content').style.maxHeight = this.querySelector('.step-content').scrollHeight + 'px';
        });

        box.addEventListener('mouseleave', function() {
            this.querySelector('.step-content').style.maxHeight = '0';
        });
    });
});