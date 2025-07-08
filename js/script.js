document.addEventListener('DOMContentLoaded', function () {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu');

    hamburger.addEventListener('click', function () {
        this.classList.toggle('active');
        menu.classList.toggle('active');

        // Animate hamburger lines
        this.querySelectorAll('span').forEach((span, index) => {
            if (this.classList.contains('active')) {
                if (index === 1) {
                    span.style.opacity = '0';
                } else if (index === 0) {
                    span.style.transform = 'translateY(9px) rotate(45deg)';
                } else {
                    span.style.transform = 'translateY(-9px) rotate(-45deg)';
                }
            } else {
                span.style.opacity = '';
                span.style.transform = '';
            }
        });
    });

    // Smooth scrolling for internal (#) links only
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            if (href.startsWith('#')) {
                e.preventDefault();

                // Close mobile menu if open
                if (hamburger.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    menu.classList.remove('active');
                    hamburger.querySelectorAll('span').forEach(span => {
                        span.style.opacity = '';
                        span.style.transform = '';
                    });
                }

                const targetElement = document.querySelector(href);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });

                    document.querySelectorAll('.panel').forEach(panel => {
                        panel.classList.remove('active');
                    });
                    targetElement.classList.add('active');

                    document.querySelectorAll('nav a').forEach(link => {
                        link.classList.remove('active');
                    });
                    this.classList.add('active');
                }
            }
        });
    });

    // Panel switching based on scroll
    const panels = document.querySelectorAll('.panel');
    const navLinks = document.querySelectorAll('nav a');

    function setActivePanel() {
        const scrollPosition = window.scrollY + 100;

        panels.forEach(panel => {
            const panelTop = panel.offsetTop;
            const panelHeight = panel.offsetHeight;

            if (scrollPosition >= panelTop && scrollPosition < panelTop + panelHeight) {
                document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
                panel.classList.add('active');

                const correspondingLink = document.querySelector(`nav a[href="#${panel.id}"]`);
                if (correspondingLink) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    correspondingLink.classList.add('active');
                }
            }
        });
    }

    // Set initial active panel based on hash
    if (window.location.hash) {
        const initialPanel = document.querySelector(window.location.hash);
        if (initialPanel) {
            document.querySelectorAll('.panel').forEach(panel => panel.classList.remove('active'));
            initialPanel.classList.add('active');

            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`nav a[href="${window.location.hash}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    }

    window.addEventListener('scroll', setActivePanel);
    window.addEventListener('load', setActivePanel);

    // Animation on scroll
    const animateOnScroll = function () {
        const elements = document.querySelectorAll(
            '.message-card, .achievement-item, .about-card, .admission-card, .facility-card, .curriculum-card, .exam-card, .event-card'
        );

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial styles for animation
    document.querySelectorAll(
        '.message-card, .achievement-item, .about-card, .admission-card, .facility-card, .curriculum-card, .exam-card, .event-card'
    ).forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);

    // Footer year update
    const yearSpan = document.querySelector('#current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Google Maps iframe lazy loading
    const mapIframe = document.querySelector('.map-container iframe');
    if (mapIframe) {
        mapIframe.setAttribute('loading', 'lazy');
    }

     // Accordion toggle logic
    document.querySelectorAll('.accordion-btn').forEach(button => {
  button.addEventListener('click', () => {
    const panel = button.nextElementSibling;

    // Toggle active state
    button.classList.toggle('active');

    // Toggle visibility of the panel
    panel.classList.toggle('show');
  });
});


});
