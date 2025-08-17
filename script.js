/* ==============================================
   QUANTUM PORTFOLIO JAVASCRIPT - OUSSAMA ZERRAD
   COMPLETE VERSION - NO POPUP MESSAGES
   ============================================== */

// Quantum state variables
let quantumField = [];
let neuralConnections = [];
let aiConsciousnessLevel = 0;
let realityDistortion = 0;
let dimensionalShift = false;

/* ==============================================
   CORE INITIALIZATION
   ============================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Auto-update year
    document.getElementById("year").textContent = new Date().getFullYear();
    
    // Initialize core systems
    initRevealAnimations();
    initStarField();
    initAIConsciousness();
    initAdvancedCursor();
    initSmoothScrolling();
    initKonamiCode();
    initClickEffects();
    initEnhancedCardInteractions();
    initVoiceRecognition();
    initMobileOptimizations();
    initWindowFocusEffects();
    
    // Random effects
    setTimeout(() => {
        if (Math.random() > 0.8) {
            createDataWaves();
        }
    }, 5000);
    
    // Auto-demo after 10 seconds
    setTimeout(() => {
        if (aiConsciousnessLevel === 0) {
            setTimeout(() => {
                const aiButton = document.getElementById('aiConsciousness');
                if (aiButton) {
                    aiButton.click();
                }
            }, 1000);
        }
    }, 10000);
    
    // Initialize advanced features
    createSmartCursor();
    applyTimeBasedTheme();
    
    // Add welcome particle bursts
    setTimeout(() => {
        for(let i = 0; i < 10; i++) {
            setTimeout(() => {
                const welcomeParticle = document.createElement('div');
                welcomeParticle.style.cssText = `
                    position: fixed;
                    width: 4px;
                    height: 4px;
                    background: radial-gradient(circle, #fbbf24, #f59e0b);
                    border-radius: 50%;
                    left: ${Math.random() * window.innerWidth}px;
                    top: ${Math.random() * window.innerHeight}px;
                    pointer-events: none;
                    z-index: 9999;
                    animation: welcomeBurst 2s ease-out forwards;
                `;
                
                document.body.appendChild(welcomeParticle);
                
                setTimeout(() => {
                    if (welcomeParticle.parentNode) welcomeParticle.remove();
                }, 2000);
            }, i * 100);
        }
    }, 1000);
});

/* ==============================================
   REVEAL ANIMATIONS
   ============================================== */

function initRevealAnimations() {
    const io = new IntersectionObserver((entries) => {
        entries.forEach((e, index) => { 
            if(e.isIntersecting) { 
                setTimeout(() => {
                    e.target.classList.add("in"); 
                    io.unobserve(e.target);
                }, index * 100);
            } 
        });
    }, { threshold: .15 });
    
    document.querySelectorAll(".reveal").forEach(el => io.observe(el));
}

/* ==============================================
   OPTIMIZED STARFIELD BACKGROUND
   ============================================== */

function initStarField() {
    const c = document.getElementById("bg");
    if (!c) return;
    
    const ctx = c.getContext("2d");
    
    const layers = [
        { count: 80, speed: .12, size: [0.5, 1], color: "rgba(255,255,255,.6)" },
        { count: 50, speed: .22, size: [0.8, 1.6], color: "rgba(96,165,250,.8)" },
        { count: 30, speed: .35, size: [1.2, 2], color: "rgba(251,191,36,.9)" }
    ];
    
    let stars = [];
    
    function rand(a, b) { 
        return a + Math.random() * (b - a); 
    }
    
    function initStars() {
        stars = [];
        layers.forEach((L, li) => {
            for(let i = 0; i < L.count; i++) {
                stars.push({
                    z: li, 
                    x: Math.random() * c.width, 
                    y: Math.random() * c.height,
                    r: rand(L.size[0], L.size[1]),
                    pulse: Math.random() * Math.PI * 2,
                    pulseSpeed: 0.002 + Math.random() * 0.003
                });
            }
        });
    }
    
    function resizeCanvas() { 
        c.width = window.innerWidth; 
        c.height = window.innerHeight; 
        initStars(); 
    }
    
    window.addEventListener("resize", resizeCanvas, { passive: true }); 
    resizeCanvas();
    
    let tPrev = performance.now();
    
    function tick(tNow) {
        const dt = Math.min(32, tNow - tPrev); 
        tPrev = tNow;
        ctx.clearRect(0, 0, c.width, c.height);
        
        // Simple vignette
        const g = ctx.createRadialGradient(c.width/2, c.height/2, 0, c.width/2, c.height/2, Math.max(c.width, c.height)/0.9);
        g.addColorStop(0, "rgba(255,255,255,0)");
        g.addColorStop(0.7, "rgba(0,0,0,.15)");
        g.addColorStop(1, "rgba(0,0,0,.4)");
        
        // Draw stars
        for(const s of stars) {
            const L = layers[s.z];
            s.x -= L.speed * dt * .06;
            s.pulse += s.pulseSpeed * dt;
            
            if(s.x < -10) {
                s.x = c.width + 10;
                s.y = Math.random() * c.height;
            }
            
            const pulseIntensity = 0.8 + 0.2 * Math.sin(s.pulse);
            
            ctx.beginPath();
            ctx.fillStyle = L.color;
            ctx.globalAlpha = pulseIntensity;
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fill();
            
            // Add glow for larger stars
            if(s.r > 1.5) {
                ctx.beginPath();
                ctx.globalAlpha = pulseIntensity * 0.3;
                ctx.arc(s.x, s.y, s.r * 2.5, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        ctx.globalAlpha = 1;
        
        // Apply vignette
        ctx.fillStyle = g; 
        ctx.fillRect(0, 0, c.width, c.height);
        
        requestAnimationFrame(tick);
    }
    
    requestAnimationFrame(tick);
}

/* ==============================================
   AI CONSCIOUSNESS SYSTEM
   ============================================== */

function initAIConsciousness() {
    const aiIndicator = document.getElementById('aiConsciousness');
    if (!aiIndicator) return;
    
    aiIndicator.addEventListener('click', () => {
        aiConsciousnessLevel = (aiConsciousnessLevel + 1) % 4;
        
        switch(aiConsciousnessLevel) {
            case 1: // Awakening
                activateQuantumField();
                break;
            case 2: // Neural Network
                activateNeuralNetwork();
                break;
            case 3: // Reality Distortion
                activateRealityDistortion();
                break;
            case 0: // Reset
                resetAllSystems();
                break;
        }
    });
}

/* ==============================================
   ENHANCED QUANTUM PARTICLE FIELD
   ============================================== */

function activateQuantumField() {
    const container = document.body;
    
    for(let i = 0; i < 75; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'quantum-particle';
            particle.style.cssText = `
                position: fixed;
                width: ${3 + Math.random() * 4}px;
                height: ${3 + Math.random() * 4}px;
                background: hsl(${200 + Math.random() * 60}, 70%, 60%);
                border-radius: 50%;
                left: ${Math.random() * window.innerWidth}px;
                top: ${Math.random() * window.innerHeight}px;
                pointer-events: none;
                z-index: 1000;
                animation: enhancedQuantumFloat ${6 + Math.random() * 4}s infinite ease-in-out;
                animation-delay: ${Math.random() * 2}s;
                box-shadow: 0 0 10px currentColor, 0 0 20px currentColor;
            `;
            container.appendChild(particle);
            
            quantumField.push(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.remove();
                }
                quantumField = quantumField.filter(p => p !== particle);
            }, 10000);
        }, i * 80);
    }
    
    // Add enhanced quantum CSS
    const quantumCSS = `
        @keyframes enhancedQuantumFloat {
            0%, 100% { 
                transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
                opacity: 0.4;
                filter: hue-rotate(0deg);
            }
            25% { 
                transform: translate3d(120px, -60px, 20px) scale(1.8) rotate(90deg);
                opacity: 0.9;
                filter: hue-rotate(90deg);
            }
            50% { 
                transform: translate3d(-60px, -120px, -10px) scale(1.2) rotate(180deg);
                opacity: 0.7;
                filter: hue-rotate(180deg);
            }
            75% { 
                transform: translate3d(-120px, 60px, 15px) scale(1.5) rotate(270deg);
                opacity: 1;
                filter: hue-rotate(270deg);
            }
        }
    `;
    const quantumStyle = document.createElement('style');
    quantumStyle.textContent = quantumCSS;
    document.head.appendChild(quantumStyle);
}

/* ==============================================
   ENHANCED NEURAL NETWORK VISUALIZATION
   ============================================== */

function activateNeuralNetwork() {
    const container = document.getElementById('neuralNetwork');
    const cards = document.querySelectorAll('.project-card');
    if (!container) return;
    
    // Clear existing connections
    neuralConnections.forEach(c => {
        if (c.parentNode) c.remove();
    });
    neuralConnections = [];
    
    // Create enhanced connections between cards
    cards.forEach((card1, i) => {
        cards.forEach((card2, j) => {
            if(i < j && Math.random() > 0.5) {
                const connection = document.createElement('div');
                
                const rect1 = card1.getBoundingClientRect();
                const rect2 = card2.getBoundingClientRect();
                
                const x1 = rect1.left + rect1.width / 2;
                const y1 = rect1.top + rect1.height / 2 + window.scrollY;
                const x2 = rect2.left + rect2.width / 2;
                const y2 = rect2.top + rect2.height / 2 + window.scrollY;
                
                const length = Math.sqrt((x2-x1)*(x2-x1) + (y2-y1)*(y2-y1));
                const angle = Math.atan2(y2-y1, x2-x1) * 180 / Math.PI;
                
                connection.style.cssText = `
                    position: absolute;
                    left: ${x1}px;
                    top: ${y1}px;
                    width: ${length}px;
                    height: 2px;
                    background: linear-gradient(90deg, 
                        transparent, 
                        #fbbf24 20%, 
                        #60a5fa 50%, 
                        #10b981 80%, 
                        transparent);
                    transform: rotate(${angle}deg);
                    transform-origin: 0 0;
                    animation: enhancedNeuralPulse ${2 + Math.random() * 2}s infinite ease-in-out;
                    animation-delay: ${Math.random() * 2}s;
                    opacity: 0;
                    z-index: 10;
                    pointer-events: none;
                    box-shadow: 0 0 5px #fbbf24;
                `;
                
                container.appendChild(connection);
                neuralConnections.push(connection);
                
                // Animate connection appearance
                setTimeout(() => {
                    connection.style.opacity = '0.6';
                }, Math.random() * 1000);
            }
        });
    });
    
    // Add data pulse nodes
    setTimeout(() => {
        cards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            const node = document.createElement('div');
            node.style.cssText = `
                position: absolute;
                left: ${rect.left + rect.width / 2 - 8}px;
                top: ${rect.top + rect.height / 2 - 8 + window.scrollY}px;
                width: 16px;
                height: 16px;
                background: radial-gradient(circle, #fbbf24, #f59e0b);
                border-radius: 50%;
                animation: nodeDataPulse 2s infinite ease-in-out;
                animation-delay: ${index * 0.2}s;
                z-index: 11;
                pointer-events: none;
                box-shadow: 0 0 15px #fbbf24, 0 0 30px #f59e0b;
            `;
            
            container.appendChild(node);
            neuralConnections.push(node);
        });
    }, 1000);
    
    // Enhanced neural CSS
    const neuralCSS = `
        @keyframes enhancedNeuralPulse {
            0%, 100% { 
                opacity: 0.2;
                transform: scaleX(0.5) scaleY(1);
                filter: hue-rotate(0deg);
            }
            50% { 
                opacity: 0.9;
                transform: scaleX(1.5) scaleY(2);
                filter: hue-rotate(120deg);
            }
        }
        @keyframes nodeDataPulse {
            0%, 100% { 
                transform: scale(1);
                opacity: 0.8;
                box-shadow: 0 0 15px #fbbf24, 0 0 30px #f59e0b;
            }
            50% { 
                transform: scale(1.8);
                opacity: 1;
                box-shadow: 0 0 25px #fbbf24, 0 0 50px #f59e0b;
            }
        }
    `;
    const neuralStyle = document.createElement('style');
    neuralStyle.textContent = neuralCSS;
    document.head.appendChild(neuralStyle);
}

/* ==============================================
   ENHANCED REALITY DISTORTION ENGINE
   ============================================== */

function activateRealityDistortion() {
    dimensionalShift = true;
    
    const portal = document.getElementById('portal');
    const scanlines = document.getElementById('scanlines');
    
    // Activate enhanced portal
    if (portal) {
        portal.style.opacity = '0.9';
        portal.style.left = (window.innerWidth / 2 - 100) + 'px';
        portal.style.top = (window.innerHeight / 2 - 100) + 'px';
        portal.style.animation = 'enhancedPortalSpin 1.5s linear infinite, portalPulse 3s ease-in-out infinite';
    }
    
    // Activate cyberpunk scanlines
    if (scanlines) {
        scanlines.style.opacity = '0.3';
    }
    
    // Apply enhanced glitch effect to name
    const name = document.querySelector('h1');
    if (name) {
        name.classList.add('glitch');
        name.setAttribute('data-text', name.textContent);
        name.style.animation = 'glitch 0.3s infinite, colorShift 2s infinite';
    }
    
    // Enhanced time dilation effect on all cards
    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.classList.add('time-dilation', 'active');
        card.style.animationDelay = index * 0.1 + 's';
    });
    
    // Create multiple reality tears
    createRealityTears();
    
    // Add screen shake effect
    document.body.style.animation = 'screenShake 0.1s infinite';
    
    // Create energy waves
    createEnergyWaves();
    
    setTimeout(() => {
        document.body.style.animation = '';
    }, 2000);
}

/* ==============================================
   ENERGY WAVES & PORTAL EFFECTS
   ============================================== */

function createEnergyWaves() {
    for(let i = 0; i < 3; i++) {
        setTimeout(() => {
            const wave = document.createElement('div');
            wave.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                width: 10px;
                height: 10px;
                border: 2px solid #fbbf24;
                border-radius: 50%;
                transform: translate(-50%, -50%);
                animation: energyWaveExpand 2s ease-out forwards;
                z-index: 1001;
                pointer-events: none;
            `;
            
            document.body.appendChild(wave);
            
            setTimeout(() => {
                if (wave.parentNode) wave.remove();
            }, 2000);
        }, i * 500);
    }
    
    const waveCSS = `
        @keyframes energyWaveExpand {
            0% {
                width: 10px;
                height: 10px;
                opacity: 1;
                border-width: 3px;
            }
            100% {
                width: 600px;
                height: 600px;
                opacity: 0;
                border-width: 1px;
            }
        }
        @keyframes enhancedPortalSpin {
            0% { transform: rotate(0deg) scale(0.5); }
            100% { transform: rotate(360deg) scale(0.5); }
        }
        @keyframes portalPulse {
            0%, 100% { filter: brightness(1) saturate(1); }
            50% { filter: brightness(1.5) saturate(1.5); }
        }
        @keyframes screenShake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-2px); }
            75% { transform: translateX(2px); }
        }
        @keyframes colorShift {
            0%, 100% { filter: hue-rotate(0deg); }
            33% { filter: hue-rotate(120deg); }
            66% { filter: hue-rotate(240deg); }
        }
    `;
    const waveStyle = document.createElement('style');
    waveStyle.textContent = waveCSS;
    document.head.appendChild(waveStyle);
}

/* ==============================================
   ENHANCED REALITY TEARS & DIMENSIONAL RIFTS
   ============================================== */

function createRealityTears() {
    for(let i = 0; i < 8; i++) {
        setTimeout(() => {
            const tear = document.createElement('div');
            tear.style.cssText = `
                position: fixed;
                width: ${2 + Math.random() * 3}px;
                height: ${150 + Math.random() * 300}px;
                background: linear-gradient(0deg, 
                    transparent,
                    rgba(255,0,255,0.9),
                    rgba(0,255,255,0.9),
                    rgba(255,255,0,0.8),
                    transparent);
                left: ${Math.random() * window.innerWidth}px;
                top: ${Math.random() * window.innerHeight}px;
                z-index: 1002;
                animation: enhancedTearFlicker 0.05s infinite, tearFloat 4s ease-in-out infinite;
                pointer-events: none;
                box-shadow: 0 0 10px rgba(255,0,255,0.5), 0 0 20px rgba(0,255,255,0.3);
                transform-origin: center;
            `;
            
            document.body.appendChild(tear);
            
            setTimeout(() => {
                if (tear.parentNode) tear.remove();
            }, 4000);
        }, i * 200);
    }
    
    // Create dimensional portals
    for(let i = 0; i < 3; i++) {
        setTimeout(() => {
            const portal = document.createElement('div');
            portal.style.cssText = `
                position: fixed;
                width: ${50 + Math.random() * 100}px;
                height: ${50 + Math.random() * 100}px;
                background: conic-gradient(from 0deg, 
                    #ff0080, #0080ff, #80ff00, #ff8000, #ff0080);
                border-radius: 50%;
                left: ${Math.random() * window.innerWidth}px;
                top: ${Math.random() * window.innerHeight}px;
                z-index: 1001;
                animation: dimensionalPortal 3s linear infinite;
                pointer-events: none;
                opacity: 0.7;
                filter: blur(1px);
            `;
            
            document.body.appendChild(portal);
            
            setTimeout(() => {
                if (portal.parentNode) portal.remove();
            }, 3000);
        }, i * 800);
    }
    
    const tearCSS = `
        @keyframes enhancedTearFlicker {
            0%, 100% { 
                opacity: 0.9; 
                transform: scaleX(1) skewX(0deg);
                filter: brightness(1);
            }
            25% { 
                opacity: 0.4; 
                transform: scaleX(0.8) skewX(2deg);
                filter: brightness(1.5);
            }
            50% { 
                opacity: 0.7; 
                transform: scaleX(1.2) skewX(-2deg);
                filter: brightness(0.8);
            }
            75% { 
                opacity: 0.3; 
                transform: scaleX(0.6) skewX(1deg);
                filter: brightness(1.2);
            }
        }
        @keyframes tearFloat {
            0%, 100% { 
                transform: translateX(0) rotate(0deg);
            }
            25% { 
                transform: translateX(10px) rotate(1deg);
            }
            50% { 
                transform: translateX(-5px) rotate(-1deg);
            }
            75% { 
                transform: translateX(5px) rotate(0.5deg);
            }
        }
        @keyframes dimensionalPortal {
            0% { 
                transform: rotate(0deg) scale(0.5);
                opacity: 0;
            }
            50% { 
                transform: rotate(180deg) scale(1.2);
                opacity: 0.8;
            }
            100% { 
                transform: rotate(360deg) scale(0.5);
                opacity: 0;
            }
        }
    `;
    const tearStyle = document.createElement('style');
    tearStyle.textContent = tearCSS;
    document.head.appendChild(tearStyle);
}

/* ==============================================
   DIGITAL OCEAN DATA WAVES
   ============================================== */

function createDataWaves() {
    const wave = document.createElement('div');
    wave.style.cssText = `
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100px;
        background: linear-gradient(0deg,
            rgba(96,165,250,0.1),
            rgba(96,165,250,0.3),
            transparent);
        animation: dataWave 4s ease-in-out infinite;
        z-index: -1;
        pointer-events: none;
    `;
    
    const waveCSS = `
        @keyframes dataWave {
            0%, 100% { 
                transform: translateY(50px) scaleY(0.5);
                opacity: 0.3;
            }
            50% { 
                transform: translateY(0) scaleY(1);
                opacity: 0.7;
            }
        }
    `;
    const waveStyle = document.createElement('style');
    waveStyle.textContent = waveCSS;
    document.head.appendChild(waveStyle);
    
    document.body.appendChild(wave);
    
    setTimeout(() => {
        if (wave.parentNode) wave.remove();
        if (waveStyle.parentNode) waveStyle.remove();
    }, 8000);
}

/* ==============================================
   ENHANCED CURSOR EFFECTS & PARTICLE SYSTEM
   ============================================== */

function initAdvancedCursor() {
    let mouseTrail = [];
    let particleTimer = 0;
    
    document.addEventListener('mousemove', (e) => {
        // Create enhanced laser trail
        if (Date.now() - particleTimer > 50) {
            const laser = document.createElement('div');
            laser.style.cssText = `
                position: fixed;
                width: 6px;
                height: 6px;
                background: radial-gradient(circle, #fbbf24, #f59e0b, transparent);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                left: ${e.clientX - 3}px;
                top: ${e.clientY - 3}px;
                animation: enhancedLaserFade 1.2s ease-out forwards;
                box-shadow: 0 0 15px #fbbf24, 0 0 30px #f59e0b;
            `;
            
            document.body.appendChild(laser);
            mouseTrail.push(laser);
            particleTimer = Date.now();
            
            // Add sparkle effect
            if (Math.random() > 0.7) {
                createSparkle(e.clientX, e.clientY);
            }
            
            // Limit trail length for performance
            if (mouseTrail.length > 15) {
                const oldLaser = mouseTrail.shift();
                if (oldLaser && oldLaser.parentNode) {
                    oldLaser.remove();
                }
            }
            
            setTimeout(() => {
                if (laser && laser.parentNode) {
                    laser.remove();
                }
            }, 1200);
        }
    });
    
    function createSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: #60a5fa;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            left: ${x + (Math.random() - 0.5) * 20}px;
            top: ${y + (Math.random() - 0.5) * 20}px;
            animation: sparkleAnimation 0.8s ease-out forwards;
            box-shadow: 0 0 10px #60a5fa;
        `;
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            if (sparkle && sparkle.parentNode) {
                sparkle.remove();
            }
        }, 800);
    }
    
    const enhancedCSS = `
        @keyframes enhancedLaserFade {
            0% { 
                opacity: 1;
                transform: scale(1);
                box-shadow: 0 0 15px #fbbf24, 0 0 30px #f59e0b;
            }
            50% {
                opacity: 0.8;
                transform: scale(1.2);
                box-shadow: 0 0 20px #fbbf24, 0 0 40px #f59e0b;
            }
            100% { 
                opacity: 0;
                transform: scale(0.1);
                box-shadow: 0 0 5px #fbbf24;
            }
        }
        @keyframes sparkleAnimation {
            0% { 
                opacity: 1;
                transform: scale(0) rotate(0deg);
            }
            50% {
                opacity: 1;
                transform: scale(1.5) rotate(180deg);
            }
            100% { 
                opacity: 0;
                transform: scale(0) rotate(360deg);
            }
        }
    `;
    const enhancedStyle = document.createElement('style');
    enhancedStyle.textContent = enhancedCSS;
    document.head.appendChild(enhancedStyle);
}

/* ==============================================
   CLICK EFFECTS & VISUAL FEEDBACK
   ============================================== */

function initClickEffects() {
    document.addEventListener('click', (e) => {
        // Create click explosion effect
        for(let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            const angle = (i / 8) * Math.PI * 2;
            const velocity = 50 + Math.random() * 50;
            const size = 4 + Math.random() * 6;
            
            particle.style.cssText = `
                position: fixed;
                width: ${size}px;
                height: ${size}px;
                background: radial-gradient(circle, #fbbf24, #f59e0b);
                border-radius: 50%;
                left: ${e.clientX - size/2}px;
                top: ${e.clientY - size/2}px;
                pointer-events: none;
                z-index: 9999;
                animation: clickExplosion 0.8s ease-out forwards;
            `;
            
            // Calculate final position
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;
            
            // Apply transform immediately for explosion effect
            setTimeout(() => {
                particle.style.transform = `translate(${tx}px, ${ty}px) scale(0.3)`;
                particle.style.opacity = '0';
            }, 0);
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) particle.remove();
            }, 800);
        }
    });
    
    const clickCSS = `
        @keyframes clickExplosion {
            0% {
                opacity: 1;
                transform: scale(1) translate(0, 0);
            }
            100% {
                opacity: 0;
                transform: scale(0.3) translate(var(--tx, 0), var(--ty, 0));
            }
        }
    `;
    const clickStyle = document.createElement('style');
    clickStyle.textContent = clickCSS;
    document.head.appendChild(clickStyle);
}

/* ==============================================
   RESET ALL SYSTEMS
   ============================================== */

function resetAllSystems() {
    // Clear quantum field
    quantumField.forEach(p => {
        if (p.parentNode) p.remove();
    });
    quantumField = [];
    
    // Clear neural connections
    neuralConnections.forEach(c => {
        if (c.parentNode) c.remove();
    });
    neuralConnections = [];
    
    // Reset visual effects
    const portal = document.getElementById('portal');
    const scanlines = document.getElementById('scanlines');
    if (portal) portal.style.opacity = '0';
    if (scanlines) scanlines.style.opacity = '0';
    
    // Remove glitch effects
    const nameEl = document.querySelector('h1');
    if (nameEl) {
        nameEl.classList.remove('glitch');
        nameEl.style.animation = '';
    }
    document.querySelectorAll('.project-card').forEach(card => {
        card.classList.remove('time-dilation', 'active');
    });
    
    dimensionalShift = false;
    realityDistortion = 0;
}

/* ==============================================
   MATRIX DIGITAL RAIN
   ============================================== */

function startMatrixRain() {
    const matrixChars = '01アカサタナハマヤラワガザダバパイキシチニヒミリギジヂビピウクスツヌフムユルグズヅブプエケセテネヘメレゲゼデベペオコソトノホモヨロゴゾドボポ';
    
    function createMatrixChar() {
        const char = document.createElement('div');
        char.className = 'matrix-char';
        char.textContent = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        char.style.cssText = `
            position: absolute;
            color: var(--good);
            font-family: 'Press Start 2P', monospace;
            font-size: ${8 + Math.random() * 8}px;
            left: ${Math.random() * window.innerWidth}px;
            top: -20px;
            opacity: 0;
            pointer-events: none;
            animation: matrixFall 3s linear forwards;
            z-index: 999;
        `;
        
        document.body.appendChild(char);
        
        setTimeout(() => {
            if (char.parentNode) char.remove();
        }, 3000);
    }
    
    // Add CSS for matrix fall animation
    const matrixCSS = `
        @keyframes matrixFall {
            0% { opacity: 1; transform: translateY(-20px); }
            50% { opacity: 0.7; }
            100% { opacity: 0; transform: translateY(100vh); }
        }
    `;
    const matrixStyle = document.createElement('style');
    matrixStyle.textContent = matrixCSS;
    document.head.appendChild(matrixStyle);
    
    // Create matrix rain
    const matrixInterval = setInterval(createMatrixChar, 100);
    
    setTimeout(() => {
        clearInterval(matrixInterval);
        if (matrixStyle.parentNode) matrixStyle.remove();
    }, 5000);
}

/* ==============================================
   SMOOTH SCROLLING
   ============================================== */

function initSmoothScrolling() {
    const projectsBtn = document.querySelector('a[href="#projects"]');
    if (projectsBtn) {
        projectsBtn.addEventListener('click', (e) => {
            const projectsSection = document.getElementById('projects');
            if (projectsSection) {
                e.preventDefault();
                projectsSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
}

/* ==============================================
   ENHANCED CARD INTERACTIONS
   ============================================== */

function initEnhancedCardInteractions() {
    // Enhanced card interactions with micro-animations
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Staggered animation for tech stack
            const techElements = card.querySelectorAll('.tech');
            techElements.forEach((tech, index) => {
                setTimeout(() => {
                    tech.style.transform = 'translateY(-2px) scale(1.05)';
                    tech.style.transition = 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)';
                }, index * 30);
            });
            
            // Animate project icon
            const icon = card.querySelector('h3 i');
            if(icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const techElements = card.querySelectorAll('.tech');
            techElements.forEach(tech => {
                tech.style.transform = 'translateY(0) scale(1)';
            });
            
            const icon = card.querySelector('h3 i');
            if(icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    // Chip hover effects
    document.querySelectorAll('.chip').forEach(chip => {
        chip.addEventListener('mouseenter', () => {
            const icon = chip.querySelector('i');
            if(icon) {
                icon.style.transform = 'scale(1.2)';
                icon.style.transition = 'transform 0.2s ease';
            }
        });
        
        chip.addEventListener('mouseleave', () => {
            const icon = chip.querySelector('i');
            if(icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });
}

/* ==============================================
   KONAMI CODE EASTER EGG
   ============================================== */

function initKonamiCode() {
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if(e.keyCode === konamiCode[konamiIndex]) {
            konamiIndex++;
            if(konamiIndex === konamiCode.length) {
                const konamiMsg = document.getElementById('konami-message');
                if (konamiMsg) {
                    konamiMsg.style.display = 'block';
                }
                startMatrixRain();
                activateTimeTravel();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
}

function closeKonami() {
    const konamiMsg = document.getElementById('konami-message');
    if (konamiMsg) {
        konamiMsg.style.display = 'none';
    }
}

/* ==============================================
   TIME TRAVEL MECHANICS
   ============================================== */

function activateTimeTravel() {
    const timeRift = document.createElement('div');
    timeRift.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        width: 300px;
        height: 300px;
        transform: translate(-50%, -50%);
        background: conic-gradient(from 0deg,
            #ff0000, #ff8800, #ffff00, #88ff00,
            #00ff00, #00ff88, #00ffff, #0088ff,
            #0000ff, #8800ff, #ff00ff, #ff0088, #ff0000);
        border-radius: 50%;
        animation: timeWarp 2s ease-in-out;
        z-index: 9999;
        pointer-events: none;
    `;
    
    document.body.appendChild(timeRift);
    
    // Time warp effect on entire page
    document.body.style.animation = 'timeDistortion 3s ease-in-out';
    
    // Add time warp CSS
    const timeCSS = `
        @keyframes timeWarp {
            0% { 
                transform: translate(-50%, -50%) scale(0) rotate(0deg);
                opacity: 0;
            }
            50% { 
                transform: translate(-50%, -50%) scale(1.5) rotate(180deg);
                opacity: 1;
            }
            100% { 
                transform: translate(-50%, -50%) scale(0) rotate(360deg);
                opacity: 0;
            }
        }
        @keyframes timeDistortion {
            0%, 100% { 
                filter: hue-rotate(0deg) blur(0px);
                transform: scale(1);
            }
            50% { 
                filter: hue-rotate(180deg) blur(2px);
                transform: scale(1.02);
            }
        }
    `;
    const timeStyle = document.createElement('style');
    timeStyle.textContent = timeCSS;
    document.head.appendChild(timeStyle);
    
    setTimeout(() => {
        if (timeRift.parentNode) timeRift.remove();
        document.body.style.animation = '';
        if (timeStyle.parentNode) timeStyle.remove();
    }, 3000);
}

/* ==============================================
   VOICE COMMAND SYSTEM
   ============================================== */

function initVoiceRecognition() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';
        
        recognition.onresult = (event) => {
            const command = event.results[0][0].transcript.toLowerCase().trim();
            processVoiceCommand(command);
        };
        
        recognition.onerror = (event) => {
            console.log('Voice recognition error:', event.error);
        };
        
        // Activate voice recognition with spacebar
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && e.ctrlKey) {
                e.preventDefault();
                try {
                    recognition.start();
                } catch(e) {
                    console.log('Voice recognition not available');
                }
            }
        });
    }
}

function processVoiceCommand(command) {
    if (command.includes('activate') || command.includes('wake up')) {
        document.getElementById('aiConsciousness').click();
        speakResponse("AI consciousness activated");
    } else if (command.includes('quantum')) {
        activateQuantumField();
        speakResponse("Quantum field deployed");
    } else if (command.includes('neural') || command.includes('network')) {
        activateNeuralNetwork();
        speakResponse("Neural network online");
    } else if (command.includes('reality') || command.includes('distortion')) {
        activateRealityDistortion();
        speakResponse("Reality matrix recalibrating");
    } else if (command.includes('reset') || command.includes('stop')) {
        resetAllSystems();
        speakResponse("All systems hibernating");
    } else if (command.includes('matrix')) {
        startMatrixRain();
        speakResponse("Entering the matrix");
    } else if (command.includes('time travel')) {
        activateTimeTravel();
        speakResponse("Temporal displacement initiated");
    } else {
        speakResponse("Command not recognized");
    }
}

function speakResponse(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.8;
        utterance.pitch = 0.8;
        utterance.volume = 0.5;
        speechSynthesis.speak(utterance);
    }
}

/* ==============================================
   MOBILE TOUCH OPTIMIZATIONS
   ============================================== */

function initMobileOptimizations() {
    // Touch effects for mobile
    document.addEventListener('touchstart', (e) => {
        for (let i = 0; i < e.touches.length; i++) {
            const touch = e.touches[i];
            
            // Create touch particle
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 8px;
                height: 8px;
                background: radial-gradient(circle, #fbbf24, #f59e0b);
                border-radius: 50%;
                left: ${touch.clientX - 4}px;
                top: ${touch.clientY - 4}px;
                pointer-events: none;
                z-index: 9999;
                animation: touchEffect 0.6s ease-out forwards;
            `;
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) particle.remove();
            }, 600);
        }
    }, { passive: true });
    
    // Add touch effect CSS
    const touchCSS = `
        @keyframes touchEffect {
            0% { 
                opacity: 1;
                transform: scale(1);
            }
            100% { 
                opacity: 0;
                transform: scale(3);
            }
        }
    `;
    const touchStyle = document.createElement('style');
    touchStyle.textContent = touchCSS;
    document.head.appendChild(touchStyle);
}

/* ==============================================
   WINDOW FOCUS EFFECTS
   ============================================== */

function initWindowFocusEffects() {
    let isVisible = true;
    
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            isVisible = false;
            document.title = '💤 Portfolio Sleeping...';
        } else {
            isVisible = true;
            document.title = 'Oussama Zerrad — Portfolio';
            
            // Small particle burst
            for(let i = 0; i < 8; i++) {
                setTimeout(() => {
                    const welcome = document.createElement('div');
                    welcome.style.cssText = `
                        position: fixed;
                        width: 5px;
                        height: 5px;
                        background: hsl(${Math.random() * 360}, 70%, 60%);
                        border-radius: 50%;
                        left: ${Math.random() * window.innerWidth}px;
                        top: ${Math.random() * window.innerHeight}px;
                        pointer-events: none;
                        z-index: 9999;
                        animation: welcomeBack 1.5s ease-out forwards;
                    `;
                    
                    document.body.appendChild(welcome);
                    
                    setTimeout(() => {
                        if (welcome.parentNode) welcome.remove();
                    }, 1500);
                }, i * 100);
            }
        }
    });
    
    const welcomeBackCSS = `
        @keyframes welcomeBack {
            0% { 
                opacity: 1;
                transform: scale(0) rotate(0deg);
            }
            50% {
                opacity: 1;
                transform: scale(1.5) rotate(180deg);
            }
            100% { 
                opacity: 0;
                transform: scale(0.5) rotate(360deg);
            }
        }
    `;
    const welcomeBackStyle = document.createElement('style');
    welcomeBackStyle.textContent = welcomeBackCSS;
    document.head.appendChild(welcomeBackStyle);
}

/* ==============================================
   PARALLAX SCROLL EFFECT
   ============================================== */

let ticking = false;
function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('header');
    const speed = Math.min(scrolled * 0.3, 100);
    
    if(parallax) {
        parallax.style.transform = `translateY(${speed}px)`;
    }
    ticking = false;
}

function requestTick() {
    if(!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
}

window.addEventListener('scroll', requestTick, { passive: true });

/* ==============================================
   ADVANCED SCROLL EFFECTS
   ============================================== */

let scrollVelocity = 0;
let lastScrollY = 0;

function updateScrollEffects() {
    const currentScrollY = window.pageYOffset;
    scrollVelocity = Math.abs(currentScrollY - lastScrollY);
    lastScrollY = currentScrollY;
    
    // Dynamic header effects based on scroll speed
    const header = document.querySelector('header');
    if(scrollVelocity > 10) {
        header.style.filter = `blur(${Math.min(scrollVelocity * 0.1, 3)}px)`;
    } else {
        header.style.filter = 'blur(0px)';
    }
}

window.addEventListener('scroll', updateScrollEffects, { passive: true });

/* ==============================================
   INTELLIGENT CURSOR EFFECTS
   ============================================== */

function createSmartCursor() {
    const cursor = document.createElement('div');
    cursor.style.cssText = `
        position: fixed; 
        width: 20px; 
        height: 20px; 
        border: 2px solid var(--brand);
        border-radius: 50%; 
        pointer-events: none; 
        z-index: 9999;
        transition: all 0.1s ease; 
        mix-blend-mode: difference;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = (e.clientX - 10) + 'px';
        cursor.style.top = (e.clientY - 10) + 'px';
    });
    
    // Change cursor on interactive elements
    document.addEventListener('mouseover', (e) => {
        if(e.target.matches('a, button, .project-card, .chip, .ai-consciousness')) {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.background = 'var(--brand)';
        } else {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'transparent';
        }
    });
}

/* ==============================================
   AUTO-THEME BASED ON TIME
   ============================================== */

function applyTimeBasedTheme() {
    const hour = new Date().getHours();
    const root = document.documentElement;
    
    if(hour >= 6 && hour < 12) {
        // Morning theme - warmer colors
        root.style.setProperty('--accent', '#f59e0b');
        root.style.setProperty('--brand', '#f97316');
    } else if(hour >= 18 || hour < 6) {
        // Night theme - cooler colors
        root.style.setProperty('--accent', '#8b5cf6');
        root.style.setProperty('--brand', '#06b6d4');
    }
    // Default theme for afternoon (12-18)
}

/* ==============================================
   PERFORMANCE MONITORING
   ============================================== */

let performanceMode = 'high';

function checkPerformance() {
    const startTime = performance.now();
    requestAnimationFrame(() => {
        const frameTime = performance.now() - startTime;
        if (frameTime > 16.67) {
            performanceMode = 'low';
            document.querySelectorAll('.quantum-particle').forEach(p => {
                if (p.parentNode) p.remove();
            });
        }
    });
}

setInterval(checkPerformance, 5000);

/* ==============================================
   RANDOM QUANTUM EVENTS
   ============================================== */

setInterval(() => {
    if (aiConsciousnessLevel > 0 && Math.random() > 0.85) {
        const effects = [createDataWaves, () => {
            for(let i = 0; i < 5; i++) {
                setTimeout(() => {
                    const burst = document.createElement('div');
                    burst.style.cssText = `
                        position: fixed;
                        width: 3px;
                        height: 3px;
                        background: hsl(${Math.random() * 360}, 70%, 60%);
                        border-radius: 50%;
                        left: ${Math.random() * window.innerWidth}px;
                        top: ${Math.random() * window.innerHeight}px;
                        pointer-events: none;
                        z-index: 1000;
                        animation: quickBurst 1s ease-out forwards;
                    `;
                    
                    document.body.appendChild(burst);
                    
                    setTimeout(() => {
                        if (burst.parentNode) burst.remove();
                    }, 1000);
                }, i * 50);
            }
        }];
        
        const randomEffect = effects[Math.floor(Math.random() * effects.length)];
        randomEffect();
    }
}, 15000);

/* ==============================================
   ADDITIONAL CSS ANIMATIONS
   ============================================== */

const additionalCSS = `
    @keyframes welcomeBurst {
        0% { 
            opacity: 1;
            transform: scale(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: scale(2) rotate(180deg);
        }
        100% { 
            opacity: 0;
            transform: scale(0.5) rotate(360deg);
        }
    }
    
    @keyframes quickBurst {
        0% { 
            opacity: 1;
            transform: scale(0);
        }
        50% {
            opacity: 1;
            transform: scale(2);
        }
        100% { 
            opacity: 0;
            transform: scale(0.5);
        }
    }
`;

const additionalStyle = document.createElement('style');
additionalStyle.textContent = additionalCSS;
document.head.appendChild(additionalStyle);

/* ==============================================
   DEVELOPER CONSOLE MESSAGE
   ============================================== */

console.log(`
🌌 QUANTUM PORTFOLIO ACTIVATED 🌌

Built by: Oussama Zerrad
Features: AI Consciousness, Quantum Fields, Neural Networks, Reality Distortion
Commands: Click brain icon, try Konami code (↑↑↓↓←→←→BA)
Voice: Hold Ctrl+Space to use voice commands
Performance: Automatically optimized for your device

🎮 Try these commands:
- Click the brain icon (top right) for AI modes
- Move mouse for particle trails
- Click anywhere for explosions
- Hold Ctrl+Space for voice commands
- Try the Konami code!

💫 Welcome to the quantum realm!
`);

/* ==============================================
   END OF QUANTUM PORTFOLIO SCRIPT
   TOTAL LINES: 1,300+
   ALL FEATURES COMPLETE - NO POPUP MESSAGES
   ============================================== */