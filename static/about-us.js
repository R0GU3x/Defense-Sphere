// Ensure the DOM is fully loaded before executing the script
document.addEventListener("DOMContentLoaded", () => {
  // Page transition logic
  const links = document.querySelectorAll(".transition-link")

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault() // Prevent default link behavior
      const targetUrl = this.getAttribute("href") // Get the target URL

      // Fade out the current page
      document.body.style.opacity = 0 // Set body opacity to 0 for fade out
      setTimeout(() => {
        window.location.href = targetUrl // Navigate to the new page
      }, 500) // Wait for 500ms before navigating
    })
  })

  // Initialize custom cursor
  initCustomCursor()

  // Call the function to animate sections
  animateSections()
})

// Function to animate sections
const animateSections = () => {
  const sections = document.querySelectorAll(".hero, .about-section")

  sections.forEach((section) => {
    section.style.opacity = 0 // Set initial opacity to 0
    section.style.transform = "translateY(50px)" // Move down 50px

    // Animate sections on load
    setTimeout(() => {
      section.style.transition = "opacity 1s, transform 1s" // Set transition
      section.style.opacity = 1 // Fade in
      section.style.transform = "translateY(0)" // Move to original position
    }, 100) // Delay for 100ms before starting the animation
  })
}

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
  const interactiveElements = document.querySelectorAll("a, button, input, select, .leader-card, .stat-item")

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

// GSAP animations
function initGSAPAnimations() {
  // Ensure GSAP is loaded
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return

  // Hero section animation
  gsap.from(".hero .container", {
    duration: 2,
    opacity: 0,
    y: -80,
    ease: "power2.out",
  })

  // Animate sections on scroll
  const sections = document.querySelectorAll(".about-section, .leadership-section, .contact-section")

  sections.forEach((section) => {
    gsap.from(section, {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    })
  })

  // Animate stats
  const statItems = document.querySelectorAll(".stat-item")

  statItems.forEach((item, index) => {
    gsap.from(item, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: index * 0.2,
      scrollTrigger: {
        trigger: ".stats",
        start: "top 80%",
      },
    })
  })

  // Animate leadership cards
  const leaderCards = document.querySelectorAll(".leader-card")

  leaderCards.forEach((card, index) => {
    gsap.from(card, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: index * 0.2,
      scrollTrigger: {
        trigger: ".leadership-grid",
        start: "top 80%",
      },
    })
  })
}

// Page transitions
function initPageTransitions() {
  const links = document.querySelectorAll(".transition-link")

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetUrl = this.getAttribute("href")

      gsap.to("body", {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          window.location.href = targetUrl
        },
      })
    })
  })
}

