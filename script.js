// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling to birthday card when arrow is clicked
    const scrollArrow = document.querySelector('.bounce-arrow');
    const cardSection = document.querySelector('.card-section');
    
    if (scrollArrow && cardSection) {
        scrollArrow.addEventListener('click', function() {
            cardSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start' 
            });
        });
    }
    
    // Auto-scroll to card section after video ends
    const video = document.getElementById('birthdayVideo');
    if (video) {
        video.addEventListener('ended', function() {
            setTimeout(() => {
                cardSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start' 
                });
            }, 1000); // Wait 1 second after video ends
        });
    }
    
    // Add scroll indicator behavior
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const windowHeight = window.innerHeight;
            
            // Hide scroll indicator when user starts scrolling
            if (scrollTop > windowHeight * 0.1) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.transition = 'opacity 0.5s ease';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        });
    }
    
    // Add parallax effect to decorative elements
    const decorativeElements = document.querySelectorAll('.decorative-elements > *');
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const rate = scrollTop * -0.5;
        
        decorativeElements.forEach((element, index) => {
            const speed = (index + 1) * 0.1;
            element.style.transform = `translateY(${rate * speed}px)`;
        });
    });
    
    // Add click effects to birthday card
    const birthdayCard = document.querySelector('.birthday-card');
    if (birthdayCard) {
        birthdayCard.addEventListener('click', function() {
            // Add a temporary celebration effect
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
            
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 300);
            
            // Create floating hearts effect
            createFloatingHearts();
        });
    }
    
    // Function to create floating hearts animation
    function createFloatingHearts() {
        const heartsContainer = document.createElement('div');
        heartsContainer.style.position = 'fixed';
        heartsContainer.style.top = '0';
        heartsContainer.style.left = '0';
        heartsContainer.style.width = '100%';
        heartsContainer.style.height = '100%';
        heartsContainer.style.pointerEvents = 'none';
        heartsContainer.style.zIndex = '9999';
        document.body.appendChild(heartsContainer);
        
        // Create multiple hearts
        for (let i = 0; i < 10; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.style.position = 'absolute';
            heart.style.fontSize = '2rem';
            heart.style.left = Math.random() * window.innerWidth + 'px';
            heart.style.top = window.innerHeight + 'px';
            heart.style.animation = `floatUp 3s ease-out forwards`;
            heart.style.animationDelay = i * 0.2 + 's';
            
            heartsContainer.appendChild(heart);
        }
        
        // Remove hearts after animation
        setTimeout(() => {
            document.body.removeChild(heartsContainer);
        }, 4000);
    }
    
    // Add CSS for floating hearts animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatUp {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            }
        });
    }, observerOptions);
    
    // Observe card elements for animation
    const cardElements = document.querySelectorAll('.birthday-card, .celebration-text');
    cardElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        observer.observe(element);
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowDown' || e.key === ' ') {
            e.preventDefault();
            cardSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start' 
            });
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            document.querySelector('.video-section').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start' 
            });
        }
    });
    
    // Add loading animation for video
    if (video) {
        video.addEventListener('loadstart', function() {
            const loader = document.createElement('div');
            loader.innerHTML = '🎬 Loading your special video...';
            loader.style.position = 'absolute';
            loader.style.top = '50%';
            loader.style.left = '50%';
            loader.style.transform = 'translate(-50%, -50%)';
            loader.style.color = 'white';
            loader.style.fontSize = '1.2rem';
            loader.style.textAlign = 'center';
            loader.style.zIndex = '10';
            loader.className = 'video-loader';
            
            document.querySelector('.video-container').appendChild(loader);
        });
        
        video.addEventListener('canplay', function() {
            const loader = document.querySelector('.video-loader');
            if (loader) {
                loader.remove();
            }
        });
    }
    
    console.log('🎉 Birthday website loaded successfully! 🎂');
});
