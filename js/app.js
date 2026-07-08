/* 
 * Gandhi Rajan Portfolio JavaScript
 * Logic for animations, scrolling, and UI interactions
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Preloader
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1500);
    });

    // 2. Typing Effect
    const typingElement = document.getElementById('typing-effect');
    const words = ['Modern Websites', 'Scalable Apps', 'Beautiful UI/UX', 'React Experiences'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 150;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }
    type();

    // 3. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 4. Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('is-active');
        });
    }

    // Close mobile menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileToggle.classList.remove('is-active');
        });
    });

    // 5. Active Link on Scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').substring(1) === current) {
                item.classList.add('active');
            }
        });
    });

    // 6. Custom Cursor
    const cursorDot = document.querySelector('.custom-cursor-dot');
    const cursorOutline = document.querySelector('.custom-cursor-outline');
    
    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;
    
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Instant position for the dot
        if (cursorDot) {
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        }
    });
    
    // Smooth outline trailing (lerp)
    function animateCursor() {
        const xp = 0.15; // interpolation factor
        outlineX += (mouseX - outlineX) * xp;
        outlineY += (mouseY - outlineY) * xp;
        
        if (cursorOutline) {
            cursorOutline.style.left = `${outlineX}px`;
            cursorOutline.style.top = `${outlineY}px`;
        }
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Add hover states for interactive elements
    const interactives = document.querySelectorAll('a, button, input, textarea, .view-btn, .mobile-toggle, .scroll-down');
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('hovered');
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('hovered');
        });
    });

    // 7. Glass Card Spotlight Effect
    const glassCards = document.querySelectorAll('.glass');
    glassCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // 8. Particle Canvas Engine (Hero Section)
    const canvas = document.getElementById('hero-particles');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let canvasWidth = canvas.offsetWidth;
        let canvasHeight = canvas.offsetHeight;
        
        const resizeCanvas = () => {
            if (canvas.offsetWidth !== canvasWidth || canvas.offsetHeight !== canvasHeight) {
                canvasWidth = canvas.offsetWidth;
                canvasHeight = canvas.offsetHeight;
                canvas.width = canvasWidth;
                canvas.height = canvasHeight;
            }
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        let mouseInHero = false;
        let heroMouseX = 0;
        let heroMouseY = 0;
        
        const heroSection = document.getElementById('hero');
        if (heroSection) {
            heroSection.addEventListener('mousemove', (e) => {
                const rect = heroSection.getBoundingClientRect();
                heroMouseX = e.clientX - rect.left;
                heroMouseY = e.clientY - rect.top;
                mouseInHero = true;
            });
            heroSection.addEventListener('mouseleave', () => {
                mouseInHero = false;
            });
        }
        
        class Particle {
            constructor() {
                this.x = Math.random() * canvasWidth;
                this.y = Math.random() * canvasHeight;
                this.size = Math.random() * 2 + 1;
                this.speedX = Math.random() * 0.6 - 0.3;
                this.speedY = Math.random() * 0.6 - 0.3;
                this.baseSize = this.size;
            }
            
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                
                // Keep inside canvas limits
                if (this.x < 0 || this.x > canvasWidth) this.speedX *= -1;
                if (this.y < 0 || this.y > canvasHeight) this.speedY *= -1;
                
                // Magnet attraction/repulsion based on mouse
                if (mouseInHero) {
                    const dx = this.x - heroMouseX;
                    const dy = this.y - heroMouseY;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 120) {
                        const force = (120 - distance) / 120;
                        this.x += (dx / distance) * force * 1.5;
                        this.y += (dy / distance) * force * 1.5;
                    }
                }
            }
            
            draw() {
                ctx.fillStyle = 'rgba(0, 242, 254, 0.35)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }
        }
        
        const initParticles = () => {
            particles = [];
            const particleCount = Math.floor((canvasWidth * canvasHeight) / 15000);
            for (let i = 0; i < Math.min(particleCount, 80); i++) {
                particles.push(new Particle());
            }
        };
        initParticles();
        window.addEventListener('resize', initParticles);
        
        const animate = () => {
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            
            // Draw connection lines
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
                
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 100) {
                        ctx.strokeStyle = `rgba(0, 242, 254, ${0.1 * (1 - dist / 100)})`;
                        ctx.lineWidth = 0.8;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animate);
        };
        animate();
    }

    // 9. Premium Cascading Scroll Reveals
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.05,
        rootMargin: '0px 0px -40px 0px'
    });

    const targetElements = document.querySelectorAll(
        '.skill-card, .project-card, .section-header, .about-content, .detail-item, .form-group, .contact-info'
    );
    targetElements.forEach(el => {
        el.classList.add('reveal-item');
        revealObserver.observe(el);
    });

    // 10. Form Submission (Simulated)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerHTML;

            btn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = 'Message Sent! <i class="fa-solid fa-check"></i>';
                btn.style.background = '#00c853';
                contactForm.reset();

                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3000);
            }, 2000);
        });
    }
});
