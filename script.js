// NAVEGACIÓN ENTRE SECCIONES (SPA)
function showSection(sectionId) {
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(sec => {
        sec.classList.remove('active-section');
        sec.classList.add('hidden-section');
    });

    const target = document.getElementById(sectionId);
    if (target) {
        target.classList.remove('hidden-section');
        target.classList.add('active-section');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// TEMPORIZADOR DE CONTRARRELOJ ACTIVO
let totalSeconds = 4 * 86400 + 12 * 3600 + 45 * 60 + 30; // 4 días, 12h, 45m, 30s

function updateCountdown() {
    if (totalSeconds <= 0) return;
    
    totalSeconds--;
    
    const d = Math.floor(totalSeconds / (3600 * 24));
    const h = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = Math.floor(totalSeconds % 60);
    
    document.getElementById('days').innerText = d < 10 ? '0' + d : d;
    document.getElementById('hours').innerText = h < 10 ? '0' + h : h;
    document.getElementById('minutes').innerText = m < 10 ? '0' + m : m;
    document.getElementById('seconds').innerText = s < 10 ? '0' + s : s;
}

setInterval(updateCountdown, 1000);

// FONDO ESPACIAL INTERACTIVO CON ESTRELLAS Y PARTICULAS
const canvas = document.getElementById('space-canvas');
const ctx = canvas.getContext('2d');

let stars = [];
const numStars = 180;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function initStars() {
    stars = [];
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5 + 0.2,
            alpha: Math.random() * 0.8 + 0.2,
            speed: Math.random() * 0.25 + 0.05,
            twinkleSpeed: (Math.random() - 0.5) * 0.015
        });
    }
}

function drawSpace() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < stars.length; i++) {
        let star = stars[i];
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();
        
        star.y -= star.speed;
        star.alpha += star.twinkleSpeed;
        
        if (star.alpha < 0.2 || star.alpha > 0.95) {
            star.twinkleSpeed = -star.twinkleSpeed;
        }

        if (star.y < 0) {
            star.y = canvas.height;
            star.x = Math.random() * canvas.width;
        }
    }
    
    requestAnimationFrame(drawSpace);
}

window.addEventListener('resize', () => {
    resizeCanvas();
    initStars();
});

// Inicialización
resizeCanvas();
initStars();
drawSpace();
