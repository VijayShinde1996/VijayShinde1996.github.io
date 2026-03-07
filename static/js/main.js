document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navDots = document.querySelectorAll('.scroll-dot');
    const revealElements = document.querySelectorAll('.reveal');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const navLinks = document.querySelectorAll('.nav-links a');

    // --- Scroll Indicator & Nav Active State ---
    const updateActiveDotAndNav = () => {
        let currentActiveSection = 'hero';
        let scrollIndicatorVisible = window.scrollY > 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Check if the current scroll position is past the top of the section,
            // accounting for some offset to change the dot before the section is fully at the top
            if (window.scrollY >= sectionTop - 150) {
                currentActiveSection = section.id;
            }
        });

        // Update dots
        if (navDots) {
            navDots.forEach(dot => {
                dot.classList.remove('active');
                if (dot.dataset.target === currentActiveSection) {
                    dot.classList.add('active');
                }
            });
        }

        // Update Nav links
        navLinks.forEach(link => {
            link.style.color = 'var(--muted)';
            if (link.getAttribute('href') === '#' + currentActiveSection) {
                link.style.color = 'var(--text)';
            }
        });

        // Toggle indicator visibility
        if (scrollIndicator) {
            if (scrollIndicatorVisible) {
                scrollIndicator.classList.add('visible');
            } else {
                scrollIndicator.classList.remove('visible');
            }
        }
    };

    // Click handler for scroll dots
    if (navDots) {
        navDots.forEach(dot => {
            dot.addEventListener('click', () => {
                const targetId = dot.dataset.target;
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    // --- Reveal Animations on Scroll ---
    const checkReveal = () => {
        const triggerBottom = window.innerHeight * 0.85;

        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < triggerBottom) {
                element.classList.add('active');
            } else {
                // Optional: remove 'active' when scrolling back up
                // element.classList.remove('active');
            }
        });
    };


    // Attach event listeners
    window.addEventListener('scroll', () => {
        updateActiveDotAndNav();
        checkReveal();
    });


    // Initial calls on load
    updateActiveDotAndNav();
    checkReveal();

    // --- Scroll to Top Button ---
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");
    
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                scrollToTopBtn.style.display = "block";
            } else {
                scrollToTopBtn.style.display = "none";
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

});
