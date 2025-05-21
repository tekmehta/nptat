// Nepal Pashupatinath Tour and Travels
// Enhanced JavaScript with Animations and Responsiveness

document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = '<div class="loader"></div>';
    document.body.appendChild(preloader);
    
    // Remove preloader after page load
    window.addEventListener('load', function() {
        preloader.classList.add('fade-out');
        setTimeout(function() {
            preloader.remove();
        }, 500);
    });
    
    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Toggle menu icon
            const bars = this.querySelectorAll('.bar');
            if (this.classList.contains('active')) {
                bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navMenu && navMenu.classList.contains('active') && !event.target.closest('.nav-menu') && !event.target.closest('.menu-toggle')) {
            navMenu.classList.remove('active');
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
                const bars = mobileMenu.querySelectorAll('.bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Close mobile menu if open
                    if (navMenu && navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        if (mobileMenu) {
                            mobileMenu.classList.remove('active');
                            const bars = mobileMenu.querySelectorAll('.bar');
                            bars[0].style.transform = 'none';
                            bars[1].style.opacity = '1';
                            bars[2].style.transform = 'none';
                        }
                    }
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Sticky Header
    const header = document.querySelector('header');
    const heroSection = document.querySelector('.hero');
    
    if (header && heroSection) {
        const heroHeight = heroSection.offsetHeight;
        
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > heroHeight - 100) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        });
    }
    
    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('active');
            } else {
                backToTopButton.classList.remove('active');
            }
        });
        
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Booking Tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    if (tabButtons.length > 0 && tabPanes.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons and panes
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanes.forEach(pane => pane.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Show corresponding tab pane
                const tabId = this.getAttribute('data-tab');
                const targetPane = document.getElementById(tabId + '-tab');
                if (targetPane) {
                    targetPane.classList.add('active');
                }
            });
        });
    }
    
    // Destination Slider
    const destinationSlider = document.querySelector('.destination-slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (destinationSlider && prevBtn && nextBtn) {
        let slideIndex = 0;
        const slides = destinationSlider.querySelectorAll('.destination-card');
        const totalSlides = slides.length;
        
        // Initialize slider for mobile
        updateSlider();
        
        // Handle window resize
        window.addEventListener('resize', updateSlider);
        
        function updateSlider() {
            if (window.innerWidth <= 768) {
                // Mobile view - show only one slide
                slides.forEach((slide, index) => {
                    if (index === slideIndex) {
                        slide.style.display = 'block';
                    } else {
                        slide.style.display = 'none';
                    }
                });
            } else {
                // Desktop view - show all slides
                slides.forEach(slide => {
                    slide.style.display = 'block';
                });
            }
        }
        
        // Previous button click
        prevBtn.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                slideIndex = (slideIndex - 1 + totalSlides) % totalSlides;
                updateSlider();
            }
        });
        
        // Next button click
        nextBtn.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                slideIndex = (slideIndex + 1) % totalSlides;
                updateSlider();
            }
        });
    }
    
    // Testimonial Slider
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const dots = document.querySelectorAll('.dot');
    
    if (testimonialSlider && dots.length > 0) {
        let testimonialIndex = 0;
        const testimonials = testimonialSlider.querySelectorAll('.testimonial-card');
        const totalTestimonials = testimonials.length;
        
        // Initialize testimonial slider for mobile
        updateTestimonialSlider();
        
        // Handle window resize
        window.addEventListener('resize', updateTestimonialSlider);
        
        function updateTestimonialSlider() {
            if (window.innerWidth <= 768) {
                // Mobile view - show only one testimonial
                testimonials.forEach((testimonial, index) => {
                    if (index === testimonialIndex) {
                        testimonial.style.display = 'block';
                    } else {
                        testimonial.style.display = 'none';
                    }
                });
                
                // Update dots
                dots.forEach((dot, index) => {
                    if (index === testimonialIndex) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            } else {
                // Desktop view - show all testimonials
                testimonials.forEach(testimonial => {
                    testimonial.style.display = 'block';
                });
            }
        }
        
        // Dot click
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                testimonialIndex = index;
                updateTestimonialSlider();
            });
        });
        
        // Auto slide for testimonials on mobile
        if (window.innerWidth <= 768) {
            setInterval(function() {
                testimonialIndex = (testimonialIndex + 1) % totalTestimonials;
                updateTestimonialSlider();
            }, 5000);
        }
    }
    
    // Form Validation
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const inputs = this.querySelectorAll('input, select, textarea');
            
            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                    
                    // Add error message if not exists
                    if (!input.nextElementSibling || !input.nextElementSibling.classList.contains('error-message')) {
                        const errorMessage = document.createElement('div');
                        errorMessage.classList.add('error-message');
                        errorMessage.textContent = 'This field is required';
                        input.parentNode.insertBefore(errorMessage, input.nextSibling);
                    }
                } else {
                    input.classList.remove('error');
                    
                    // Remove error message if exists
                    if (input.nextElementSibling && input.nextElementSibling.classList.contains('error-message')) {
                        input.parentNode.removeChild(input.nextElementSibling);
                    }
                }
            });
            
            if (isValid) {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.classList.add('success-message');
                successMessage.textContent = 'Form submitted successfully! We will contact you soon.';
                form.appendChild(successMessage);
                
                // Reset form
                form.reset();
                
                // Remove success message after 3 seconds
                setTimeout(function() {
                    form.removeChild(successMessage);
                }, 3000);
            }
        });
    });
    
    // Create placeholder images with colored backgrounds
    const placeholderImages = document.querySelectorAll('img[src^="images/placeholders/"]');
    
    placeholderImages.forEach(img => {
        // Get the image dimensions
        const width = img.width || 300;
        const height = img.height || 200;
        
        // Create a canvas element
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        
        // Get the context and draw a colored rectangle
        const ctx = canvas.getContext('2d');
        
        // Generate a random color from a travel-themed palette
        const colors = [
            '#e63946', // Red
            '#f1a208', // Orange
            '#2a9d8f', // Teal
            '#1d3557', // Dark Blue
            '#457b9d', // Blue
            '#a8dadc', // Light Blue
            '#f1faee'  // Off White
        ];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Fill background
        ctx.fillStyle = randomColor;
        ctx.fillRect(0, 0, width, height);
        
        // Add text
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Extract image name from src
        const imgName = img.src.split('/').pop().split('.')[0];
        ctx.fillText(imgName.replace(/-/g, ' '), width / 2, height / 2);
        
        // Set the image src to the canvas data URL
        img.src = canvas.toDataURL('image/png');
    });
    
    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    
    function checkReveal() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    }
    
    // Initial check on load
    window.addEventListener('load', checkReveal);
    
    // Check on scroll
    window.addEventListener('scroll', checkReveal);
    
    // Add hero scroll down button
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrollDownBtn = document.createElement('div');
        scrollDownBtn.className = 'hero-scroll-down';
        scrollDownBtn.innerHTML = '<i class="fas fa-chevron-down"></i>';
        hero.appendChild(scrollDownBtn);
        
        scrollDownBtn.addEventListener('click', function() {
            const servicesSection = document.querySelector('#services');
            if (servicesSection) {
                window.scrollTo({
                    top: servicesSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Floating WhatsApp and Call buttons animation
    const floatingButtons = document.querySelectorAll('.whatsapp-btn, .call-btn');
    floatingButtons.forEach(button => {
        button.classList.add('floating');
    });
    
    // Add animation classes to elements
    const animateElements = () => {
        // Hero content animation
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.classList.add('animate-fade-in');
        }
        
        // Service cards animation
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach((card, index) => {
            card.classList.add('reveal', 'reveal-bottom');
            card.style.transitionDelay = `${0.1 * index}s`;
        });
        
        // Destination cards animation
        const destinationCards = document.querySelectorAll('.destination-card');
        destinationCards.forEach((card, index) => {
            card.classList.add('reveal', 'reveal-zoom');
            card.style.transitionDelay = `${0.1 * index}s`;
        });
        
        // Testimonial cards animation
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        testimonialCards.forEach((card, index) => {
            card.classList.add('reveal', 'reveal-bottom');
            card.style.transitionDelay = `${0.1 * index}s`;
        });
        
        // Contact cards animation
        const contactCards = document.querySelectorAll('.contact-card');
        contactCards.forEach((card, index) => {
            card.classList.add('reveal', 'reveal-left');
            card.style.transitionDelay = `${0.1 * index}s`;
        });
        
        // Form animation
        const contactForm = document.querySelector('.contact-form-container');
        if (contactForm) {
            contactForm.classList.add('reveal', 'reveal-right');
        }
    };
    
    // Run animations after page load
    window.addEventListener('load', animateElements);
    
    // Responsive image loading
    function loadResponsiveImages() {
        const windowWidth = window.innerWidth;
        const imagesToLoad = document.querySelectorAll('[data-src]');
        
        imagesToLoad.forEach(img => {
            if (windowWidth <= 768) {
                // Load mobile version
                if (img.getAttribute('data-src-mobile')) {
                    img.src = img.getAttribute('data-src-mobile');
                } else {
                    img.src = img.getAttribute('data-src');
                }
            } else {
                // Load desktop version
                img.src = img.getAttribute('data-src');
            }
            
            // Remove data attributes after loading
            img.removeAttribute('data-src');
            img.removeAttribute('data-src-mobile');
        });
    }
    
    // Load responsive images on page load and resize
    window.addEventListener('load', loadResponsiveImages);
    window.addEventListener('resize', loadResponsiveImages);
    
    // Add touch support for mobile devices
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        
        // Add touch support for sliders
        const sliderElements = document.querySelectorAll('.destination-slider, .testimonial-slider');
        
        sliderElements.forEach(slider => {
            let startX, endX;
            const threshold = 50; // Minimum distance for swipe
            
            slider.addEventListener('touchstart', function(e) {
                startX = e.touches[0].clientX;
            });
            
            slider.addEventListener('touchend', function(e) {
                endX = e.changedTouches[0].clientX;
                
                // Calculate swipe distance
                const distance = startX - endX;
                
                if (Math.abs(distance) >= threshold) {
                    if (distance > 0) {
                        // Swipe left - next slide
                        if (slider.classList.contains('destination-slider') && nextBtn) {
                            nextBtn.click();
                        } else if (slider.classList.contains('testimonial-slider') && dots.length > 0) {
                            const nextIndex = (testimonialIndex + 1) % totalTestimonials;
                            dots[nextIndex].click();
                        }
                    } else {
                        // Swipe right - previous slide
                        if (slider.classList.contains('destination-slider') && prevBtn) {
                            prevBtn.click();
                        } else if (slider.classList.contains('testimonial-slider') && dots.length > 0) {
                            const prevIndex = (testimonialIndex - 1 + totalTestimonials) % totalTestimonials;
                            dots[prevIndex].click();
                        }
                    }
                }
            });
        });
    }
    
    // Enhance form labels for better UX
    const formInputs = document.querySelectorAll('input, textarea, select');
    
    formInputs.forEach(input => {
        // Add placeholder attribute if not exists
        if (!input.hasAttribute('placeholder') && input.id) {
            const label = document.querySelector(`label[for="${input.id}"]`);
            if (label) {
                input.setAttribute('placeholder', ' ');
            }
        }
        
        // Focus and blur events for animation
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Set initial state for inputs with values
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
});
