document.addEventListener('DOMContentLoaded', function() {
    generateCalendar();
    updateProgress(75);
    createCircularGraphs();
});

function generateCalendar() {
    const calendar = document.getElementById('calendar');
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    days.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.textContent = day;
        dayElement.classList.add('calendar-day');
        calendar.appendChild(dayElement);
    });

    for (let i = 1; i <= 31; i++) {
        const dateElement = document.createElement('div');
        dateElement.textContent = i;
        dateElement.classList.add('calendar-day');
        calendar.appendChild(dateElement);
    }
}

function updateProgress(percent) {
    const progressBar = document.getElementById('project-progress');
    const progressText = document.getElementById('progress-text');
    progressBar.style.width = percent + '%';
    progressText.textContent = percent + '% Complete';
}


time_interval = 2
function createCircularGraphs() {
    // Object to hold references to the charts
    const charts = {};

    function fetchData() {
        fetch('/dashboard/data')
            .then(response => response.json())
            .then(data => {

                const graphData = [
                    { id: 'network-usage', value: data.net || 75, color: '#FF6384', label: 'Network Usage' },
                    { id: 'cpu-usage', value: data.cpu || 10, color: '#36A2EB', label: 'CPU Usage' },
                    { id: 'memory-usage', value: data.ram || 91, color: '#FFCE56', label: 'Memory Usage' },
                    { id: 'misc-graph', value: data.rom || 100, color: '#4BC0C0', label: 'Misc Usage' }
                ];

                graphData.forEach(data => {
                    const ctx = document.getElementById(data.id).getContext('2d');

                    // Check if the chart already exists
                    if (charts[data.id]) {
                        // Update existing chart data
                        charts[data.id].data.datasets[0].data[0] = data.value; // Update the value
                        charts[data.id].data.datasets[0].data[1] = 100 - data.value; // Update the remaining value
                        charts[data.id].update(); // Refresh the chart
                    } else {
                        // Create new chart if it doesn't exist
                        const chart = new Chart(ctx, {
                            type: 'doughnut',
                            data: {
                                labels: [data.label, 'Remaining'],
                                datasets: [{
                                    data: [data.value, 100 - data.value],
                                    backgroundColor: [data.color, '#E0E0E0'],
                                    borderWidth: 0
                                }]
                            },
                            options: {
                                cutout: '70%',
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        display: false
                                    },
                                    tooltip: {
                                        enabled: false
                                    }
                                }
                            }
                        });

                        // Store the chart instance in the charts object
                        charts[data.id] = chart;
                    }

                    // Update percentage text in the center
                    const container = document.getElementById(data.id).parentNode;
                    const textElement = container.querySelector('.percentage-text') || document.createElement('div');
                    textElement.className = 'percentage-text'; // Add a class for easy selection
                    textElement.style.position = 'absolute';
                    textElement.style.top = '50%';
                    textElement.style.left = '50%';
                    textElement.style.transform = 'translate(-50%, -50%)';
                    textElement.style.fontSize = '24px';
                    textElement.style.fontWeight = 'bold';
                    textElement.textContent = `${data.value}%`;
                    container.style.position = 'relative';
                    container.appendChild(textElement);
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    // Initial fetch
    fetchData();

    // Set interval to fetch data every second (1000 milliseconds)
    setInterval(fetchData, time_interval*1000);
}