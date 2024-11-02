document.addEventListener('DOMContentLoaded', function() {
    const contentInput = document.getElementById('contentInput');
    const checkBtn = document.getElementById('checkBtn');
    const resultContainer = document.getElementById('result');

    checkBtn.addEventListener('click', async function() {
        const content = contentInput.value.trim();
        
        if (!content) {
            alert('Please enter a URL or email content to check');
            return;
        }

        // Show loading state
        checkBtn.disabled = true;
        checkBtn.textContent = 'Checking...';
        resultContainer.style.display = 'none';

        try {
            const response = await fetch('/dashboard/phishing', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content })
            });

            const data = await response.json();

            console.log(data)
            
            // Display result
            resultContainer.style.display = 'block';
            
            if (data === 'safe') {
                resultContainer.className = 'result-container safe';
                resultContainer.textContent = 'This content appears to be safe!';
                resultContainer.style.backgroundColor = '#4ade80';  // green
                resultContainer.style.color = '#166534';  // dark green
            } else {
                resultContainer.className = 'result-container danger';
                resultContainer.textContent = 'Warning: This content may be malicious!';
                resultContainer.style.backgroundColor = '#f87171';  // red
                resultContainer.style.color = '#991b1b';  // dark red 
            }

        } catch (error) {
            resultContainer.style.display = 'block';
            resultContainer.className = 'result-container danger';
            // resultContainer.textContent = 'An error occurred while checking the content. Please try again.';
            resultContainer.textContent = error;
        } finally {
            // Reset button state
            checkBtn.disabled = false;
            checkBtn.textContent = 'Check';
        }
    });
});