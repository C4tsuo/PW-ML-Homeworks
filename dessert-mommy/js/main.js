/* ========================================
   DESSERT MOMMY - JAVASCRIPT
   Interactive Functionality
   ======================================== */

// DOM Elements
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.querySelector('.nav-links');
const bookingForm = document.getElementById('bookingForm');

// Mobile Menu Toggle
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Toggle icon
        const icon = mobileMenuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
            
            // Create mobile menu overlay
            if (!document.querySelector('.mobile-menu-overlay')) {
                const overlay = document.createElement('div');
                overlay.className = 'mobile-menu-overlay';
                overlay.style.cssText = `
                    position: fixed;
                    top: 70px;
                    left: 0;
                    right: 0;
                    background: white;
                    padding: 20px;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                    z-index: 999;
                    display: none;
                `;
                
                const mobileNav = document.createElement('ul');
                mobileNav.style.cssText = `
                    list-style: none;
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                `;
                
                const links = ['Home', 'Menu', 'Celebration Hub', 'Mystery Box', 'Sweet Points'];
                const hrefs = ['#home', '#menu', '#celebration', '#mystery-box', '#membership'];
                
                links.forEach((link, index) => {
                    const li = document.createElement('li');
                    const a = document.createElement('a');
                    a.href = hrefs[index];
                    a.textContent = link;
                    a.style.cssText = `
                        text-decoration: none;
                        color: #2D3436;
                        font-weight: 600;
                        font-size: 1.1rem;
                        display: block;
                        padding: 10px;
                        border-radius: 10px;
                        transition: all 0.3s ease;
                    `;
                    a.addEventListener('click', () => {
                        navLinks.classList.remove('active');
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                        overlay.style.display = 'none';
                    });
                    a.addEventListener('mouseenter', () => {
                        a.style.background = 'linear-gradient(135deg, #FFB6C1 0%, #87CEEB 100%)';
                        a.style.color = 'white';
                    });
                    a.addEventListener('mouseleave', () => {
                        a.style.background = 'transparent';
                        a.style.color = '#2D3436';
                    });
                    li.appendChild(a);
                    mobileNav.appendChild(li);
                });
                
                overlay.appendChild(mobileNav);
                document.body.appendChild(overlay);
            }
            
            const overlay = document.querySelector('.mobile-menu-overlay');
            overlay.style.display = 'block';
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            const overlay = document.querySelector('.mobile-menu-overlay');
            if (overlay) {
                overlay.style.display = 'none';
            }
        }
    });
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                const overlay = document.querySelector('.mobile-menu-overlay');
                if (overlay) {
                    overlay.style.display = 'none';
                }
            }
        }
    });
});

// Active Navigation Link on Scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Package Selection Function
function selectPackage(packageName) {
    const packageSelect = document.getElementById('package');
    if (packageSelect) {
        packageSelect.value = packageName;
        
        // Scroll to booking form
        const bookingSection = document.querySelector('.booking-form-container');
        if (bookingSection) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = bookingSection.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
        
        // Show success message
        showNotification(`Selected ${packageName} Package! Please fill out the booking form below.`);
    }
}

// Add to Cart Function
function addToCart(boxType, price) {
    showNotification(`${boxType} (৳${price}) added to cart! 🎁`);
    
    // In a real application, this would add to a shopping cart
    console.log(`Added to cart: ${boxType} - ৳${price}`);
}

// Booking Form Submission
if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());
        
        // Validate form
        if (!data.name || !data.contact || !data.date || !data.time || !data.package || !data.theme) {
            showNotification('Please fill in all required fields!', 'error');
            return;
        }
        
        // Simulate form submission
        console.log('Booking submitted:', data);
        
        // Show success message
        showNotification(`🎉 Booking submitted successfully! We'll contact you at ${data.contact} soon.`, 'success');
        
        // Reset form
        this.reset();
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Style based on type
    let bgColor, textColor;
    switch(type) {
        case 'success':
            bgColor = 'linear-gradient(135deg, #00b894 0%, #00cec9 100%)';
            textColor = 'white';
            break;
        case 'error':
            bgColor = 'linear-gradient(135deg, #d63031 0%, #e17055 100%)';
            textColor = 'white';
            break;
        default:
            bgColor = 'linear-gradient(135deg, #FFB6C1 0%, #87CEEB 100%)';
            textColor = 'white';
    }
    
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: ${bgColor};
        color: ${textColor};
        padding: 15px 30px;
        border-radius: 50px;
        box-shadow: 0 8px 25px rgba(0,0,0,0.2);
        font-family: 'Nunito', sans-serif;
        font-weight: 600;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// Add keyframe animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
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
document.head.appendChild(style);

// Intersection Observer for Animations
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

// Observe all cards and sections
document.querySelectorAll('.feature-card, .pillar-card, .menu-item, .package-card, .tier-card, .mystery-box-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'var(--white)';
        navbar.style.backdropFilter = 'none';
    }
});

// Welcome Animation on Page Load
window.addEventListener('load', () => {
    console.log('🧁 Welcome to Dessert Mommy!');
    console.log('Where Every Customer Wins! 💖');
});

// Easter Egg: Konami Code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        showNotification('🎊 You found the secret! Enjoy 100 bonus Sweet Points! 🎊', 'success');
        konamiCode = [];
    }
});
