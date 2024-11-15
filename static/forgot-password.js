document.addEventListener('DOMContentLoaded', function() {
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    const userIdGroup = document.getElementById('user-id-group');
    const usernameGroup = document.getElementById('username-group');
    const resetForm = document.getElementById('reset-form');

    toggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            toggleBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            // Show/hide appropriate input
            if (this.dataset.input === 'user-id') {
                userIdGroup.style.display = 'block';
                usernameGroup.style.display = 'none';
                document.getElementById('username').value = ''; // Clear username input
            } else {
                userIdGroup.style.display = 'none';
                usernameGroup.style.display = 'block';
                document.getElementById('user-id').value = ''; // Clear user-id input
            }
        });
    });


    resetForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevents form from submitting normally
        
        const activeInput = document.querySelector('.toggle-btn.active').dataset.input;
        const inputValue = activeInput === 'user-id' 
            ? document.getElementById('user-id').value 
            : document.getElementById('username').value;
        const dataType = activeInput === 'user-id' ? 1 : 2;
        const data = {type: dataType, value: inputValue}

        console.log(data)

        fetch('/forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

    });
});