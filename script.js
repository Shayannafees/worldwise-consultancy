// script.js (All JavaScript in this external JS file)

document.addEventListener('DOMContentLoaded', () => {
    // --- Navigation Burger Menu ---
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    if (burger && nav) {
        burger.addEventListener('click', () => {
            // Toggle Nav
            nav.classList.toggle('nav-active');

            // Animate Links
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });

            // Burger Animation
            burger.classList.toggle('toggle');
        });
    }

    // --- Smooth Scroll/Fade-in Animations ---
    const animateOnScroll = () => {
        const sections = document.querySelectorAll('.scroll-animation, .fade-in');
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const screenHeight = window.innerHeight;

            // Trigger animation when section is in viewport
            if (sectionTop < screenHeight * 0.85) { // 85% of screen height
                if (section.classList.contains('scroll-animation')) {
                    section.classList.add('active');
                } else if (section.classList.contains('fade-in')) {
                    section.classList.add('appear');
                }
            }
        });
    };

    // Initial check on page load
    animateOnScroll();

    // Listen for scroll events
    window.addEventListener('scroll', animateOnScroll);

    // --- Contact Form Validation ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            let isValid = true;
            const formMessage = document.getElementById('formMessage');
            formMessage.style.display = 'none'; // Hide previous messages

            // Get form fields
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');

            // Get error message divs
            const nameError = document.getElementById('nameError');
            const emailError = document.getElementById('emailError');
            const messageError = document.getElementById('messageError');

            // Clear previous errors
            nameError.style.display = 'none';
            emailError.style.display = 'none';
            messageError.style.display = 'none';
            nameInput.classList.remove('invalid');
            emailInput.classList.remove('invalid');
            messageInput.classList.remove('invalid');

            // Validate Name
            if (nameInput.value.trim() === '') {
                nameError.textContent = 'Name is required.';
                nameError.style.display = 'block';
                nameInput.classList.add('invalid');
                isValid = false;
            }

            // Validate Email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailInput.value.trim() === '') {
                emailError.textContent = 'Email is required.';
                emailError.style.display = 'block';
                emailInput.classList.add('invalid');
                isValid = false;
            } else if (!emailRegex.test(emailInput.value.trim())) {
                emailError.textContent = 'Please enter a valid email address.';
                emailError.style.display = 'block';
                emailInput.classList.add('invalid');
                isValid = false;
            }

            // Validate Message
            if (messageInput.value.trim() === '') {
                messageError.textContent = 'Message cannot be empty.';
                messageError.style.display = 'block';
                messageInput.classList.add('invalid');
                isValid = false;
            }

            if (isValid) {
                // If validation passes, simulate form submission
                formMessage.classList.remove('error');
                formMessage.classList.add('success');
                formMessage.textContent = 'Your message has been sent successfully!';
                formMessage.style.display = 'block';
                contactForm.reset(); // Clear the form
            } else {
                formMessage.classList.remove('success');
                formMessage.classList.add('error');
                formMessage.textContent = 'Please correct the errors in the form.';
                formMessage.style.display = 'block';
            }
        });
    }
});

// Keyframe animation for navigation links
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = `
    @keyframes navLinkFade {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0px);
        }
    }
`;
document.head.appendChild(styleSheet);