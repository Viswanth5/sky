// Initialize GSAP and anime.js animations

document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles
    initParticles();
    
    // Initialize neon canvas animation
    initNeonCanvas();
    
    // Initialize magnetic buttons
    initMagneticButtons();
    
    // Initialize counters
    initCounters();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize service cards
    initServiceCards();
    
    // Initialize form interactions
    initFormAnimations();
});

// Particle System
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * 3 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        // Set styles
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: var(--neon-blue);
            border-radius: 50%;
            left: ${posX}%;
            top: ${posY}%;
            opacity: ${Math.random() * 0.5 + 0.2};
            filter: blur(${Math.random()}px);
            animation: particle-float ${duration}s ease-in-out infinite;
            animation-delay: ${delay}s;
        `;
        
        particlesContainer.appendChild(particle);
    }
    
    // Add CSS for particle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particle-float {
            0%, 100% {
                transform: translate(0, 0) scale(1);
                opacity: ${Math.random() * 0.5 + 0.2};
            }
            25% {
                transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px) scale(${Math.random() * 0.5 + 0.8});
            }
            50% {
                transform: translate(${Math.random() * 30 - 15}px, ${Math.random() * 30 - 15}px) scale(${Math.random() * 0.3 + 0.7});
                opacity: ${Math.random() * 0.3 + 0.1};
            }
            75% {
                transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px) scale(${Math.random() * 0.5 + 0.8});
            }
        }
    `;
    document.head.appendChild(style);
}

// Neon Canvas Animation
function initNeonCanvas() {
    const canvas = document.getElementById('neonCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const particles = [];
    const particleCount = 100;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 2 + 0.5,
            color: `rgba(${Math.random() > 0.5 ? '0, 243, 255' : '157, 0, 255'}, ${Math.random() * 0.5 + 0.3})`
        });
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        particles.forEach((p, i) => {
            // Update position
            p.x += p.vx;
            p.y += p.vy;
            
            // Bounce off edges
            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
            
            // Draw connections
            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(0, 243, 255, ${0.2 * (1 - distance / 100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        });
        
        requestAnimationFrame(animate);
    }
    
    // Start animation
    animate();
    
    // Handle resize
    window.addEventListener('resize', () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    });
}

// Magnetic Buttons
function initMagneticButtons() {
    const magneticButtons = document.querySelectorAll('.btn-magnetic');
    
    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            
            const strength = 15;
            
            gsap.to(button, {
                x: deltaX * strength,
                y: deltaY * strength,
                duration: 0.5,
                ease: "power2.out"
            });
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: "elastic.out(1, 0.5)"
            });
        });
    });
}

// Animated Counters
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Scroll Animations
function initScrollAnimations() {
    // Animate elements on scroll
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate service cards
    gsap.utils.toArray('.service-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top bottom-=100",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: "power2.out"
        });
    });
    
    // Animate about section
    gsap.from('.about-card', {
        scrollTrigger: {
            trigger: '.about-section',
            start: "top center",
            toggleActions: "play none none reverse"
        },
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
    });
    
    // Animate advantages
    gsap.utils.toArray('.advantage').forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top bottom-=50",
                toggleActions: "play none none reverse"
            },
            scale: 0.8,
            opacity: 0,
            duration: 0.6,
            delay: i * 0.1,
            ease: "back.out(1.7)"
        });
    });
    
    // Parallax effect for sections
    gsap.utils.toArray('section').forEach(section => {
        const bg = section.querySelector('.section-bg');
        if (bg) {
            gsap.to(bg, {
                yPercent: 20,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    scrub: true
                }
            });
        }
    });
}

// Service Cards Interaction
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    const modal = document.getElementById('serviceModal');
    const modalClose = modal.querySelector('.modal-close');
    const modalBody = modal.querySelector('.modal-body');
    
    const serviceDetails = {
        1: {
            title: "Creative Studio",
            icon: "fas fa-paint-brush",
            description: "Transform your ideas into stunning visual experiences. Our Creative Studio combines artistry with technology to deliver compelling visuals that capture attention and tell your brand's story.",
            features: [
                "Video Editing & Production",
                "Motion Graphics & Animation",
                "Brand Identity Design",
                "Social Media Content",
                "Advertisement Campaigns",
                "UI/UX Design"
            ],
            process: [
                "Discovery & Concept",
                "Creative Direction",
                "Production",
                "Review & Refine",
                "Delivery & Launch"
            ]
        },
        2: {
            title: "Web & Software Dev",
            icon: "fas fa-laptop-code",
            description: "Build robust digital solutions with cutting-edge technology. From responsive websites to complex software systems, we deliver scalable and future-proof solutions.",
            features: [
                "Responsive Web Development",
                "Progressive Web Apps",
                "E-commerce Solutions",
                "Custom Software Development",
                "API Integration",
                "Performance Optimization"
            ],
            process: [
                "Planning & Architecture",
                "Development & Testing",
                "Quality Assurance",
                "Deployment",
                "Maintenance & Support"
            ]
        },
        3: {
            title: "AI Automation Lab",
            icon: "fas fa-brain",
            description: "Leverage artificial intelligence to automate processes, gain insights, and create intelligent solutions that transform your business operations.",
            features: [
                "AI Chatbots & Virtual Assistants",
                "Machine Learning Models",
                "Data Analysis & Visualization",
                "Process Automation",
                "Predictive Analytics",
                "Natural Language Processing"
            ],
            process: [
                "Data Assessment",
                "Model Development",
                "Integration Planning",
                "Testing & Training",
                "Deployment & Monitoring"
            ]
        },
        4: {
            title: "Digital Marketing",
            icon: "fas fa-bullhorn",
            description: "Drive growth and engagement with data-driven marketing strategies. Reach your target audience effectively across all digital channels.",
            features: [
                "Social Media Marketing",
                "Search Engine Optimization",
                "Content Marketing",
                "Email Campaigns",
                "Analytics & Reporting",
                "Brand Strategy"
            ],
            process: [
                "Market Research",
                "Strategy Development",
                "Campaign Execution",
                "Performance Tracking",
                "Optimization & Scaling"
            ]
        },
        5: {
            title: "Skyline Academy",
            icon: "fas fa-graduation-cap",
            description: "Empower your team with cutting-edge skills. Our comprehensive training programs cover the latest digital technologies and strategies.",
            features: [
                "Workshops & Bootcamps",
                "Online Courses",
                "Corporate Training",
                "Mentorship Programs",
                "Certification",
                "Learning Resources"
            ],
            process: [
                "Skill Assessment",
                "Custom Curriculum",
                "Interactive Training",
                "Practical Projects",
                "Certification & Support"
            ]
        }
    };
    
    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            const serviceId = card.getAttribute('data-service');
            const service = serviceDetails[serviceId];
            
            if (service) {
                modalBody.innerHTML = `
                    <div class="modal-header">
                        <div class="modal-icon">
                            <i class="${service.icon}"></i>
                        </div>
                        <h2>${service.title}</h2>
                    </div>
                    <div class="modal-description">
                        <p>${service.description}</p>
                    </div>
                    <div class="modal-content-grid">
                        <div class="modal-features">
                            <h3>What We Offer</h3>
                            <ul>
                                ${service.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="modal-process">
                            <h3>Our Process</h3>
                            <ol>
                                ${service.process.map(step => `<li>${step}</li>`).join('')}
                            </ol>
                        </div>
                    </div>
                    <div class="modal-actions">
                        <button class="btn-primary">Start Project</button>
                        <button class="btn-secondary">Learn More</button>
                    </div>
                `;
                
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
                
                // Add modal styles
                const modalStyle = document.createElement('style');
                modalStyle.textContent = `
                    .modal-header {
                        display: flex;
                        align-items: center;
                        gap: 1rem;
                        margin-bottom: 2rem;
                    }
                    
                    .modal-icon {
                        width: 60px;
                        height: 60px;
                        background: var(--gradient-skyline);
                        border-radius: 15px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 2rem;
                    }
                    
                    .modal-header h2 {
                        font-size: 2rem;
                        background: var(--gradient-skyline);
                        -webkit-background-clip: text;
                        background-clip: text;
                        color: transparent;
                    }
                    
                    .modal-description {
                        margin-bottom: 2rem;
                        line-height: 1.6;
                    }
                    
                    .modal-content-grid {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 2rem;
                        margin-bottom: 2rem;
                    }
                    
                    .modal-features ul,
                    .modal-process ol {
                        list-style: none;
                        padding-left: 0;
                    }
                    
                    .modal-features li,
                    .modal-process li {
                        margin-bottom: 0.75rem;
                        padding-left: 1.5rem;
                        position: relative;
                    }
                    
                    .modal-features li:before {
                        content: '✓';
                        position: absolute;
                        left: 0;
                        color: var(--neon-blue);
                    }
                    
                    .modal-process li:before {
                        content: counter(list-item);
                        position: absolute;
                        left: 0;
                        width: 20px;
                        height: 20px;
                        background: var(--gradient-skyline);
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 0.75rem;
                    }
                    
                    .modal-process ol {
                        counter-reset: list-item;
                    }
                    
                    .modal-process li {
                        counter-increment: list-item;
                    }
                    
                    .modal-actions {
                        display: flex;
                        gap: 1rem;
                        justify-content: center;
                    }
                    
                    @media (max-width: 768px) {
                        .modal-content-grid {
                            grid-template-columns: 1fr;
                        }
                        
                        .modal-actions {
                            flex-direction: column;
                        }
                    }
                `;
                modalBody.appendChild(modalStyle);
            }
        });
    });
    
    // Close modal
    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Form Animations
function initFormAnimations() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        // Add ripple effect on focus
        input.addEventListener('focus', (e) => {
            const rect = e.target.getBoundingClientRect();
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            ripple.style.cssText = `
                position: absolute;
                width: 100%;
                height: 2px;
                background: var(--gradient-skyline);
                bottom: 0;
                left: 0;
                transform: scaleX(0);
                transform-origin: center;
                animation: ripple-expand 0.3s ease-out forwards;
            `;
            
            e.target.parentNode.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 300);
        });
        
        // Add ripple animation
        const rippleStyle = document.createElement('style');
        rippleStyle.textContent = `
            @keyframes ripple-expand {
                to {
                    transform: scaleX(1);
                }
            }
        `;
        document.head.appendChild(rippleStyle);
    });
    
    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Create submission animation
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.querySelector('span').textContent;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            submitBtn.innerHTML = `<i class="fas fa-check"></i> ${originalText}`;
            submitBtn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
            
            // Reset form
            form.reset();
            
            // Show success message
            const successMsg = document.createElement('div');
            successMsg.className = 'success-message';
            successMsg.textContent = 'Message sent successfully! We\'ll get back to you soon.';
            successMsg.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--gradient-skyline);
                color: white;
                padding: 1rem 2rem;
                border-radius: 10px;
                animation: slide-in 0.3s ease-out;
                z-index: 10000;
            `;
            
            document.body.appendChild(successMsg);
            
            setTimeout(() => {
                successMsg.style.animation = 'slide-out 0.3s ease-out forwards';
                setTimeout(() => {
                    document.body.removeChild(successMsg);
                }, 300);
            }, 3000);
            
            // Reset button after 2 seconds
            setTimeout(() => {
                submitBtn.innerHTML = `<span>${originalText}</span><i class="fas fa-paper-plane"></i>`;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 2000);
        }, 1500);
    });
    
    // Add success animation
    const successStyle = document.createElement('style');
    successStyle.textContent = `
        @keyframes slide-in {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slide-out {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(successStyle);
}

// Handle window resize
window.addEventListener('resize', () => {
    // Reinitialize canvas if needed
    const canvas = document.getElementById('neonCanvas');
    if (canvas) {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
});

// Add smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});