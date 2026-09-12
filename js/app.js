/* 
 * Gandhi Rajan S — Portfolio JavaScript
 * Animations, scroll effects, particles, form handling
 */

document.addEventListener('DOMContentLoaded', () => {

    // ========================================
    // 1. PRELOADER
    // ========================================
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('loaded');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 600);
        }, 1200);
    });

    // ========================================
    // 2. TYPING EFFECT
    // ========================================
    const typingElement = document.getElementById('typing-effect');
    const words = [
        'modern web experiences.',
        'responsive websites.',
        'Full-Stack web applications.',
        'scalable backend systems.',
        'modern database solutions.'
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40;
        } else {
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 120;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 2200;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 400;
        }

        setTimeout(type, typeSpeed);
    }
    if (typingElement) type();

    // ========================================
    // 3. NAVBAR — Scroll Effect
    // ========================================
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        if (currentScroll > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    });

    // ========================================
    // 4. MOBILE MENU
    // ========================================
    const mobileToggle = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('is-active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Close mobile menu on link click
    document.querySelectorAll('#nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileToggle.classList.remove('is-active');
            document.body.style.overflow = '';
        });
    });

    // ========================================
    // 5. ACTIVE NAV LINK ON SCROLL
    // ========================================
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('#nav-links a:not(.nav-btn)');

    function highlightActiveNav() {
        let current = '';
        const scrollPos = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            const href = item.getAttribute('href');
            if (href && href.substring(1) === current) {
                item.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightActiveNav);
    highlightActiveNav();

    // ========================================
    // 6. SMOOTH SCROLL WITH OFFSET
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const navHeight = navbar.offsetHeight;
                const targetPos = target.offsetTop - navHeight - 10;
                window.scrollTo({
                    top: targetPos,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // 7. CUSTOM CURSOR
    // ========================================
    const cursorDot = document.querySelector('.custom-cursor-dot');
    const cursorOutline = document.querySelector('.custom-cursor-outline');

    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (cursorDot) {
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        }
    });

    function animateCursor() {
        const lerp = 0.15;
        outlineX += (mouseX - outlineX) * lerp;
        outlineY += (mouseY - outlineY) * lerp;

        if (cursorOutline) {
            cursorOutline.style.left = `${outlineX}px`;
            cursorOutline.style.top = `${outlineY}px`;
        }

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover states for interactive elements
    const interactiveSelector = 'a, button, input, textarea, .overlay-btn, .mobile-toggle, .scroll-down, .profile-card, .cert-item, .skill-tag';
    document.querySelectorAll(interactiveSelector).forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('hovered'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('hovered'));
    });

    // ========================================
    // 8. GLASS CARD SPOTLIGHT EFFECT
    // ========================================
    document.querySelectorAll('.glass').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
            card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
        });
    });

    // ========================================
    // 9. PROJECT MODAL
    // ========================================
    const projectsData = [
        {
            title: 'Personal Portfolio Website',
            description: 'A modern, responsive developer portfolio built with dark glassmorphism design, particle animations, and interactive UI components. Fully responsive across all devices.',
            tags: ['HTML5', 'CSS3', 'JavaScript'],
            features: ['Responsive dark theme design', 'Glassmorphism UI with animated particles', 'Smooth scroll and scroll-triggered animations', 'Interactive project modal with details view'],
            github: 'https://github.com/',
            demo: '#'
        },
        {
            title: 'Inventory Management System',
            description: 'A full-featured inventory tracking system with CRUD operations, real-time stock alerts, and comprehensive reporting features for small to medium businesses.',
            tags: ['React', 'Node.js', 'MySQL'],
            features: ['CRUD operations for products and categories', 'Real-time stock level monitoring', 'Sales reporting and analytics dashboard', 'User authentication and role management'],
            github: 'https://github.com/',
            demo: '#'
        },
        {
            title: 'Real-Time Task Management Dashboard',
            description: 'A full-stack collaborative task management platform with real-time updates, kanban drag-and-drop boards, JWT user authentication, and interactive analytics dashboard.',
            tags: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
            features: ['Real-time WebSocket task status updates', 'Kanban drag-and-drop workflow boards', 'JWT based user authentication & roles', 'MongoDB schema optimization & queries'],
            github: 'https://github.com/',
            demo: '#'
        },
        {
            title: 'Micro-Blogging Application',
            description: 'A lightweight social platform for short-form content with real-time feed updates, user authentication, and an engaging user experience.',
            tags: ['React', 'Firebase', 'Tailwind'],
            features: ['User authentication and profiles', 'Create, edit, and delete posts', 'Real-time feed updates', 'Responsive mobile-first design'],
            github: 'https://github.com/',
            demo: '#'
        }
    ];

    const modal = document.getElementById('project-modal');
    const modalClose = document.getElementById('modal-close');
    const modalTitle = document.getElementById('modal-title');
    const modalTags = document.getElementById('modal-tags');
    const modalDescription = document.getElementById('modal-description');
    const modalFeatures = document.getElementById('modal-features-list');
    const modalGithub = document.getElementById('modal-github');
    const modalDemo = document.getElementById('modal-demo');

    document.querySelectorAll('.project-details-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = btn.closest('.project-card');
            const index = parseInt(card.getAttribute('data-project'));
            const project = projectsData[index];

            if (project) {
                modalTitle.textContent = project.title;
                modalDescription.textContent = project.description;
                modalTags.innerHTML = project.tags.map(t => `<span>${t}</span>`).join('');
                modalFeatures.innerHTML = project.features.map(f => `<li>${f}</li>`).join('');
                modalGithub.href = project.github || '#';
                modalDemo.href = project.demo || '#';
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });

    // ========================================
    // 10. PARTICLE CANVAS — Hero
    // ========================================
    const canvas = document.getElementById('hero-particles');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let canvasWidth, canvasHeight;

        const resizeCanvas = () => {
            canvasWidth = canvas.offsetWidth;
            canvasHeight = canvas.offsetHeight;
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        let mouseInHero = false;
        let heroMouseX = 0, heroMouseY = 0;

        const heroSection = document.getElementById('hero');
        if (heroSection) {
            heroSection.addEventListener('mousemove', (e) => {
                const rect = heroSection.getBoundingClientRect();
                heroMouseX = e.clientX - rect.left;
                heroMouseY = e.clientY - rect.top;
                mouseInHero = true;
            });
            heroSection.addEventListener('mouseleave', () => { mouseInHero = false; });
        }

        class Particle {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * canvasWidth;
                this.y = Math.random() * canvasHeight;
                this.size = Math.random() * 2.2 + 0.8;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.colorType = Math.floor(Math.random() * 3); // 0: cyan, 1: purple, 2: magenta
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x < 0 || this.x > canvasWidth) this.speedX *= -1;
                if (this.y < 0 || this.y > canvasHeight) this.speedY *= -1;

                if (mouseInHero) {
                    const dx = this.x - heroMouseX;
                    const dy = this.y - heroMouseY;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 130) {
                        const force = (130 - dist) / 130;
                        this.x += (dx / dist) * force * 1.8;
                        this.y += (dy / dist) * force * 1.8;
                    }
                }
            }
            draw() {
                let color = 'rgba(0, 242, 254, 0.4)';
                if (this.colorType === 1) color = 'rgba(124, 58, 237, 0.4)';
                if (this.colorType === 2) color = 'rgba(255, 0, 122, 0.3)';

                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const initParticles = () => {
            particles = [];
            const count = Math.min(Math.floor((canvasWidth * canvasHeight) / 14000), 90);
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        };
        initParticles();
        window.addEventListener('resize', initParticles);

        const animateParticles = () => {
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 110) {
                        const alpha = 0.09 * (1 - dist / 110);
                        const strokeColor = particles[i].colorType === 1 ? `rgba(124, 58, 237, ${alpha})` : `rgba(0, 242, 254, ${alpha})`;
                        ctx.strokeStyle = strokeColor;
                        ctx.lineWidth = 0.6;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animateParticles);
        };
        animateParticles();
    }

    // ========================================
    // 11. SCROLL REVEAL ANIMATIONS
    // ========================================
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.05,
        rootMargin: '0px 0px -30px 0px'
    });

    const revealSelectors = [
        '.section-header',
        '.about-content',
        '.highlight-card',
        '.timeline-item',
        '.skill-category',
        '.project-card',
        '.cert-item',
        '.profile-card',
        '.building-wrapper',
        '.contact-info',
        '.contact-form',
        '.detail-item',
        '.form-group'
    ].join(', ');

    document.querySelectorAll(revealSelectors).forEach(el => {
        el.classList.add('reveal-item');
        revealObserver.observe(el);
    });

    // ========================================
    // 12. ANIMATED NUMBER COUNTERS
    // ========================================
    const statNums = document.querySelectorAll('.stat-num[data-target]');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'));
                const duration = 2000;
                const startTime = performance.now();

                function updateCounter(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);

                    // Ease-out cubic
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const current = Math.floor(eased * target);

                    el.textContent = current + (target > 50 ? '+' : '+');

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        el.textContent = target + '+';
                    }
                }

                requestAnimationFrame(updateCounter);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNums.forEach(num => counterObserver.observe(num));

    // ========================================
    // 13. FORM SUBMISSION — API & Mailto Fallback
    // ========================================
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalHTML = btn.innerHTML;

            const name = contactForm.querySelector('#name').value.trim();
            const email = contactForm.querySelector('#email').value.trim();
            const subject = contactForm.querySelector('#subject').value.trim();
            const message = contactForm.querySelector('#message').value.trim();

            if (!name || !email || !subject || !message) {
                if (formStatus) {
                    formStatus.textContent = '✗ Please fill in all required fields.';
                    formStatus.className = 'form-status error';
                    setTimeout(() => { formStatus.className = 'form-status'; }, 4000);
                }
                return;
            }

            btn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
            btn.disabled = true;

            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, subject, message })
                });

                if (response.ok) {
                    btn.innerHTML = 'Message Sent! <i class="fa-solid fa-check"></i>';
                    btn.style.background = 'var(--success)';
                    contactForm.reset();

                    if (formStatus) {
                        formStatus.textContent = '✓ Thank you! Your message has been saved successfully.';
                        formStatus.className = 'form-status success';
                    }
                } else {
                    throw new Error('API request failed');
                }
            } catch (error) {
                console.log('Backend API unreachable, using mailto fallback:', error);
                const mailtoLink = `mailto:gandhirajan.dev@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
                    `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
                )}`;
                window.location.href = mailtoLink;

                btn.innerHTML = 'Mail Client Opened <i class="fa-solid fa-envelope"></i>';
                btn.style.background = 'var(--primary)';
                contactForm.reset();

                if (formStatus) {
                    formStatus.textContent = '✓ Opened your default mail client to deliver your message.';
                    formStatus.className = 'form-status success';
                }
            } finally {
                setTimeout(() => {
                    btn.innerHTML = originalHTML;
                    btn.style.background = '';
                    btn.disabled = false;
                    if (formStatus) formStatus.className = 'form-status';
                }, 5000);
            }
        });
    }

    // ========================================
    // 14. PARALLAX BLOBS ON MOUSEMOVE
    // ========================================
    const blobs = document.querySelectorAll('.blob');
    if (blobs.length > 0) {
        window.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;

            blobs.forEach((blob, index) => {
                const speed = (index + 1) * 12;
                blob.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
            });
        });
    }

});
