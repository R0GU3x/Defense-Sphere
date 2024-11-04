document.addEventListener('DOMContentLoaded', function() {
    const totalLogsElement = document.getElementById('totalLogs');
    const lastUpdatedElement = document.getElementById('lastUpdated');
    const activeUsersElement = document.getElementById('activeUsers');
    const logTableBody = document.getElementById('logTableBody');
    const prevPageBtn = document.getElementById('prevPage');
    const nextPageBtn = document.getElementById('nextPage');
    const currentPageElement = document.getElementById('currentPage');

    let currentPage = 1;
    const logsPerPage = 10;

    let logs = [];
    
    async function fetchLogs() {
        try {
            const response = await fetch('/dashboard/logs/data');
            if (!response.ok) {
                throw new Error('Failed to fetch logs');
            }
            logs = await response.json();
            renderLogs(); // redering the logs
            updateInfoPanel(); // Update info panel with new data
        } catch (error) {
            console.error('Error fetching logs:', error);
        }
    }

    // Initial fetch
    fetchLogs();

    // setInterval(fetchLogs, 30000); // Refresh every 30 seconds

    function updateInfoPanel() {
        totalLogsElement.textContent = logs.length;
        lastUpdatedElement.textContent = new Date().toLocaleString();
        activeUsersElement.textContent = Math.floor(Math.random() * 100) + 1; // Simulated active users
    }

    function renderLogs() {
        const startIndex = (currentPage - 1) * logsPerPage;
        const endIndex = startIndex + logsPerPage;
        const pageData = logs.slice(startIndex, endIndex);

        logTableBody.innerHTML = '';
        pageData.forEach(log => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${log.timestamp}</td>
                <td>${log.activity}</td>
            `;
            logTableBody.appendChild(row);
        });

        currentPageElement.textContent = `Page ${currentPage}`;
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = endIndex >= logs.length;
    }

    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderLogs();
        }
    });

    nextPageBtn.addEventListener('click', () => {
        if ((currentPage * logsPerPage) < logs.length) {
            currentPage++;
            renderLogs();
        }
    });

    // Initial render
    updateInfoPanel();
    renderLogs();

    // Simulated real-time updates
    setInterval(updateInfoPanel, 5000);
});