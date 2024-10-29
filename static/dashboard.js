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
        todaysMoney: data.ip,
        todaysUsers: 670,
        newClients: 809,
        totalSales: 7
    };

    // Update the HTML with the fetched data
    document.getElementById('todays-money').textContent = `${dashboardData.todaysMoney.toLocaleString()}`;
    document.getElementById('todays-users').textContent = dashboardData.todaysUsers.toLocaleString();
    document.getElementById('new-clients').textContent = dashboardData.newClients.toLocaleString();
    document.getElementById('total-sales').textContent = `$${dashboardData.totalSales.toLocaleString()}`;
}

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
