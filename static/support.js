document.addEventListener("DOMContentLoaded", () => {
    // Page transition logic
    const links = document.querySelectorAll(".transition-link")
  
    links.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault() // Prevent default link behavior
        const targetUrl = this.getAttribute("href") // Get the target URL
  
        // Fade out the current page
        gsap.to("body", {
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            window.location.href = targetUrl // Navigate to the new page
          },
        })
      })
    })
  })
  gsap.registerPlugin(ScrollTrigger)
  
  // Animate the welcome section
  gsap.from(".welcome", {
    scrollTrigger: {
      trigger: ".welcome",
      start: "top 80%", // Start animation when the top of the section is 80% from the top of the viewport
      toggleActions: "play none none reverse", // Play on enter, reverse on leave
    },
    opacity: 0,
    y: -80, // Move down 50px
    duration: 1,
  })
  
  // Animate the support topics section
  gsap.from(".support-topics", {
    scrollTrigger: {
      trigger: ".support-topics",
      start: "top 80%", // Start animation when the top of the section is 80% from the top of the viewport
      toggleActions: "play none none reverse", // Play on enter, reverse on leave
    },
    opacity: 0,
    y: 80, // Move down 50px
    duration: 1,
  })
  document.addEventListener("DOMContentLoaded", () => {
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger)
  
    // Hero section animation
    gsap.from(".hero h1, .hero p", {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
      stagger: 0.2,
    })
    // Scam alert animation
    gsap.from(".scam-content", {
      scrollTrigger: {
        trigger: ".scam-alert",
        start: "top 80%",
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power2.out",
    })
  
    // FAQ section animation
    gsap.from(".faq-item", {
      scrollTrigger: {
        trigger: ".faq",
        start: "top 80%",
      },
      opacity: 0,
      y: 30,
      stagger: 0.2,
      duration: 0.8,
      ease: "power2.out",
    })
  })
  
  document.addEventListener("DOMContentLoaded", () => {
    // Initialize custom cursor
    initCustomCursor()
  
    // Initialize header scroll effect
    initHeaderScroll()
  
    // Initialize mobile menu
    initMobileMenu()
  
    // Initialize smooth scrolling
    initSmoothScroll()
  
    // Initialize FAQ accordion
    initFaqAccordion()
  
    // Initialize GSAP animations
    initGSAPAnimations()
  
    // Initialize page transitions
    initPageTransitions()
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
    const interactiveElements = document.querySelectorAll("a, button, input, select, .topic-card, .faq-header")
  
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
    const buttons = document.querySelectorAll(".primary-button, .secondary-button, .cta-button")
  
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
  
  // FAQ accordion functionality
  function initFaqAccordion() {
    const faqItems = document.querySelectorAll(".faq-item")
  
    faqItems.forEach((item) => {
      const header = item.querySelector(".faq-header")
  
      header.addEventListener("click", () => {
        // Close all other items
        faqItems.forEach((otherItem) => {
          if (otherItem !== item && otherItem.classList.contains("active")) {
            otherItem.classList.remove("active")
          }
        })
  
        // Toggle current item
        item.classList.toggle("active")
      })
    })
  
    // Open the first FAQ item by default
    if (faqItems.length > 0) {
      faqItems[0].classList.add("active")
    }
  }
  
  // GSAP animations
  function initGSAPAnimations() {
    // Ensure GSAP is loaded
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return
  
    // Hero section animation
    gsap.from(".hero-content", {
      duration: 1.5,
      opacity: 0,
      y: 50,
      ease: "power3.out",
    })
  
    // Animate sections on scroll
    const sections = document.querySelectorAll(
      ".welcome-section, .topics-section, .scam-alert-section, .faq-section, .help-section",
    )
  
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
  
    // Animate topic cards
    const topicCards = document.querySelectorAll(".topic-card")
  
    topicCards.forEach((card, index) => {
      gsap.from(card, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: index * 0.2,
        scrollTrigger: {
          trigger: ".topics-grid",
          start: "top 80%",
        },
      })
    })
  
    // Animate FAQ items
    const faqItems = document.querySelectorAll(".faq-item")
  
    faqItems.forEach((item, index) => {
      gsap.from(item, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: index * 0.2,
        scrollTrigger: {
          trigger: ".faq-grid",
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
  
  