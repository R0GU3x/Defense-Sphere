document.addEventListener("DOMContentLoaded", () => {
    // Get all password toggle buttons
    const toggleButtons = document.querySelectorAll(".toggle-password")
  
    // Add click event listener to each button
    toggleButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Find the password input that is a sibling of this button
        const passwordInput = this.previousElementSibling
        const icon = this.querySelector("i")
  
        // Toggle the type attribute
        if (passwordInput.type === "password") {
          passwordInput.type = "text"
          icon.classList.remove("fa-eye")
          icon.classList.add("fa-eye-slash")
        } else {
          passwordInput.type = "password"
          icon.classList.remove("fa-eye-slash")
          icon.classList.add("fa-eye")
        }
      })
    })
  })
  
  