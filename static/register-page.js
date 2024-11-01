document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('register-form');
    const passwordInput = document.getElementById('password');
    const strengthIndicator = document.getElementById('strengthIndicator');

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
        const password = passwordInput.value;
        if (password === '') {
            strengthIndicator.textContent = '';
            strengthIndicator.className = 'strength-indicator';
        } else {
            const strength = assessPasswordStrength(password);
            strengthIndicator.textContent = strength;
            strengthIndicator.className = 'strength-indicator ' + strength.toLowerCase().replace(' ', '-');
        }
    }

    // Add event listener for password input
    passwordInput.addEventListener('input', updatePasswordStrength);

    async function handleSubmit(event) {
        event.preventDefault();

        // Get and disable the button
        const registerBtn = document.getElementById('register-btn');
        registerBtn.disabled = true;
        registerBtn.textContent = 'Creating your account...';
        registerBtn.style.opacity = '0.7';
        registerBtn.style.cursor = 'not-allowed';

        try {
            const formData = new FormData(form);

            // Prepare the data to be sent to the /register endpoint
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });

            // Send POST request to /register
            await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(data)
            });

            // Fetch user data after registration
            const response = await fetch("/register/data");
            const userData = await response.json();

            // Check if user already exists
            if (userData.userID === -1) {
                showError("This user already exists. Please login.");
                // Reset button state
                registerBtn.disabled = false;
                registerBtn.textContent = 'Create Your Account';
                registerBtn.style.opacity = '1';
                registerBtn.style.cursor = 'pointer';
            } else {
                showPopup(userData.userID);
                // Button will be reset when user closes popup or is redirected
            }
        } catch (error) {
            console.error('Registration error:', error);
            showError("An error occurred during registration. Please try again.");
            // Reset button state on error
            registerBtn.disabled = false;
            registerBtn.textContent = 'Create Your Account';
            registerBtn.style.opacity = '1';
            registerBtn.style.cursor = 'pointer';
        }
    }

    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.innerHTML = `
            <div style="position: fixed; top: 20px; left: 50%; transform: translateX(-50%); 
                        background: #fff3f3; padding: 15px 25px; border: 1px solid #ffcdd2; 
                        border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); z-index: 1000;">
                <p style="color: #d32f2f; margin: 0; font-size: 14px;">${message}</p>
            </div>
        `;
        document.body.appendChild(errorDiv);

        // Remove the error message after 5 seconds
        setTimeout(() => {
            document.body.removeChild(errorDiv);
        }, 5000);
    }

    function showPopup(userId) {
        const popup = document.createElement('div');
        popup.innerHTML = `
            <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white;
             padding: 20px; border: 1px solid #ccc; box-shadow: 0 2px 10px rgba(0,0,0,0.1); z-index: 1000; border-radius: 10px;">
                <h2>Registration Successful</h2>
                <p>Your account has been created. Please copy your User ID for future reference.</p>
                <p style="font-size: 24px; margin: 20px 0; text-align: center; letter-spacing: 2px; font-weight: bold;">${userId}</p>
                <div style="display: flex; justify-content: space-between; margin-top: 20px;">
                    <button id="copyButton" style="flex: 1; padding: 10px 20px; border: none; background-color: #007bff; color: white; border-radius: 5px; cursor: pointer; margin-right: 10px;">Copy User ID</button>
                    <button id="closeButton" style="flex: 1; padding: 10px 20px; border: 2px solid #007bff; background-color: white; color: #007bff; border-radius: 5px; cursor: pointer;">Close</button>
                </div>
            </div>
        `;
        document.body.appendChild(popup);

        document.getElementById('copyButton').addEventListener('click', function() {
            const copyButton = document.getElementById('copyButton');
            navigator.clipboard.writeText(userId).then(function() {
                copyButton.textContent = 'Copied';
            }).catch(function(err) {
                console.error('Failed to copy: ', err);
            });
        });

        document.getElementById('closeButton').addEventListener('click', function() {
            document.body.removeChild(popup);
            window.location.href = '/login';
        });
    }

    form.addEventListener('submit', handleSubmit);
});


// document.addEventListener('DOMContentLoaded', function() {
//     const form = document.getElementById('register-form');
//     const passwordInput = document.getElementById('password');
//     const strengthIndicator = document.getElementById('strengthIndicator');

//     function assessPasswordStrength(password) {
//         const length = password.length;
//         const hasUpperCase = /[A-Z]/.test(password);
//         const hasLowerCase = /[a-z]/.test(password);
//         const hasNumbers = /\d/.test(password);
//         const hasSpecialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

//         const varietyCount = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChars].filter(Boolean).length;

//         if (length >= 14 && varietyCount === 4) return 'Very Strong';
//         if (length >= 12 && varietyCount >= 3) return 'Strong';
//         if (length >= 8 && varietyCount >= 2) return 'Good';
//         if (length >= 6 && varietyCount >= 1) return 'Weak';
//         return 'Very Weak';
//     }

//     function updatePasswordStrength() {
//         const password = passwordInput.value;
//         if (password === '') {
//             strengthIndicator.textContent = '';
//             strengthIndicator.className = 'strength-indicator';
//         } else {
//             const strength = assessPasswordStrength(password);
//             strengthIndicator.textContent = strength;
//             strengthIndicator.className = 'strength-indicator ' + strength.toLowerCase().replace(' ', '-');
//         }
//     }

//     // Add event listener for password input
//     passwordInput.addEventListener('input', updatePasswordStrength);

//     async function handleSubmit(event) {
//         event.preventDefault();

//         //TODO creating your account... - disable button

//         const formData = new FormData(form);

//         // Prepare the data to be sent to the /register endpoint
//         const data = {};
//         formData.forEach((value, key) => {
//             data[key] = value;
//         });

//         // Send POST request to /register
//         await fetch('/register', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded',
//             },
//             body: new URLSearchParams(data)
//         });

//         // Fetch user data after registration
//         const response = await fetch("/register/data");
//         const userData = await response.json();

//         // Check if user already exists
//         if (userData.userID === -1) {
//             showError("This user already exists. Please login.");
//         } else {
//             //TODO revert back to normal
//             showPopup(userData.userID);
//         }
//     }

//     function showError(message) {
//         const errorDiv = document.createElement('div');
//         errorDiv.innerHTML = `
//             <div style="position: fixed; top: 20px; left: 50%; transform: translateX(-50%); 
//                         background: #fff3f3; padding: 15px 25px; border: 1px solid #ffcdd2; 
//                         border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); z-index: 1000;">
//                 <p style="color: #d32f2f; margin: 0; font-size: 14px;">${message}</p>
//             </div>
//         `;
//         document.body.appendChild(errorDiv);

//         // Remove the error message after 5 seconds
//         setTimeout(() => {
//             document.body.removeChild(errorDiv);
//         }, 5000);
//     }

//     function showPopup(userId) {
//         const popup = document.createElement('div');
//         popup.innerHTML = `
//             <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white;
//              padding: 20px; border: 1px solid #ccc; box-shadow: 0 2px 10px rgba(0,0,0,0.1); z-index: 1000; border-radius: 10px;">
//                 <h2>Registration Successful</h2>
//                 <p>Your account has been created. Please copy your User ID for future reference.</p>
//                 <p style="font-size: 24px; margin: 20px 0; text-align: center; letter-spacing: 2px; font-weight: bold;">${userId}</p>h
//                 <div style="display: flex; justify-content: space-between; margin-top: 20px;">
//                     <button id="copyButton" style="flex: 1; padding: 10px 20px; border: none; background-color: #007bff; color: white; border-radius: 5px; cursor: pointer; margin-right: 10px;">Copy User ID</button>
//                     <button id="closeButton" style="flex: 1; padding: 10px 20px; border: 2px solid #007bff; background-color: white; color: #007bff; border-radius: 5px; cursor: pointer;">Close</button>
//                 </div>
//             </div>
//         `;
//         document.body.appendChild(popup);

//         document.getElementById('copyButton').addEventListener('click', function() {
//             const copyButton = document.getElementById('copyButton');
//             navigator.clipboard.writeText(userId).then(function() {
//                 copyButton.textContent = 'Copied';
//             }).catch(function(err) {
//                 console.error('Failed to copy: ', err);
//             });
//         });

//         document.getElementById('closeButton').addEventListener('click', function() {
//             document.body.removeChild(popup);
//             window.location.href = '/login';
//         });
//     }

//     form.addEventListener('submit', handleSubmit);
// });
