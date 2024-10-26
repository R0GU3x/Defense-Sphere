document.addEventListener("DOMContentLoaded", function() {
    const signInBtn = document.getElementById("sign-in-btn");
    const forgotPasswordLink = document.getElementById("forgot-password");
    const createAccountLink = document.getElementById("create-account");

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
            console.log(data);
        })
        
        return true;
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
    });
