// Main JavaScript for Skyline Digital Services

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Button hover effects
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-glow');
    
    buttons.forEach(button => {
        // Ripple effect
        button.addEventListener('mouseenter', (e) => {
            const rect = button.getBoundingClientRect();
            const ripple = document.createElement('div');
            ripple.className = 'button-ripple';
            
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
            `;
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        // Add ripple animation
        const rippleStyle = document.createElement('style');
        rippleStyle.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(rippleStyle);
    });
    
    // Testimonial carousel
    let currentTestimonial = 0;
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    function rotateTestimonials() {
        testimonialCards.forEach((card, index) => {
            card.style.transform = `translateX(${100 * (index - currentTestimonial)}%)`;
            card.style.opacity = index === currentTestimonial ? '1' : '0.5';
        });
        
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    }
    
    // Auto rotate testimonials every 5 seconds
    setInterval(rotateTestimonials, 5000);
    
    // Initialize testimonial positions
    testimonialCards.forEach((card, index) => {
        card.style.transition = 'all 0.5s ease';
        card.style.transform = `translateX(${100 * (index - currentTestimonial)}%)`;
        card.style.opacity = index === currentTestimonial ? '1' : '0.5';
    });
    
    // Cursor follower effect
    const cursorFollower = document.createElement('div');
    cursorFollower.className = 'cursor-follower';
    document.body.appendChild(cursorFollower);
    
    document.addEventListener('mousemove', (e) => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    });
    
    // Add cursor follower styles
    const cursorStyle = document.createElement('style');
    cursorStyle.textContent = `
        .cursor-follower {
            position: fixed;
            width: 20px;
            height: 20px;
            border: 2px solid var(--neon-blue);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: width 0.2s, height 0.2s;
            mix-blend-mode: difference;
        }
        
        .cursor-follower.hover {
            width: 40px;
            height: 40px;
            background: rgba(0, 243, 255, 0.1);
        }
    `;
    document.head.appendChild(cursorStyle);
    
    // Interactive elements that enlarge cursor
    const interactiveElements = document.querySelectorAll('button, .service-card, .price-card, .nav-link');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorFollower.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursorFollower.classList.remove('hover');
        });
    });
    
    // Initialize Typing Animation for Hero Title
    const heroTitle = document.querySelector('.hero-title .highlight');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                heroTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing after a delay
        setTimeout(typeWriter, 1000);
    }
    
    // Add noise texture overlay for premium effect
    const noiseOverlay = document.createElement('div');
    noiseOverlay.className = 'noise-overlay';
    document.body.appendChild(noiseOverlay);
    
    // Add noise overlay styles
    const noiseStyle = document.createElement('style');
    noiseStyle.textContent = `
        .noise-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9998;
            opacity: 0.02;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
            mix-blend-mode: overlay;
        }
    `;
    document.head.appendChild(noiseStyle);
    
    // Lazy loading for images
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
    
    // Add loaded image animation
    const imgAnimationStyle = document.createElement('style');
    imgAnimationStyle.textContent = `
        img[data-src] {
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        img.loaded {
            opacity: 1;
        }
    `;
    document.head.appendChild(imgAnimationStyle);
    
    // Performance optimization: Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            // Perform scroll-related operations here
        }, 100);
    });
    
    // Initialize AOS-like reveal animations for all sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        revealObserver.observe(section);
    });
    
    // Add reveal animation styles
    const revealStyle = document.createElement('style');
    revealStyle.textContent = `
        section {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        section.revealed {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(revealStyle);
    
    // Theme toggle (optional dark/light mode)
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--gradient-skyline);
        border: none;
        border-radius: 50%;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: var(--neon-glow);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(themeToggle);
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        if (document.body.classList.contains('light-mode')) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            themeToggle.style.background = 'linear-gradient(135deg, #FFD700, #FF8C00)';
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            themeToggle.style.background = 'var(--gradient-skyline)';
        }
    });
    
    // Add light mode styles
    const lightModeStyle = document.createElement('style');
    lightModeStyle.textContent = `
        body.light-mode {
            --deep-night: #f0f2f5;
            --midnight-blue: #ffffff;
            --glass-white: rgba(255, 255, 255, 0.8);
            --glass-border: rgba(0, 0, 0, 0.1);
            --text-primary: #121828;
            --text-secondary: rgba(18, 24, 40, 0.7);
        }
        
        body.light-mode .glass {
            background: rgba(255, 255, 255, 0.8);
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }
        
        body.light-mode .navbar {
            background: rgba(255, 255, 255, 0.9);
        }
        
        body.light-mode .footer {
            background: #ffffff;
        }
        
        body.light-mode .noise-overlay {
            opacity: 0.01;
        }
    `;
    document.head.appendChild(lightModeStyle);
    
    // Preloader (optional)
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="preloader-content">
            <div class="preloader-logo">
                <div class="logo-icon">
                    <div class="logo-line"></div>
                    <div class="logo-line"></div>
                    <div class="logo-line"></div>
                </div>
                <span class="logo-text">SKYLINE<span class="logo-highlight">DIGITAL</span></span>
            </div>
            <div class="preloader-progress">
                <div class="progress-bar"></div>
            </div>
        </div>
    `;
    
    document.body.appendChild(preloader);
    
    // Add preloader styles
    const preloaderStyle = document.createElement('style');
    preloaderStyle.textContent = `
        .preloader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--deep-night);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            transition: opacity 0.5s ease, visibility 0.5s ease;
        }
        
        .preloader-content {
            text-align: center;
        }
        
        .preloader-logo {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 15px;
            margin-bottom: 30px;
        }
        
        .preloader-progress {
            width: 200px;
            height: 3px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 3px;
            overflow: hidden;
        }
        
        .progress-bar {
            width: 0%;
            height: 100%;
            background: var(--gradient-skyline);
            animation: loading 2s ease-in-out forwards;
        }
        
        @keyframes loading {
            0% { width: 0%; }
            100% { width: 100%; }
        }
        
        .preloader.hidden {
            opacity: 0;
            visibility: hidden;
        }
    `;
    document.head.appendChild(preloaderStyle);
    
    // Remove preloader after page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 2000);
    });
    
    // Add custom cursor trail effect
    const trail = [];
    const trailLength = 10;
    
    document.addEventListener('mousemove', (e) => {
        const dot = document.createElement('div');
        dot.className = 'cursor-trail';
        dot.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: var(--neon-blue);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            opacity: 0.7;
        `;
        
        document.body.appendChild(dot);
        trail.push(dot);
        
        if (trail.length > trailLength) {
            const oldDot = trail.shift();
            oldDot.style.opacity = '0';
            setTimeout(() => oldDot.remove(), 300);
        }
        
        // Fade out trail dots
        trail.forEach((dot, index) => {
            const opacity = 0.7 * (index / trailLength);
            dot.style.opacity = opacity;
            dot.style.transform = `scale(${0.5 + (index / trailLength)})`;
        });
    });
    
    // Add cursor trail animation
    const trailStyle = document.createElement('style');
    trailStyle.textContent = `
        .cursor-trail {
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
    `;
    document.head.appendChild(trailStyle);
});