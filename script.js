/**
 * Flight Labs - Interactive Scripts
 * Premium 2025 Website Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initMobileMenu();
    initFAQ();
    initScrollAnimations();
    initSmoothScroll();
    initParallax();
});

/**
 * Navbar scroll effect
 */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    const handleScroll = () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
}

/**
 * Mobile menu toggle
 */
function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    let isOpen = false;

    if (!menuBtn || !navLinks) return;

    menuBtn.addEventListener('click', () => {
        isOpen = !isOpen;
        menuBtn.classList.toggle('active', isOpen);

        if (isOpen) {
            navLinks.style.display = 'flex';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.flexDirection = 'column';
            navLinks.style.padding = '24px';
            navLinks.style.background = 'rgba(10, 10, 15, 0.98)';
            navLinks.style.backdropFilter = 'blur(20px)';
            navLinks.style.borderBottom = '1px solid rgba(255, 255, 255, 0.08)';
            navLinks.style.gap = '16px';
        } else {
            if (window.innerWidth <= 768) {
                navLinks.style.display = 'none';
            }
        }
    });

    // Close menu on link click
    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                isOpen = false;
                menuBtn.classList.remove('active');
                navLinks.style.display = 'none';
            }
        });
    });

    // Handle resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navLinks.style = '';
        } else if (!isOpen) {
            navLinks.style.display = 'none';
        }
    });
}

/**
/**
 * FAQ accordion - DEPRACTED
 * Logic moved to inline script in index.html for simplicity and robustness
 */
function initFAQ() {
    // No-op
}

/**
 * Scroll-triggered animations
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');

                // Stagger children animations
                const children = entry.target.querySelectorAll('.animate-child');
                children.forEach((child, index) => {
                    child.style.animationDelay = `${index * 0.1}s`;
                    child.classList.add('animate-in');
                });
            }
        });
    }, observerOptions);

    // Observe sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Handle animate-in class
    document.querySelectorAll('.animate-in').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    });

    // Add class for sections already in view
    const handleSection = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    };

    const sectionObserver = new IntersectionObserver(handleSection, observerOptions);
    sections.forEach(section => sectionObserver.observe(section));

    // Animate cards and items on scroll
    const animateElements = document.querySelectorAll(
        '.process-card, .service-card, .work-card, .testimonial-card, .pricing-card, .deliverable-item'
    );

    // Explicitly handle FAQ items separately or let them be static for now to ensure interaction works
    const faqItems = document.querySelectorAll('.faq-item');
    const faqObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    faqItems.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s, background 0.3s, box-shadow 0.3s`;
        faqObserver.observe(el);
    });

    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.5s ease ${index % 3 * 0.1}s, transform 0.5s ease ${index % 3 * 0.1}s`;
    });

    const elementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    animateElements.forEach(el => elementObserver.observe(el));
}

/**
 * Smooth scrolling for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Subtle parallax effect for floating orbs
 */
function initParallax() {
    const orbs = document.querySelectorAll('.orb');

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;

                orbs.forEach((orb, index) => {
                    const speed = 0.1 + (index * 0.05);
                    orb.style.transform = `translateY(${scrolled * speed}px)`;
                });

                ticking = false;
            });

            ticking = true;
        }
    }, { passive: true });
}

/**
 * Counter animation for stats
 */
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const target = counter.innerText;
        const isNumber = !isNaN(parseInt(target));

        if (isNumber) {
            const num = parseInt(target.replace(/\D/g, ''));
            const prefix = target.match(/^\D+/) || '';
            const suffix = target.match(/\D+$/) || '';
            let current = 0;
            const increment = num / 50;
            const duration = 2000;
            const stepTime = duration / 50;

            const updateCounter = () => {
                current += increment;
                if (current < num) {
                    counter.innerText = prefix + Math.ceil(current) + suffix;
                    setTimeout(updateCounter, stepTime);
                } else {
                    counter.innerText = target;
                }
            };

            updateCounter();
        }
    });
}

/**
 * Handle hover effects for cards
 */
document.querySelectorAll('.process-card, .service-card, .work-card, .pricing-card').forEach(card => {
    card.addEventListener('mouseenter', function (e) {
        this.style.transform = 'translateY(-8px)';
    });

    card.addEventListener('mouseleave', function (e) {
        this.style.transform = 'translateY(0)';
    });
});

/**
 * Add loading state handling
 */
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Trigger counter animation when stats are in view
    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(statsSection);
    }
});

console.log('🚀 Flight Labs website initialized');
