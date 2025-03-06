// Sample initial rules
let firewallRules = [];

// Fetch rules from the backend
async function fetchFirewallRules() {
    try {
        const response = await fetch('/firewall/show-rules');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched rules:', data); // Log fetched data
        firewallRules = data;
        renderRules(firewallRules);
    } catch (error) {
        console.error('Error fetching firewall rules:', error);
    }
}

// Initialize table
async function initializeTable() {
    await fetchFirewallRules();
}

// Render rules in table
function renderRules(rules) {
    const tableBody = document.getElementById('rulesTableBody');
    tableBody.innerHTML = '';

    const rulesArray = Array.isArray(rules) ? rules : [rules];

    rulesArray.forEach(rule => {
        const row = document.createElement('tr');
        const ruleName = rule["Rule Name"] ? rule["Rule Name"].replace(/\[ICEBOX\]\s*/, '') : 'N/A'; // Strip "ICEBOX" prefix
        row.innerHTML = `
            <td>
                <span class="status-badge status-${rule.Enabled === "Yes" ? 'enabled' : 'disabled'}">
                    ${rule.Enabled === "Yes" ? 'Enabled' : 'Disabled'}
                </span>
            </td>
            <td>${ruleName}</td>
            <td>${rule.Direction || 'N/A'}</td>
            <td>${rule.LocalIP || 'N/A'}:${rule.LocalPort || 'N/A'}</td>
            <td>${rule.Protocol ? rule.Protocol.toUpperCase() : 'N/A'}</td>
            <td>
                <button class="action-btn" onclick="toggleRule(${rule.id})">
                    ${rule.Enabled === "Yes" ? 'Disable' : 'Enable'}
                </button>
                <button class="action-btn" onclick="deleteRule(${rule.id})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Filter rules
function filterRules() {
    const searchText = document.getElementById('searchInput').value.toLowerCase();
    const statusFilter = document.getElementById('statusFilter').value;

    const filteredRules = firewallRules.filter(rule => {
        const matchesSearch = rule["Rule Name"].toLowerCase().includes(searchText);
        const matchesStatus = statusFilter === 'all' || 
            (statusFilter === 'enabled' && rule.Enabled === "Yes") ||
            (statusFilter === 'disabled' && rule.Enabled === "No");
        return matchesSearch && matchesStatus;
    });

    renderRules(filteredRules);
}

// Toggle rule status
function toggleRule(id) {
    const rule = firewallRules.find(r => r.id === id);
    if (rule) {
        rule.Enabled = rule.Enabled === "Yes" ? "No" : "Yes"; // Toggle the Enabled status
        renderRules(firewallRules); // Re-render the rules
    }
}

// Delete rule
function deleteRule(id) {
    if (confirm('Are you sure you want to delete this rule?')) {
        firewallRules = firewallRules.filter(rule => rule.id !== id); // Remove the rule
        renderRules(firewallRules); // Re-render the rules
    }
}

// Show add rule modal
function showAddRuleModal() {
    document.getElementById('addRuleModal').style.display = 'block';
}

// Close modal
function closeModal() {
    document.getElementById('addRuleModal').style.display = 'none';
}

// Add new rule
document.getElementById('addRuleForm').addEventListener('submit', async function(e) {
    // e.preventDefault(); // Prevent the default form submission

    // Collect input data and send it to the server
    const newRule = {
        ruleName: document.getElementById('ruleName').value,
        direction: document.getElementById('direction').value,
        action: document.getElementById('action').value,
        localIpAddress: document.getElementById('localIpAddress').value,
        localPort: parseInt(document.getElementById('localPort').value),
        remoteIpAddress: document.getElementById('remoteIpAddress').value,
        remotePort: parseInt(document.getElementById('remotePort').value),
        protocol: document.getElementById('protocol').value,
    };

    // try {
        // Send POST request to /firewall/create-rule
    const response = await fetch('/firewall/create-rule', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRule),
    });
    
    // Log the response status
    console.log('Response status:', response.status);

    // Check if the response is ok (status in the range 200-299)
    if (!response.ok) {
        console.error('Network response was not ok:', response.statusText);
        return; // Exit if the response is not ok
    }

    const responseData = await response.json(); // Parse the JSON response
    console.log('Response data:', responseData); // Log the response data
    await new Promise(resolve => setTimeout(resolve, 20000)); // Wait for 20 seconds

    // concole.log(response); // and pause the program for 5 seconds

        // Pause for 10 seconds
        await new Promise(resolve => setTimeout(resolve, 10000)); // Wait for 10 seconds
        
    // const responseData = await response.json(); // Parse the JSON response

        // Handle the response based on the specified conditions
        if (responseData === 0) {
        alert('Rule created successfully.');
    } else if (responseData === 2) {
        alert('Administrator privileges required.');
    } else if (typeof responseData === 'string') {
        alert(responseData.split('\n')[0]); // Show the first line of the string value
    }

    // Assuming the response contains the created rule
    // if (response.ok) {
    //     firewallRules.push(responseData); // Add the new rule to the local array
    //     renderRules(firewallRules);
    //     closeModal();
    //     this.reset();
    // }
    // } catch (error) {
    //     console.alert(error);
    //     console.error(error);
    //     // await new Promise(resolve => setTimeout(resolve, 20000)); // Wait for 20 seconds
    // }
});

// Close modal when clicking outside
// window.onclick = function(event) {
//     const modal = document.getElementById('addRuleModal');
//     if (event.target === modal) {
//         closeModal();
//     }
// }

// Initialize the table when the page loads
document.addEventListener('DOMContentLoaded', initializeTable);