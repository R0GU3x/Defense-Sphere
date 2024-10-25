ORIGNAL
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('register-form');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');

    form.addEventListener('submit', function(event) {
        let isValid = true;

        // Validate email
        if (!emailInput.value.match(/[a-z0-9._%+-]+@company\.com$/)) {
            alert('Please enter a valid company email address.');
            isValid = false;
        }

        // Validate phone number (if provided)
        if (phoneInput.value && !phoneInput.value.match(/[+][0-9]{1,3}[0-9]{6,14}/)) {
            alert('Please enter a valid phone number with country code (e.g., +1234567890).');
            isValid = false;
        }

        // Validate password
        if (passwordInput.value.length < 8) {
            alert('Password must be at least 8 characters long.');
            isValid = false;
        }

        // Confirm password
        if (passwordInput.value !== confirmPasswordInput.value) {
            alert('Passwords do not match.');
            isValid = false;
        }

        if (!isValid) {
            event.preventDefault();
        }
    });
});

// VERCEL CODE
// document.addEventListener('DOMContentLoaded', function() {
//     const form = document.getElementById('register-form');
//     const emailInput = document.getElementById('email');
//     const passwordInput = document.getElementById('password');
//     const countdownOverlay = document.getElementById('countdown-overlay');
//     const countdownElement = document.getElementById('countdown');

//     // Ensure the overlay is hidden when the page loads
//     countdownOverlay.classList.add('hidden');

//     form.addEventListener('submit', function(event) {
//         event.preventDefault();
//         let isValid = true;

//         // Validate email
//         if (!emailInput.value.match(/[a-z0-9._%+-]+@company\.com$/)) {
//             alert('Please enter a valid company email address.');
//             isValid = false;
//         }

//         // Validate password
//         if (passwordInput.value.length < 8) {
//             alert('Password must be at least 8 characters long.');
//             isValid = false;
//         }

//         if (isValid) {
//             // Show countdown overlay
//             countdownOverlay.classList.remove('hidden');
            
//             // Start countdown
//             let countdown = 3;
//             countdownElement.textContent = countdown;
            
//             const countdownInterval = setInterval(function() {
//                 countdown--;
//                 countdownElement.textContent = countdown;
                
//                 if (countdown <= 0) {
//                     clearInterval(countdownInterval);
//                     // Redirect to login page
//                     window.location.href = 'login.html';
//                 }
//             }, 1000);
//         }
//     });
// });

