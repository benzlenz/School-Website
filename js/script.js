
document.addEventListener('DOMContentLoaded', function () {
  // === Mobile Menu Toggle ===
  const hamburger = document.querySelector('.hamburger');
  const menu = document.querySelector('.menu');

  if (hamburger && menu) {
    hamburger.addEventListener('click', function () {
      this.classList.toggle('active');
      menu.classList.toggle('active');

      this.querySelectorAll('span').forEach((span, index) => {
        if (this.classList.contains('active')) {
          if (index === 1) span.style.opacity = '0';
          else if (index === 0) span.style.transform = 'translateY(9px) rotate(45deg)';
          else span.style.transform = 'translateY(-9px) rotate(-45deg)';
        } else {
          span.style.opacity = '';
          span.style.transform = '';
        }
      });
    });
  }

  // === Highlight Active Nav Link Based on Current Page (normalized) ===
  const currentPath = (window.location.pathname.split('/').pop() || 'index.html').replace('.html', '');
  document.querySelectorAll('nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const linkPath = href.split('/').pop().replace('.html', '');
    if (linkPath === currentPath) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }

    // Close menu on link click (for mobile UX)
    link.addEventListener('click', () => {
      if (menu && menu.classList.contains('active')) {
        hamburger.classList.remove('active');
        menu.classList.remove('active');
        hamburger.querySelectorAll('span').forEach(span => {
          span.style.opacity = '';
          span.style.transform = '';
        });
      }
    });
  });

  // === Accordion Functionality (guarded panel) ===
  document.querySelectorAll('.accordion-btn').forEach(button => {
    button.addEventListener('click', () => {
      const panel = button.nextElementSibling;
      if (panel) {
        button.classList.toggle('active');
        panel.classList.toggle('show');
      }
    });
  });

  // === Animate on Scroll (safe loop)
  const scrollAnimatedElements = document.querySelectorAll(
    '.message-card, .achievement-item, .about-card, .admission-card, .facility-card, .curriculum-card, .exam-card, .event-card'
  );

  scrollAnimatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  function animateOnScroll() {
    const windowHeight = window.innerHeight;
    scrollAnimatedElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - 100) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }
    });
  }

  window.addEventListener('scroll', animateOnScroll);
  window.addEventListener('load', animateOnScroll);

  // === Auto-update footer year (if exists)
  const yearSpan = document.querySelector('#current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // === Lazy-load Google Maps iframe
  const mapIframe = document.querySelector('.map-container iframe');
  if (mapIframe) {
    mapIframe.setAttribute('loading', 'lazy');
  }
});
