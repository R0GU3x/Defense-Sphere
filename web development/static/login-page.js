document.addEventListener("DOMContentLoaded", function() {
    const signInBtn = document.getElementById("sign-in-btn");
    const forgotPasswordLink = document.getElementById("forgot-password");
    const createAccountLink = document.getElementById("create-account");
    const googleBtn = document.querySelector(".google-btn");
    const microsoftBtn = document.querySelector(".microsoft-btn");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    signInBtn.addEventListener("click", function(event) {
        event.preventDefault();
        
        fetch("/login/data")
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })

        // collect json from /login/data that shows if the login is success or not
        // fetch("/login/data", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({ email, password })
        // })
        // .then(response => response.json())
        // .then(data => {
        //     console.log(data)
        // });

        // // fetch('/login/data')
        // //     .then(response => response.json())
        // //     .then(data => {
        // //         console.log(data);
        // //     });

        // // Add your sign in logic here
        // // For example, you can make an AJAX request to your server to verify the credentials
        // fetch('/login', {method: 'POST'})
        // .catch(error => {
        //     console.log(error);
        //     // Display an error message to the user
        //     alert('ERROR signing in');
        // });
        
    });

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
