let isOpen = false;

window.toggleNotifications = function() {
    const notificationOverlay = document.getElementById('notificationOverlay');
    const notificationPopup = document.getElementById('notificationPopup');
    const notificationContent = document.getElementById('notificationContent');
    
    if (!isOpen) {
        // Open popup
        isOpen = true;
        notificationOverlay.style.display = 'block';
        setTimeout(() => {
            notificationPopup.classList.add('show');
        }, 10);
        
        // Show loading state
        notificationContent.innerHTML = '<p>Loading notifications...</p>';
        
        // Fetch notifications
        fetch('/notifications/data?action=display')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(notifications => {
                displayNotifications(notifications);
            })
            .catch(error => {
                console.error('Error fetching notifications:', error);
                notificationContent.innerHTML = `
                    <div class="notification-error">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                        <p>Error loading notifications</p>
                    </div>
                `;
            });
    } else {
        // Close popup
        isOpen = false;
        notificationPopup.classList.remove('show');
        setTimeout(() => {
            notificationOverlay.style.display = 'none';
        }, 300);
    }
}

window.clearNotifications = function() {
    // Send request to clear notifications
    // fetch('/notifications/clear', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     }
    // })
    fetch('/notifications/data?action=clear')
    .then(response => {
        // if (!response.ok) {
        //     throw new Error('Network response was not ok');
        // }
        // Update the UI to show empty state
        const notificationContent = document.getElementById('notificationContent');
        notificationContent.innerHTML = `
            <div class="notification-empty">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
                <p>No new notifications</p>
            </div>
        `;
    })
    .catch(error => {
        console.error('Error clearing notifications:', error);
        // Optionally show an error message to the user
        alert('Failed to clear notifications. Please try again.');
    });
}

function displayNotifications(notifications) {
    const notificationContent = document.getElementById('notificationContent');
    const clearButton = document.querySelector('.clear-button');
    
    if (!notifications || notifications.length === 0) {
        clearButton.style.display = 'none';
        notificationContent.innerHTML = `
            <div class="notification-empty">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
                <p>No new notifications</p>
            </div>
        `;
    } else {
        clearButton.style.display = 'flex';
        let html = '';
        notifications.forEach((message, index) => {
            html += `
                <div class="notification-item">
                    <div class="notification-content">
                        <p class="notification-message">${message}</p>
                    </div>
                    <button onclick="deleteNotification(${index})" class="delete-button">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M18 6L6 18"></path>
                            <path d="M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
            `;
        });
        notificationContent.innerHTML = html;
    }
}

// Close popup when clicking outside
document.addEventListener('DOMContentLoaded', function() {
    const notificationOverlay = document.getElementById('notificationOverlay');
    
    notificationOverlay.addEventListener('click', function(event) {
        if (event.target === notificationOverlay) {
            isOpen = false;
            notificationOverlay.style.display = 'none';
            document.getElementById('notificationPopup').classList.remove('show');
        }
    });

    // Close popup when pressing Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && isOpen) {
            isOpen = false;
            notificationOverlay.style.display = 'none';
            document.getElementById('notificationPopup').classList.remove('show');
        }
    });
});

// Add this new function to handle single notification deletion
window.deleteNotification = function(index) {
    fetch(`/notifications/data?action=remove&index=${index}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        toggleNotifications();
    })
    .catch(error => {
        console.error('Error deleting notification:', error);
        // Optionally show an error message to the user
        alert('Failed to delete notification. Please try again.');
    });
}
