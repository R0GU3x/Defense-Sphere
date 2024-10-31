document.addEventListener('DOMContentLoaded', function() {
    // Fetch and display dashboard data
    fetchDashboardData();

    // Create the sales chart
    createSalesChart();
});

async function fetchDashboardData() {
    // Simulating an API call to fetch dashboard data
    // In a real-world scenario, you would make an actual API request here
    let data = await fetch('/dashboard/data')
    .then(response => response.json())
    
    console.log(data)
    const dashboardData = {
        ip: 0,
        todaysUsers: 670,
        newClients: 809
        //vpnConnection: "Connected"
    };

    // Update the HTML with the fetched data
    // document.getElementById('ip').textContent = `${dashboardData.ip.toLocaleString()}`;
    document.getElementById('todays-users').textContent = dashboardData.todaysUsers.toLocaleString();
    document.getElementById('new-clients').textContent = dashboardData.newClients.toLocaleString();
    // document.getElementById('vpn').textContent = `${dashboardData.vpnConnection.toLocaleString()}`;
}
// //VPN funtion
// async function toggleVPN() {
//     const currentVpnLabel = document.getElementById('vpn').textContent
//     // Add VPN logic here
//     document.getElementById('vpn').textContent = 'Processing...';
    
//         if (currentVpnLabel === 'Not Connected') {
//             postData = 1;
//         } else {
//             postData = 0;
//             document.getElementById('vpn').textContent = 'Not Connected';
//         }

//         await fetch('/vpn', {
//                 method: 'POST',
//                 headers: {'Content-Type': 'application/json'},
//                 body: JSON.stringify(postData),
//         })
//         .then(response => response.json())
//         .then(data => {
//             document.getElementById('vpn').textContent = 'Connected';
//             setUserLocation(data);
//         })
            
//     }

// Modify the existing toggleVPN function
async function toggleVPN() {
    const vpnElement = document.getElementById('vpn');
    const currentVpnLabel = vpnElement.textContent;
    vpnElement.textContent = 'Processing...';
    
    let postData;
    if (currentVpnLabel === 'Not Connected') {
        postData = 1;
        showPopup();
    } else {
        postData = 0;
        vpnElement.textContent = 'Not Connected';
    }

    try {
        const response = await fetch('/vpn', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(postData),
        });
        const data = await response.json();
        vpnElement.textContent = postData === 1 ? 'Connected' : 'Not Connected';
        setUserLocation(data);
    } catch (error) {
        console.error('Error toggling VPN:', error);
        vpnElement.textContent = currentVpnLabel;
    }
}

// Add this new function to handle the popup
function showPopup() {
    const popup = document.getElementById('vpn-popup');
    popup.classList.add('show');
    setTimeout(() => {
        popup.classList.remove('show');
    }, 8000);
}

// Make sure this event listener is added to ensure the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const vpnCard = document.querySelector('.stat-card[onclick="toggleVPN()"]');
    if (vpnCard) {
        vpnCard.addEventListener('click', toggleVPN);
    }
});
// VAlidity function
function switchValidator(index) {
    // Update wrapper position
    const wrapper = document.querySelector('.validator-wrapper');
    wrapper.style.transform = `translateX(-${index * 33.333}%)`;
    
    // Update dots
    const dots = document.querySelectorAll('.dot');
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
}

function validateEmail() {
    const email = document.getElementById('emailInput').value;
    const resultDiv = document.getElementById('emailResult');

    fetch('/dashboard/validate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: email})
    })

    .then(response => response.json())
    .then(data => {
        console.log(data)
        if (data === 1) {
            resultDiv.innerHTML = `<span style="color: #0fffb3">✓ Valid email  address</span>`;
        } else{
            resultDiv.innerHTML = `<span style="color: #ff4d4d">✗ Invalid email address</span>`;
        }
    })
}

function validatePhone() {
    const country = document.getElementById('countryCode').value;
    const phone = document.getElementById('phoneInput').value;
    const resultDiv = document.getElementById('phoneResult');
    
    // if (phoneRegex.test(phone)) {
    //     resultDiv.innerHTML = `<span style="color: #0fffb3">✓ Valid phone number</span>`;
    // } else {
    //     resultDiv.innerHTML = `<span style="color: #ff4d4d">✗ Invalid phone number</span>`;
    // }

    fetch('/dashboard/validate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({country: country, phone: phone})
    })

    .then(response => response.json())
    .then(data => {
        console.log(data)
        if (data === 1) {
            resultDiv.innerHTML = `<span style="color: #0fffb3">✓ Valid Phone Number</span>`;
        } else{
            resultDiv.innerHTML = `<span style="color: #ff4d4d">✗ Invalid Phone Number</span>`;
        }
    })

}

function validateIBAN() {
    const iban = document.getElementById('ibanInput').value.replace(/\s/g, '');
    const resultDiv = document.getElementById('ibanResult');
    
    // if (ibanRegex.test(iban)) {
    //     resultDiv.innerHTML = `<span style="color: #0fffb3">✓ Valid IBAN format</span>`;
    // } else {
    //     resultDiv.innerHTML = `<span style="color: #ff4d4d">✗ Invalid IBAN format</span>`;
    // }

    fetch('/dashboard/validate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({iban: iban})
    })

    .then(response => response.json())
    .then(data => {
        console.log(data)
        if (data === 1) {
            resultDiv.innerHTML = `<span style="color: #0fffb3">✓ Valid IBAN </span>`;
        } else{
            resultDiv.innerHTML = `<span style="color: #ff4d4d">✗ Invalid IBAN </span>`;
        }
    })
}

function setUserLocation(data) {
    document.getElementById('ip').textContent = data.query;
    document.getElementById('user-country').textContent = data.country;
    document.getElementById('user-region').textContent = data.regionName + ', ' + data.city;
}

// Call this when the document loads
document.addEventListener('DOMContentLoaded', async function() {
    // setUserLocation(data);
    await fetch('/vpn', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(0),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        setUserLocation(data);
    })
});

function createSalesChart() {
    const ctx = document.getElementById('sales-chart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Sales 2021',
                data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56],
                borderColor: '#64ffda',
                tension: 0.4,
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#ccd6f6'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#ccd6f6'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}
