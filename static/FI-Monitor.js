// Monitor.js

// Array to store file data
const files = [
    {
        fileName: 'README.md',
        alertCount: 3
    },
    {
        fileName: 'kernel.sys',
        alertCount: 1
    },
    {
        fileName: 'config.ini',
        alertCount: 0
    },
    {
        fileName: 'database.db',
        alertCount: 2
    }
];

function add_files() {
    document.getElementById('fileInput').click();
    document.getElementById('fileInput').addEventListener('change', function() {
        const files = this.files;
        console.log(files)
    })
}

// Function to get files
function getFiles() {
    const fileList = document.querySelector('.file-list');
    
    files.forEach(file => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';

        fileItem.innerHTML = `
            <span class="file-name">${file.fileName}</span>
            <span class="alert-count">${file.alertCount}</span>
            <div class="action-buttons">
                <button class="action-button clear-button" onclick="fetch('/dashboard/FI-Monitor?task=clear')">De-Alert</button>
                <button class="action-button remove-button" onclick="fetch('/dashboard/FI-Monitor?task=remove')">Remove</button>
            </div>
        `;
        
        fileList.appendChild(fileItem);
    });
}

// Call the function when DOM is loaded
document.addEventListener('DOMContentLoaded', getFiles);