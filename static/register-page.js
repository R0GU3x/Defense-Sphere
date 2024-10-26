document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('register-form');

    async function handleSubmit(event) {
        event.preventDefault();

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

        // Display popup with user ID
        showPopup(userData.userID);
    }

    function showPopup(userId) {
        const popup = document.createElement('div');
        popup.innerHTML = `
            <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 20px; border: 1px solid #ccc; box-shadow: 0 2px 10px rgba(0,0,0,0.1); z-index: 1000; border-radius: 10px;">
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
            navigator.clipboard.writeText(userId).then(function() {
                alert('User ID copied to clipboard!');
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