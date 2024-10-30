// Monitor.js

async function update_data(){
    const dataResponse = await fetch('/dashboard/FI-Monitor/data');
    const data = await dataResponse.json();
    return data;
}

async function add_files(){
    const inputField = document.getElementById('filePathInput')
    const file = inputField.value;
    inputField.value = null;
    await fetch(`/dashboard/FI-Monitor?task=add&file=${encodeURIComponent(file)}`);
    
    // Create and show popup
    const popup = document.createElement('div');
    popup.style.cssText = `position: fixed; top: 20px; right: 20px; padding: 15px 25px; background-color: white; 
    border: 2px solid #4CAF50; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.2); z-index: 2000;
    `;
    popup.textContent = "File Added Successfully";
    document.body.appendChild(popup);
    
    // Remove popup after 3 seconds
    setTimeout(() => {
        popup.remove();
    }, 1000);
 
}

//function for pause/resume button
async function toggleState(button, count) {
    const data = await update_data()
    const [file, properties] = Object.entries(data)[count]

    // console.log(file, properties);
    console.log(file, properties)
    if (properties.pause == 1) {
        button.textContent = "Resume";
        button.style.backgroundColor = "#f44336";
        fetch(`/dashboard/FI-Monitor?task=resume&file=${encodeURIComponent(file)}`);
    } else {
        button.textContent = "Pause";
        button.style.backgroundColor = "#4CAF50";
        fetch(`/dashboard/FI-Monitor?task=pause&file=${encodeURIComponent(file)}`);
    }

}
// Function to get files
async function getFiles() {
    const files = await update_data();
    const fileList = document.querySelector('.file-list');
    fileList.innerHTML = '';
    const pr_buttons = [];
    count = 0;
    for (const [file, properties] of Object.entries(files)) {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        // const alertBgColor = properties.alert === 0 ? '#4CAF50' : '#e74c3c';

        let alertBgColor, alertValue;
        if (properties.alert === 0) {
            alertBgColor = '#4CAF50'
            alertValue = 'All good'
        } else {
            alertBgColor = '#e74c3c'
            alertValue = 'Alert'
        }

        const prBgColor = properties.pause === 1 ? "#f44336" : "#4CAF50"
        const prTextContent = properties.pause === 1 ? "Resume" : "Pause"

        const pr_button = `<button id="toggleButton" onclick="toggleState(this, ${count})"style=" padding: 8px 16px;
                border: none;
                border-radius: 4px;
                background-color: ${prBgColor};
                color: white;
                cursor: pointer;
                font-size: 14px;
                transition: background-color 0.3s;">${prTextContent}</button>`
        pr_buttons.push(pr_button)
        fileItem.innerHTML = `
        <span class="file-name" style="color: white">
            ${file}
            <svg onclick="window.location.href='/dashboard/FI-Monitor?file=${encodeURIComponent(file)}&action=open'" 
                    style="cursor: pointer; color:0fffb3; width: 20px; height: 20px; margin-left: 8px; vertical-align: middle; transition: stroke 0.3s ease;" 
                    onmouseover="this.style.stroke='white'" 
                    onmouseout="this.style.stroke='currentColor'"
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    stroke-width="2" 
                    stroke-linecap="round" 
                    stroke-linejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="12" y1="18" x2="12" y2="12"></line>
                    <line x1="9" y1="15" x2="15" y2="15"></line>
                </svg>
        </span>
        <span class="alert-count" style="background-color: ${alertBgColor}">${alertValue}</span>
        <div class="action-buttons">
            ${pr_button}
            <button class="action-button clear-button" onclick="fetch('/dashboard/FI-Monitor?task=clear&file=${encodeURIComponent(file)}')">Clear</button>
            <button class="action-button remove-button" onclick="fetch('/dashboard/FI-Monitor?task=remove&file=${encodeURIComponent(file)}')">Remove</button>
        </div>`;
        fileList.appendChild(fileItem);

        count++;
    }
}

// Call the function when DOM is loaded
document.addEventListener('DOMContentLoaded', getFiles);

