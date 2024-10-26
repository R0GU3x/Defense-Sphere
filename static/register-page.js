document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('register-form');

    async function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(form);

        // Prepare the data to be sent to the /login endpoint
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Send POST request to /login
        const loginResponse = fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(data)
        });

        await fetch("/register/data")
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        
        return true;
    }

});