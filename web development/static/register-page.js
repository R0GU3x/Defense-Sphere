ORIGNAL
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('register-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');


    form.addEventListener('submit', function(event) {
        let isValid = true;

        // Validate email
        if (!emailInput.value.match(/[a-z0-9._%+-]+@company\.com$/)) {
            alert('Please enter a valid company email address.');
            isValid = false;
        }


        // Validate password
        if (passwordInput.value.length < 8) {
            alert('Password must be at least 8 characters long.');
            isValid = false;
        }


        if (!isValid) {
            event.preventDefault();
        }
    });
});