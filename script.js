// Language Toggle Functionality
class LanguageManager {
    constructor() {
        this.currentLang = 'es';
        this.init();
    }

    init() {
        this.bindEvents();
        this.setLanguage(this.currentLang);
    }

    bindEvents() {
        const esBtn = document.getElementById('lang-es');
        const enBtn = document.getElementById('lang-en');

        esBtn.addEventListener('click', () => this.setLanguage('es'));
        enBtn.addEventListener('click', () => this.setLanguage('en'));
    }

    setLanguage(lang) {
        this.currentLang = lang;
        
        // Update button states
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.getElementById(`lang-${lang}`).classList.add('active');

        // Update text content
        document.querySelectorAll('[data-es][data-en]').forEach(element => {
            const text = element.getAttribute(`data-${lang}`);
            if (text) {
                element.textContent = text;
            }
        });

        // Update document language
        document.documentElement.lang = lang;
        
        // Store preference
        localStorage.setItem('preferred-language', lang);
    }

    // Load saved language preference
    loadSavedLanguage() {
        const saved = localStorage.getItem('preferred-language');
        if (saved && (saved === 'es' || saved === 'en')) {
            this.setLanguage(saved);
        }
    }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Intersection Observer for Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe project cards
    document.querySelectorAll('.project-card, .social-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Enhanced Preview Functionality
class PreviewManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupIframeLoading();
        this.setupPreviewInteractions();
    }

    setupIframeLoading() {
        const iframes = document.querySelectorAll('iframe');
        
        iframes.forEach(iframe => {
            // Add loading indicator
            const loadingDiv = document.createElement('div');
            loadingDiv.className = 'iframe-loading';
            loadingDiv.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            iframe.parentNode.insertBefore(loadingDiv, iframe);

            iframe.addEventListener('load', () => {
                loadingDiv.remove();
                iframe.style.opacity = '1';
            });

            iframe.addEventListener('error', () => {
                loadingDiv.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error loading preview';
            });
        });
    }

    setupPreviewInteractions() {
        // Add hover effects for better UX
        document.querySelectorAll('.project-card').forEach(card => {
            const iframe = card.querySelector('iframe');
            const overlay = card.querySelector('.preview-overlay');

            if (iframe && overlay) {
                card.addEventListener('mouseenter', () => {
                    iframe.style.transform = 'scale(0.85)';
                });

                card.addEventListener('mouseleave', () => {
                    iframe.style.transform = 'scale(0.8)';
                });
            }
        });
    }
}

// Contact Form Enhancement (if needed later)
class ContactManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupContactLinks();
    }

    setupContactLinks() {
        // Add click tracking for contact links
        document.querySelectorAll('.contact-item a').forEach(link => {
            link.addEventListener('click', (e) => {
                // Could add analytics tracking here
                console.log(`Contact method used: ${link.href}`);
            });
        });
    }
}

// Performance Optimization
class PerformanceManager {
    constructor() {
        this.init();
    }

    init() {
        this.lazyLoadIframes();
        this.optimizeImages();
    }

    lazyLoadIframes() {
        const iframes = document.querySelectorAll('iframe[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const iframeObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const iframe = entry.target;
                        if (!iframe.src && iframe.dataset.src) {
                            iframe.src = iframe.dataset.src;
                        }
                        iframeObserver.unobserve(iframe);
                    }
                });
            });

            iframes.forEach(iframe => {
                iframeObserver.observe(iframe);
            });
        }
    }

    optimizeImages() {
        // Preload critical images when needed
        const criticalImages = [];
        
        // Only process if there are critical images
        if (criticalImages.length > 0) {
            criticalImages.forEach(src => {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.as = 'image';
                link.href = src;
                document.head.appendChild(link);
            });
        }
    }
}

// Theme Manager (for future dark mode support)
class ThemeManager {
    constructor() {
        this.currentTheme = 'light';
        this.init();
    }

    init() {
        this.loadSavedTheme();
    }

    loadSavedTheme() {
        const saved = localStorage.getItem('preferred-theme');
        if (saved) {
            this.setTheme(saved);
        }
    }

    setTheme(theme) {
        this.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('preferred-theme', theme);
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }
}

// Error Handling
class ErrorHandler {
    constructor() {
        this.init();
    }

    init() {
        window.addEventListener('error', this.handleError.bind(this));
        window.addEventListener('unhandledrejection', this.handlePromiseRejection.bind(this));
    }

    handleError(event) {
        console.error('JavaScript Error:', event.error);
        // Could send to analytics or error reporting service
    }

    handlePromiseRejection(event) {
        console.error('Unhandled Promise Rejection:', event.reason);
        event.preventDefault();
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all managers
    const languageManager = new LanguageManager();
    new PreviewManager();
    new ContactManager();
    new PerformanceManager();
    new ThemeManager();
    new ErrorHandler();

    // Load saved language preference
    languageManager.loadSavedLanguage();

    // Initialize other features
    initSmoothScrolling();
    initScrollAnimations();

    // Add loading complete class
    document.body.classList.add('loaded');
});

// Service Worker Registration (for future PWA support)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        LanguageManager,
        PreviewManager,
        ContactManager,
        PerformanceManager,
        ThemeManager,
        ErrorHandler
    };
}
