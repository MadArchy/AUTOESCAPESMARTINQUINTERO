// ========================================
// SMOOTH SCROLL & NAVIGATION
// ========================================

function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        // Close mobile menu if open
        closeMobileMenu();
    }
}

// Handle all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        scrollToSection(targetId);
    });
});

// ========================================
// HEADER SCROLL EFFECT
// ========================================

const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 20) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ========================================
// MOBILE MENU TOGGLE
// ========================================

const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

function toggleMobileMenu() {
    mobileMenuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
}

function closeMobileMenu() {
    mobileMenuBtn.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
}

mobileMenuBtn.addEventListener('click', toggleMobileMenu);

// Close mobile menu when clicking on a link
document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (mobileMenu.classList.contains('active') && 
        !mobileMenu.contains(e.target) && 
        !mobileMenuBtn.contains(e.target)) {
        closeMobileMenu();
    }
});

// ========================================
// HERO PARTICLES ANIMATION
// ========================================

function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random animation delay and duration
        const delay = Math.random() * 2;
        const duration = Math.random() * 3 + 2;
        particle.style.animationDelay = delay + 's';
        particle.style.animationDuration = duration + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// Initialize particles when DOM is ready
createParticles();

// ========================================
// SCROLL ANIMATIONS
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optional: Stop observing after animation
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for scroll animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(`
        .service-card,
        .gallery-item,
        .value-card,
        .testimonial-card,
        .contact-card,
        .about-image,
        .about-text
    `);
    
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// Initialize scroll animations
initScrollAnimations();

// ========================================
// CONTACT FORM HANDLING
// ========================================

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: this.name.value,
        phone: this.phone.value,
        vehicle: this.vehicle.value,
        service: this.service.value,
        message: this.message.value
    };
    
    // Here you would typically send the data to a backend
    console.log('Form submitted:', formData);
    
    // Show success message
    alert('¡Gracias por contactarnos! Te responderemos pronto.');
    
    // Reset form
    this.reset();
    
    // You can also redirect to WhatsApp with the form data
    // openWhatsAppWithData(formData);
});

// ========================================
// WHATSAPP INTEGRATION
// ========================================

function openWhatsApp() {
    const phoneNumber = '525551234567'; // Replace with actual number
    const message = encodeURIComponent(
        'Hola, me gustaría solicitar información sobre sus servicios de soldadura.'
    );
    const url = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(url, '_blank');
}

function openWhatsAppWithData(formData) {
    const phoneNumber = '525551234567'; // Replace with actual number
    let message = `Hola, mi nombre es ${formData.name}.\n\n`;
    
    if (formData.vehicle) {
        message += `Vehículo: ${formData.vehicle}\n`;
    }
    
    if (formData.service) {
        message += `Servicio requerido: ${formData.service}\n`;
    }
    
    if (formData.message) {
        message += `\nMensaje: ${formData.message}\n`;
    }
    
    message += `\nMi teléfono: ${formData.phone}`;
    
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Make openWhatsApp available globally
window.openWhatsApp = openWhatsApp;

// ========================================
// ACTIVE NAV LINK HIGHLIGHTING
// ========================================

function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

highlightActiveSection();

// ========================================
// LAZY LOADING IMAGES
// ========================================

function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

lazyLoadImages();

// ========================================
// GALLERY MODAL (Optional Enhancement)
// ========================================

// Optional: Add lightbox functionality for gallery images
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', function() {
        const img = this.querySelector('img');
        if (img) {
            // Here you could implement a lightbox modal
            console.log('Gallery item clicked:', img.alt);
            // For now, just log. You can add a modal implementation if needed
        }
    });
});

// ========================================
// PERFORMANCE: Debounce Function
// ========================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll handler if needed
const debouncedScrollHandler = debounce(() => {
    // Add any additional scroll-based functionality here
}, 100);

window.addEventListener('scroll', debouncedScrollHandler);

// ========================================
// SERVICE WORKER (Optional for PWA)
// ========================================

// Uncomment to register a service worker for offline functionality
/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('Service Worker registered'))
            .catch(err => console.log('Service Worker registration failed'));
    });
}
*/

// ========================================
// ACCESSIBILITY ENHANCEMENTS
// ========================================

// Keyboard navigation for mobile menu
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Focus trap for mobile menu
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey && document.activeElement === firstFocusable) {
                e.preventDefault();
                lastFocusable.focus();
            } else if (!e.shiftKey && document.activeElement === lastFocusable) {
                e.preventDefault();
                firstFocusable.focus();
            }
        }
    });
}

if (mobileMenu) {
    trapFocus(mobileMenu);
}

// ========================================
// FORM VALIDATION ENHANCEMENTS
// ========================================

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\d\s\+\-\(\)]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// Add real-time validation to form fields
const phoneInput = contactForm?.querySelector('input[name="phone"]');
const emailInputs = contactForm?.querySelectorAll('input[type="email"]');

if (phoneInput) {
    phoneInput.addEventListener('blur', function() {
        if (this.value && !validatePhone(this.value)) {
            this.style.borderColor = 'var(--destructive)';
        } else {
            this.style.borderColor = '';
        }
    });
}

emailInputs?.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value && !validateEmail(this.value)) {
            this.style.borderColor = 'var(--destructive)';
        } else {
            this.style.borderColor = '';
        }
    });
});

// ========================================
// PRELOAD CRITICAL IMAGES
// ========================================

function preloadImage(url) {
    const img = new Image();
    img.src = url;
}

// Preload hero image for better performance
const heroImg = document.querySelector('.hero-bg img');
if (heroImg) {
    preloadImage(heroImg.src);
}

// ========================================
// ANALYTICS (Optional)
// ========================================

// Track button clicks
function trackEvent(category, action, label) {
    console.log('Event tracked:', { category, action, label });
    // Here you would integrate with Google Analytics, Mixpanel, etc.
    // Example: gtag('event', action, { 'event_category': category, 'event_label': label });
}

// Add tracking to CTA buttons
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', () => {
        trackEvent('Button', 'Click', btn.textContent.trim());
    });
});

// ========================================
// CONSOLE MESSAGE
// ========================================

console.log('%c🔧 SoldaTech Pro', 'font-size: 20px; font-weight: bold; color: #ff6b35;');
console.log('%c✨ Desarrollado con HTML, CSS y JavaScript', 'font-size: 12px; color: #fbbf24;');
console.log('%c📧 ¿Necesitas ayuda? Contáctanos en contacto@soldatechpro.com', 'font-size: 12px; color: #78909c;');

// ========================================
// INITIALIZE ON LOAD
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ Website loaded successfully');
    
    // Add any additional initialization here
    
    // Smooth scroll polyfill for older browsers
    if (!('scrollBehavior' in document.documentElement.style)) {
        console.warn('Smooth scroll not supported, consider adding a polyfill');
    }
});

// ========================================
// WINDOW RESIZE HANDLER
// ========================================

let windowWidth = window.innerWidth;

window.addEventListener('resize', debounce(() => {
    const newWidth = window.innerWidth;
    
    // Close mobile menu on resize to desktop
    if (newWidth >= 768 && windowWidth < 768) {
        closeMobileMenu();
    }
    
    windowWidth = newWidth;
}, 250));

// ========================================
// PAGE VISIBILITY API
// ========================================

// Pause animations when tab is not visible
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations or reduce activity
        console.log('Tab hidden');
    } else {
        // Resume animations
        console.log('Tab visible');
    }
});

// ========================================
// PRINT STYLES HANDLER
// ========================================

window.addEventListener('beforeprint', () => {
    console.log('Preparing to print');
    // Add any print-specific adjustments
});

window.addEventListener('afterprint', () => {
    console.log('Print completed');
    // Restore normal state
});

// ========================================
// ERROR HANDLING
// ========================================

window.addEventListener('error', (e) => {
    console.error('Global error:', e.message);
    // You could send this to an error tracking service
});

// ========================================
// PREFETCH LINKS (Optional Performance Boost)
// ========================================

function prefetchLinks() {
    const links = document.querySelectorAll('a[href^="http"]');
    links.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const href = this.getAttribute('href');
            const prefetchLink = document.createElement('link');
            prefetchLink.rel = 'prefetch';
            prefetchLink.href = href;
            document.head.appendChild(prefetchLink);
        }, { once: true });
    });
}

prefetchLinks();

// ========================================
// BACK TO TOP BUTTON (Optional)
// ========================================

// You can add a back-to-top button if needed
function createBackToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'back-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--gradient-primary);
        color: var(--carbon-black);
        border: none;
        cursor: pointer;
        font-size: 1.5rem;
        display: none;
        z-index: 999;
        box-shadow: var(--shadow-lg);
        transition: all 0.3s ease;
    `;
    
    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            button.style.display = 'block';
        } else {
            button.style.display = 'none';
        }
    });
    
    document.body.appendChild(button);
}

// Uncomment to enable back-to-top button
// createBackToTopButton();
