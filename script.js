// DOM Elements
const themeToggleBtn = document.getElementById('themeToggle');
const body = document.body;
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
const skillButtons = document.querySelectorAll('.skill-btn');
const skillDescription = document.getElementById('skill-description');
const projectsContainer = document.getElementById('projects-container');
const currentYearSpan = document.getElementById('current-year');
const statNumbers = document.querySelectorAll('.stat-number');

// Skill descriptions
const skillInfo = {
    "HTML": "Expert in semantic HTML5 markup, ensuring accessibility and SEO best practices. Experience with modern HTML APIs and web components.",
    "CSS": "Advanced CSS3 skills including Flexbox, Grid, custom properties, and responsive design. Focus on maintainable architecture with methodologies like BEM.",
    "JavaScript": "Strong vanilla JavaScript skills with ES6+ features. Functional programming patterns, async/await, and modular architecture.",
    "React": "Production experience with React hooks, context API, and state management. Performance optimization and component-based architecture.",
    "Node": "Building scalable server-side applications with Node.js. Experience with RESTful APIs, authentication, and performance tuning.",
    "Express": "Creating efficient backend services with Express middleware, routing, and error handling. Focus on security and maintainability.",
    "MongoDB": "NoSQL database design with MongoDB. Experience with Mongoose ODM, data modeling, and aggregation pipelines.",
    "Figma": "Creating wireframes, prototypes, and design systems. Component libraries and design token implementation.",
    "UI/UX": "User-centered design approach with focus on usability testing, information architecture, and interaction design.",
    "Motion": "Creating engaging micro-interactions and animations using CSS and JavaScript. Focus on performance and accessibility."
};

// Initialize cursor effects
function initCursor() {
    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        });

        const interactiveElements = document.querySelectorAll('a, button, .skill-btn, input, textarea, .project-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('active');
                cursorFollower.classList.add('active');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('active');
                cursorFollower.classList.remove('active');
            });
        });
    } else {
        cursor.style.display = 'none';
        cursorFollower.style.display = 'none';
    }
}

// Load projects from embedded JSON data
function loadProjects() {
    const projects = [
        {
            "name": "Corporate Dashboard",
            "description": "Enterprise analytics platform with real-time data visualization and custom reporting tools.",
            "link": "#",
            "code": "#",
            "image": "media/project1.jpg"
        },
        {
            "name": "E-Commerce Platform",
            "description": "High-end online store with product configurator and AR preview functionality.",
            "link": "#",
            "code": "#",
            "image": "media/project2.jpg"
        },
        {
            "name": "Portfolio CMS",
            "description": "Custom content management system for creative professionals to showcase their work.",
            "link": "#",
            "code": "#",
            "image": "media/project3.jpg"
        },
        {
            "name": "Financial Dashboard",
            "description": "Secure financial planning application with data encryption and portfolio analysis.",
            "link": "#",
            "code": "#",
            "image": "media/project4.jpg"
        },
        {
            "name": "Design System",
            "description": "Comprehensive UI kit and component library for large-scale applications.",
            "link": "#",
            "code": "#",
            "image": "media/project5.jpg"
        },
        {
            "name": "Interactive Web Experience",
            "description": "Immersive storytelling platform with scroll-triggered animations.",
            "link": "#",
            "code": "#",
            "image": "media/project6.jpg"
        }
    ];

    try {
        projects.forEach((project, index) => {
            const projectCard = document.createElement('div');
            projectCard.classList.add('project-card', 'fade-in', `delay-${index % 4}`);
            projectCard.innerHTML = `
                <img src="${project.image}" alt="${project.name}" class="project-image">
                <div class="project-info">
                    <h3>${project.name}</h3>
                    <p>${project.description}</p>
                    <div class="project-links">
                        <a href="${project.link}" target="_blank">View Project <i class="fas fa-external-link-alt"></i></a>
                        <a href="${project.code}" target="_blank">View Code <i class="fab fa-github"></i></a>
                    </div>
                </div>
            `;
            projectsContainer.appendChild(projectCard);
        });
    } catch (error) {
        console.error('Error creating project cards:', error);
        projectsContainer.innerHTML = '<p class="error-message">Failed to display projects. Please refresh the page.</p>';
    }
}

// Animate statistics
function animateStats() {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 1800;
        const step = target / (duration / 16);

        let current = 0;
        const increment = () => {
            current += step;
            if (current < target) {
                stat.textContent = Math.floor(current);
                requestAnimationFrame(increment);
            } else {
                stat.textContent = target + '+';
            }
        };

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                increment();
                observer.unobserve(stat);
            }
        });

        observer.observe(stat);
    });
}

// Initialize event listeners
function initEventListeners() {
    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDarkMode = body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');

        const themeIcon = themeToggleBtn.querySelector('i');
        themeIcon.classList.toggle('fa-moon');
        themeIcon.classList.toggle('fa-sun');

        cursor.style.backgroundColor = isDarkMode ? 'var(--secondary-color)' : 'var(--primary-color)';
        cursorFollower.style.borderColor = isDarkMode ? 'var(--secondary-color)' : 'var(--primary-color)';
    });

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    skillButtons.forEach(button => {
        button.addEventListener('click', () => {
            const skill = button.dataset.skill;
            skillDescription.innerHTML = `
                <div class="skill-description">
                    <h4>${skill}</h4>
                    <p>${skillInfo[skill]}</p>
                </div>
            `;
            skillButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize app
function init() {
    currentYearSpan.textContent = new Date().getFullYear();

    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        const themeIcon = themeToggleBtn.querySelector('i');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        cursor.style.backgroundColor = 'var(--secondary-color)';
        cursorFollower.style.borderColor = 'var(--secondary-color)';
    }

    initCursor();
    initEventListeners();
    loadProjects();
    animateStats();

    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.fade-in:not(.animated)');
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (elementPosition < screenPosition) {
                element.classList.add('animated');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
}

document.addEventListener('DOMContentLoaded', init);