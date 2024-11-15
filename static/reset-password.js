document.addEventListener('DOMContentLoaded', function() {
    // Get the password input element
    const passwordInput = document.getElementById('password');
    const strengthIndicator = document.getElementById('strengthIndicator');
    const resetForm = document.getElementById('reset-password-form');

    // Log password as user types
    passwordInput.addEventListener('input', function() {
        console.log('Password input:', this.value);
        
        // Optional: Add password strength indicator
        const strength = checkPasswordStrength(this.value);
        strengthIndicator.className = 'strength-indicator ' + strength;
    });

    // Log form submission
    resetForm.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Reset password form submitted with:', {
            password: passwordInput.value
        });
    });

    // Password strength checker function
    function checkPasswordStrength(password) {
        if (password.length === 0) return 'empty';
        if (password.length < 8) return 'weak';
        
        let strength = 0;
        if (password.match(/[a-z]/)) strength++;
        if (password.match(/[A-Z]/)) strength++;
        if (password.match(/[0-9]/)) strength++;
        if (password.match(/[^a-zA-Z0-9]/)) strength++;

        if (strength < 2) return 'weak';
        if (strength < 3) return 'medium';
        return 'strong';
    }
});