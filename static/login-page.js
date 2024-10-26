document.addEventListener("DOMContentLoaded", function() {
    const signInBtn = document.getElementById("sign-in-btn");
    const forgotPasswordLink = document.getElementById("forgot-password");
    const createAccountLink = document.getElementById("create-account");
    const form = document.getElementById("login-form"); // Added form reference

    async function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(form);

        // Prepare the data to be sent to the /login endpoint
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Send POST request to /login
        const loginResponse = fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(data)
        });

        await fetch("/login/data")
            .then(response => response.json())
            .then(data => {
                if (data.response === 0) {
                    showMessage("Login successful", "success");
                    setTimeout(() => {
                        window.location.href = '/dashboard'; // Redirect to dashboard after successful login
                    }, 1500);
                } else {
                    showMessage("Invalid credentials", "error");
                }
            });
        
        return true;
    }

    function showMessage(message, type) {
        const messageDiv = document.createElement('div');
        const backgroundColor = type === 'success' ? '#e8f5e9' : '#fff3f3';
        const borderColor = type === 'success' ? '#a5d6a7' : '#ffcdd2';
        const textColor = type === 'success' ? '#2e7d32' : '#d32f2f';
        
        messageDiv.innerHTML = `
            <div style="position: fixed; top: 20px; left: 50%; transform: translateX(-50%); 
                        background: ${backgroundColor}; padding: 15px 25px; 
                        border: 1px solid ${borderColor}; 
                        border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); 
                        z-index: 1000;">
                <p style="color: ${textColor}; margin: 0; font-size: 14px;">${message}</p>
            </div>
        `;
        document.body.appendChild(messageDiv);

        // Remove the message after 3 seconds
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 3000);
    }

    forgotPasswordLink.addEventListener("click", function(event) {
        event.preventDefault();
        const email = emailInput.value;

        // Add your forgot password logic here
        // For example, you can make an AJAX request to your server to send a password reset email
        fetch('/forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log("Password reset email sent");
                // Display a success message to the user
                alert("Password reset email sent");
            } else {
                console.log("Error sending password reset email");
                // Display an error message to the user
                alert("Error sending password reset email");
            }
        })
        .catch(error => {
            console.log("Error sending password reset email");
            // Display an error message to the user
            alert("Error sending password reset email");
        });
    });

    createAccountLink.addEventListener("click", function(event) {
        event.preventDefault();
        // Add your create account logic here
        // For example, you can redirect to the sign up page
        window.location.href = '/register';
    });

    form.addEventListener('submit', handleSubmit);
});
