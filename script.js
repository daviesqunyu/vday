// Get elements
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const successMessage = document.getElementById('successMessage');

// Track mouse position
let mouseX = 0;
let mouseY = 0;
let isMoving = false;

// Initialize No button position (start near Yes button)
function initializeNoButton() {
    // Wait a bit to ensure Yes button is rendered
    setTimeout(() => {
        const yesRect = yesBtn.getBoundingClientRect();
        const noRect = noBtn.getBoundingClientRect();
        
        // Position No button to the right of Yes button with some gap
        const gap = 30;
        const initialX = yesRect.right + gap;
        const initialY = yesRect.top;
        
        // Make sure it's within viewport
        const maxX = window.innerWidth - noRect.width - 20;
        const finalX = Math.min(initialX, maxX);
        
        // Use transform for smooth positioning, but also set left/top for initial position
        noBtn.style.left = finalX + 'px';
        noBtn.style.top = initialY + 'px';
        noBtn.style.transform = 'translate(0, 0)';
    }, 50);
}

// Update mouse position
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!isMoving) {
        checkAndMoveNoButton();
    }
});

// Check if cursor is near No button and move it away
function checkAndMoveNoButton() {
    const rect = noBtn.getBoundingClientRect();
    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top + rect.height / 2;
    
    const deltaX = mouseX - btnCenterX;
    const deltaY = mouseY - btnCenterY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    // If cursor is within 100px of button, move it away
    if (distance < 100) {
        moveNoButtonAway();
    }
}

// Function to move No button to a new position on screen
function moveNoButtonAway() {
    if (isMoving) return;
    isMoving = true;
    
    const rect = noBtn.getBoundingClientRect();
    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top + rect.height / 2;
    
    const deltaX = mouseX - btnCenterX;
    const deltaY = mouseY - btnCenterY;
    const angle = Math.atan2(deltaY, deltaX);
    
    // Calculate escape distance (move far away)
    const escapeDistance = 200 + Math.random() * 100;
    
    // Calculate new position (opposite direction from cursor)
    let newX = btnCenterX - Math.cos(angle) * escapeDistance;
    let newY = btnCenterY - Math.sin(angle) * escapeDistance;
    
    // Keep button within viewport with padding
    const padding = 20;
    const btnWidth = rect.width;
    const btnHeight = rect.height;
    const maxX = window.innerWidth - btnWidth - padding;
    const maxY = window.innerHeight - btnHeight - padding;
    
    // Ensure button stays on screen
    newX = Math.max(padding, Math.min(newX, maxX));
    newY = Math.max(padding, Math.min(newY, maxY));
    
    // If button would go off screen, pick a random safe position
    if (newX <= padding || newX >= maxX || newY <= padding || newY >= maxY) {
        newX = padding + Math.random() * (window.innerWidth - btnWidth - padding * 2);
        newY = padding + Math.random() * (window.innerHeight - btnHeight - padding * 2);
    }
    
    // Apply new position
    noBtn.style.left = newX + 'px';
    noBtn.style.top = newY + 'px';
    noBtn.style.transform = 'translate(0, 0)';
    
    // Reset moving flag after animation
    setTimeout(() => {
        isMoving = false;
    }, 300);
}

// Also move on mouseenter for immediate response
noBtn.addEventListener('mouseenter', () => {
    moveNoButtonAway();
});

// Prevent clicking on No button
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    moveNoButtonAway();
    return false;
});

// Make it harder to click by moving on mousedown
noBtn.addEventListener('mousedown', (e) => {
    e.preventDefault();
    moveNoButtonAway();
    return false;
});

// Yes button click handler
yesBtn.addEventListener('click', async () => {
    // Show success message
    successMessage.classList.add('show');
    
    // Add confetti effect
    createConfetti();
    
    // Save response to database
    try {
        const apiUrl = window.location.origin;
        const response = await fetch(`${apiUrl}/api/save-response`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                answer: 'yes',
                timestamp: new Date().toISOString()
            })
        });
        
        if (response.ok) {
            console.log('Response saved successfully!');
        }
    } catch (error) {
        console.error('Error saving response:', error);
    }
});

// Confetti effect
function createConfetti() {
    const colors = ['#ff1493', '#ff69b4', '#ffb6c1', '#ffc0cb', '#ff1493'];
    const confettiCount = 100;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        
        document.body.appendChild(confetti);
        
        const animationDuration = Math.random() * 3 + 2;
        const animationDelay = Math.random() * 0.5;
        const horizontalMovement = (Math.random() - 0.5) * 200;
        
        confetti.style.animation = `confettiFall ${animationDuration}s ${animationDelay}s forwards`;
        confetti.style.setProperty('--horizontal', `${horizontalMovement}px`);
        
        setTimeout(() => {
            confetti.remove();
        }, (animationDuration + animationDelay) * 1000);
    }
}

// Add confetti animation to style
const style = document.createElement('style');
style.textContent = `
    @keyframes confettiFall {
        0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) translateX(var(--horizontal)) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add fun messages when trying to click No button
const noMessages = [
    "Are you sure? 😢",
    "Please reconsider! 💔",
    "Don't do this! 😭",
    "Think about it! 💕",
    "I'll be sad! 😞",
    "Give me a chance! 🥺",
    "Pretty please? 💖",
    "You're breaking my heart! 💔"
];

let messageIndex = 0;
let messageTimeout;

noBtn.addEventListener('mouseenter', () => {
    clearTimeout(messageTimeout);
    const originalText = noBtn.innerHTML;
    messageTimeout = setTimeout(() => {
        noBtn.innerHTML = `<i class="fas fa-heart-broken"></i> ${noMessages[messageIndex % noMessages.length]}`;
        messageIndex++;
    }, 300);
});

noBtn.addEventListener('mouseleave', () => {
    clearTimeout(messageTimeout);
    messageTimeout = setTimeout(() => {
        noBtn.innerHTML = '<i class="fas fa-times"></i> No';
    }, 200);
});

// Initialize button position when page loads
function initOnLoad() {
    // Try multiple times to ensure buttons are rendered
    if (yesBtn && noBtn && yesBtn.offsetParent !== null) {
        initializeNoButton();
    } else {
        // If elements not ready, try again
        setTimeout(initOnLoad, 50);
    }
}

// Initialize immediately when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initOnLoad, 100);
    });
} else {
    // DOM already loaded
    setTimeout(initOnLoad, 100);
}

// Also initialize on window load as backup
window.addEventListener('load', () => {
    setTimeout(() => {
        initializeNoButton();
    }, 200);
});

// Recalculate position on window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        initializeNoButton();
    }, 100);
});

// Background Music Control
const backgroundMusic = document.getElementById('backgroundMusic');
const musicControl = document.getElementById('musicControl');
const playIcon = document.getElementById('playIcon');
const pauseIcon = document.getElementById('pauseIcon');

// Try to use a royalty-free romantic music URL
// You can replace this with your own music file path
const musicSources = [
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Example - replace with your music
    // Add more fallback sources if needed
];

// Set music source (you can replace this with your own music file)
if (musicSources[0]) {
    backgroundMusic.src = musicSources[0];
}

let isPlaying = false;

// Music control button click
musicControl.addEventListener('click', () => {
    if (isPlaying) {
        backgroundMusic.pause();
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
        isPlaying = false;
    } else {
        // Try to play music
        const playPromise = backgroundMusic.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                // Music started playing
                playIcon.style.display = 'none';
                pauseIcon.style.display = 'block';
                isPlaying = true;
            }).catch(error => {
                // Autoplay was prevented - user interaction required
                console.log('Autoplay prevented. User interaction required.');
                // Show a message or try again on next user interaction
                alert('Click the music button to start playing! 🎵');
            });
        }
    }
});

// Auto-play music when user interacts with the page (after first click anywhere)
let hasInteracted = false;
document.addEventListener('click', () => {
    if (!hasInteracted && !isPlaying) {
        hasInteracted = true;
        // Try to play music automatically after first interaction
        const playPromise = backgroundMusic.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                playIcon.style.display = 'none';
                pauseIcon.style.display = 'block';
                isPlaying = true;
            }).catch(() => {
                // User needs to click the music button
            });
        }
    }
}, { once: true });

// Update icon when music ends (shouldn't happen with loop, but just in case)
backgroundMusic.addEventListener('ended', () => {
    playIcon.style.display = 'block';
    pauseIcon.style.display = 'none';
    isPlaying = false;
});

// Handle music loading errors
backgroundMusic.addEventListener('error', () => {
    console.log('Music file could not be loaded. Please add your own music file.');
    musicControl.style.opacity = '0.5';
    musicControl.title = 'Music file not found. Add your music file to play.';
});
