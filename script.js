document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Menu Toggle
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      navToggle.classList.toggle('open');
    });
    // Close menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.classList.remove('open');
      });
    });
  }
  // Header Scroll Effect
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  // Typewriting Effect for Hero Subtitle
  const typedTextSpan = document.getElementById('typed-text');
  const textArray = ["B.Tech IT Student", "Web Developer", "Problem Solver"];
  const typingSpeed = 100;
  const erasingSpeed = 60;
  const newTextDelay = 2000;
  let textArrayIndex = 0;
  let charIndex = 0;
  function type() {
    if (typedTextSpan) {
      if (charIndex < textArray[textArrayIndex].length) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingSpeed);
      } else {
        setTimeout(erase, newTextDelay);
      }
    }
  }
  function erase() {
    if (typedTextSpan) {
      if (charIndex > 0) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingSpeed);
      } else {
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingSpeed + 500);
      }
    }
  }
  // Initial typing trigger
  if (typedTextSpan && textArray.length) {
    setTimeout(type, 1000);
  }
  // Skill progress bars filling animation trigger on scroll
  function animateSkills() {
    const bars = document.querySelectorAll('.skill-progress-bar');
    bars.forEach(bar => {
      const width = bar.getAttribute('data-width');
      bar.style.width = width;
    });
  }
  // Intersection Observer for scroll animations
  const revealElements = document.querySelectorAll('.scroll-reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        
        // Custom actions when specific elements trigger
        if (entry.target.classList.contains('skills-grid')) {
          animateSkills();
        }
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  revealElements.forEach(el => observer.observe(el));
  // Active Link Highlighting on Scroll
  const sections = document.querySelectorAll('section');
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 200;
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
  // Card Hover Mouse Tracking Effect (Spotlight gradient)
  const cards = document.querySelectorAll('.skill-card, .project-card, .contact-item, .about-card, .stat-box, .contact-form-panel');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
  // Back to Top Button
  const backToTopBtn = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  // Interactive Form Feedback
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    // Create Toast Container/Element in DOM
    const toast = document.createElement('div');
    toast.className = 'toast-msg';
    toast.innerHTML = `
      <i class="fas fa-check-circle toast-icon"></i>
      <span>Message sent successfully!</span>
    `;
    document.body.appendChild(toast);
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Simulate form sending animation/success
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
      setTimeout(() => {
        // Show success toast notification
        toast.classList.add('show');
        
        // Reset form
        contactForm.reset();
        
        // Reset submit button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
        // Hide toast after 3.5 seconds
        setTimeout(() => {
          toast.classList.remove('show');
        }, 3500);
      }, 1500);
    });
  }
});
