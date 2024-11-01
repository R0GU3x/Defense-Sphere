document.addEventListener('DOMContentLoaded', function() {
    const passwordDisplay = document.getElementById('passwordDisplay');
    const strengthIndicator = document.getElementById('strengthIndicator');
    const generateBtn = document.getElementById('generateBtn');
    const lengthOption = document.getElementById('lengthOption');
    const passwordLength = document.getElementById('passwordLength');
    const upperOption = document.getElementById('upperOption');
    const lowerOption = document.getElementById('lowerOption');
    const numberOption = document.getElementById('numberOption');
    const symbolOption = document.getElementById('symbolOption');
    const symbols = document.getElementById('symbols');
    const wordOption = document.getElementById('wordOption');
    const addWord = document.getElementById('addWord');

    function assessPasswordStrength(password) {
        const length = password.length;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

        const varietyCount = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChars].filter(Boolean).length;

        if (length >= 14 && varietyCount === 4) return 'Very Strong';
        if (length >= 12 && varietyCount >= 3) return 'Strong';
        if (length >= 8 && varietyCount >= 2) return 'Good';
        if (length >= 6 && varietyCount >= 1) return 'Weak';
        return 'Very Weak';
    }

    function updatePasswordStrength() {
        const password = passwordDisplay.value;
        if (password === '') {
            strengthIndicator.textContent = '';
            strengthIndicator.className = 'strength-indicator';
        } else {
            const strength = assessPasswordStrength(password);
            strengthIndicator.textContent = strength;
            strengthIndicator.className = 'strength-indicator ' + strength.toLowerCase().replace(' ', '-');
        }
    }

    function showNotification(message) {
        // Remove existing notification if any
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
    
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        
        // Add check icon
        notification.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 6L9 17l-5-5"/>
            </svg>
            ${message}
        `;
    
        // Add to document
        document.body.appendChild(notification);
    
        // Trigger animation
        setTimeout(() => notification.classList.add('show'), 10);
    
        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    function copyPassword() {
        const password = passwordDisplay.value;
        if (password) {
            navigator.clipboard.writeText(password).then(() => {
                showNotification('Password copied to clipboard');
            }).catch(err => {
                console.error('Failed to copy password: ', err);
                showNotification('Failed to copy password');
            });
        }
    }
    
    // Add QR code generation function
function generateQRCode() {
    const password = passwordDisplay.value;
    if (!password) {
        showNotification('Please generate a password first');
        return;
    }

    // Create modal for QR code
    const modal = document.createElement('div');
    modal.className = 'qr-modal';
    modal.innerHTML = `
        <div class="qr-modal-content">
            <div class="qr-modal-header">
                <h3>Password QR Code</h3>
                <button class="close-modal">&times;</button>
            </div>
            <div id="qrcode"></div>
            <p class="qr-note">Scan to copy password</p>
        </div>
    `;

    document.body.appendChild(modal);

    // Generate QR code
    new QRCode(document.getElementById("qrcode"), {
        text: password,
        width: 200,
        height: 200,
        colorDark: "#0fffb3",  // Using your accent color
        colorLight: "#16213e", // Using your secondary color
    });

    // Close modal functionality
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.onclick = () => {
        modal.remove();
    };

    // Click outside to close
    modal.onclick = (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    };
}

// Add event listener to QR button
document.getElementById('generateqr').addEventListener('click', generateQRCode);
    // Add event listener to the copy button
    document.querySelector('.copy-btn').addEventListener('click', function(e) {
        e.preventDefault();
        copyPassword();
    });

    // event listener to the copy button
    document.querySelector('.copy-btn').addEventListener('click', function(e) {
        e.preventDefault(); // Prevent any default button behavior
        copyPassword();
    });
    
    passwordDisplay.addEventListener('input', updatePasswordStrength);

    function generatePassword() {
        let chars = '';
        let password = '';

        const length = lengthOption.checked ? parseInt(passwordLength.value) : 15;

        if (upperOption.checked) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (lowerOption.checked) chars += 'abcdefghijklmnopqrstuvwxyz';
        if (numberOption.checked) chars += '0123456789';
        if (symbolOption.checked) chars += symbols.value;

        for (let i = 0; i < length; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        if (wordOption.checked && addWord.value) {
            const word = addWord.value;
            const position = Math.floor(Math.random() * (password.length + 1));
            password = password.slice(0, position) + word + password.slice(position);
        }

        passwordDisplay.value = password;
        updatePasswordStrength();
    }

    generateBtn.addEventListener('click', generatePassword);

    // Initialize
    generatePassword();
});