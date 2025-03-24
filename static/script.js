document.addEventListener("DOMContentLoaded", () => {
    // Initialize custom cursor
    initCustomCursor()
  
    // Initialize header scroll effect
    initHeaderScroll()
  
    // Initialize feature tabs
    initFeatureTabs()
  
    // Initialize mobile menu
    initMobileMenu()
  
    // Initialize smooth scrolling
    initSmoothScroll()
  
    // Initialize animations
    initAnimations()
  
    // Initialize email form
    initEmailForm()
  })
  
  // Custom cursor functionality
  function initCustomCursor() {
    const cursorDot = document.querySelector(".cursor-dot")
    const cursorOutline = document.querySelector(".cursor-outline")
  
    if (!cursorDot || !cursorOutline) return
  
    // Check if we're not on mobile
    const isMobile = window.matchMedia("(max-width: 768px)").matches
  
    if (isMobile) {
      cursorDot.style.display = "none"
      cursorOutline.style.display = "none"
      return
    }
  
    document.addEventListener("mousemove", (e) => {
      // Position the dot directly at cursor position
      cursorDot.style.left = `${e.clientX}px`
      cursorDot.style.top = `${e.clientY}px`
  
      // Position the outline with a slight delay for a trailing effect
      setTimeout(() => {
        cursorOutline.style.left = `${e.clientX}px`
        cursorOutline.style.top = `${e.clientY}px`
      }, 80)
    })
  
    // Add special effects for interactive elements
    const interactiveElements = document.querySelectorAll(
      "a, button, input, select, .feature-card, .tip-card, .testimonial-card",
    )
  
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursorOutline.style.width = "60px"
        cursorOutline.style.height = "60px"
        cursorOutline.style.borderColor = "rgba(15, 255, 179, 0.8)"
        cursorDot.style.opacity = "0.5"
      })
  
      el.addEventListener("mouseleave", () => {
        cursorOutline.style.width = "40px"
        cursorOutline.style.height = "40px"
        cursorOutline.style.borderColor = "rgba(15, 255, 179, 0.5)"
        cursorDot.style.opacity = "1"
      })
    })
  
    // Add click effect
    document.addEventListener("mousedown", () => {
      cursorDot.style.transform = "translate(-50%, -50%) scale(0.5)"
      cursorOutline.style.transform = "translate(-50%, -50%) scale(0.8)"
    })
  
    document.addEventListener("mouseup", () => {
      cursorDot.style.transform = "translate(-50%, -50%) scale(1)"
      cursorOutline.style.transform = "translate(-50%, -50%) scale(1)"
    })
  
    // Add magnetic effect to buttons
    const buttons = document.querySelectorAll(".primary-button, .cta-button")
  
    buttons.forEach((button) => {
      button.addEventListener("mousemove", function (e) {
        const rect = this.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
  
        const centerX = rect.width / 2
        const centerY = rect.height / 2
  
        const moveX = (x - centerX) / 10
        const moveY = (y - centerY) / 10
  
        this.style.transform = `translate(${moveX}px, ${moveY}px)`
      })
  
      button.addEventListener("mouseleave", function () {
        this.style.transform = ""
      })
    })
  }
  
  // Header scroll effect
  function initHeaderScroll() {
    const header = document.getElementById("main-header")
  
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("scrolled")
      } else {
        header.classList.remove("scrolled")
      }
    })
  }
  
  // Feature tabs functionality
  function initFeatureTabs() {
    const tabs = document.querySelectorAll(".feature-tab")
    const details = document.querySelectorAll(".feature-detail")
  
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const feature = tab.getAttribute("data-feature")
  
        // Update active tab
        tabs.forEach((t) => t.classList.remove("active"))
        tab.classList.add("active")
  
        // Update active detail
        details.forEach((d) => d.classList.remove("active"))
        document.getElementById(feature).classList.add("active")
      })
    })
  }
  
  // Mobile menu functionality
  function initMobileMenu() {
    const menuToggle = document.querySelector(".mobile-menu-toggle")
    const navLinks = document.querySelector(".nav-links")
  
    if (!menuToggle || !navLinks) return
  
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active")
      menuToggle.classList.toggle("active")
    })
  }
  
  // Smooth scrolling for anchor links
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
        const targetElement = document.querySelector(targetId)
  
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Adjust for header height
            behavior: "smooth",
          })
        }
      })
    })
  }
  
  // Animations
  function initAnimations() {
    // Intersection Observer for fade-in effect
    const fadeInObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          }
        })
      },
      { threshold: 0.1 },
    )
  
    // Observe elements
    const animatedElements = document.querySelectorAll(".feature-card, .tip-card, .testimonial-card")
  
    animatedElements.forEach((el) => {
      el.style.opacity = "0"
      el.style.transform = "translateY(30px)"
      el.style.transition = "opacity 0.5s ease, transform 0.5s ease"
      fadeInObserver.observe(el)
    })
  
    // Add visible class to make elements appear
    document.addEventListener("DOMContentLoaded", () => {
      setTimeout(() => {
        document.querySelectorAll(".visible").forEach((el) => {
          el.style.opacity = "1"
          el.style.transform = "translateY(0)"
        })
      }, 300)
    })
  }
  
  // Email form submission
  function initEmailForm() {
    const emailForm = document.getElementById("email-form")
  
    if (!emailForm) return
  
    emailForm.addEventListener("submit", (e) => {
      e.preventDefault()
  
      const emailInput = emailForm.querySelector('input[type="email"]')
      const submitButton = emailForm.querySelector('button[type="submit"]')
  
      if (!emailInput || !submitButton) return
  
      // Disable form elements during submission
      emailInput.disabled = true
      submitButton.disabled = true
      submitButton.textContent = "Sending..."
  
      // Simulate form submission
      setTimeout(() => {
        // Show success message
        emailForm.innerHTML = `
                  <div style="color: var(--accent-color); font-weight: 500; font-size: 1.1rem;">
                      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" style="display: inline-block; vertical-align: middle; margin-right: 8px;">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                      Thank you! We'll be in touch soon.
                  </div>
              `
      }, 1500)
    })
  }
  
  