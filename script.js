// ==================== HERO CAROUSEL ====================
const wrapper = document.getElementById('carouselWrapper');
const slides = document.querySelectorAll('.carousel-slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('carouselDots');

let currentIndex = 0;
const totalSlides = slides.length;
let autoInterval;

function createDots() {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === currentIndex) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
}

function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, idx) => {
        if (idx === currentIndex) dot.classList.add('active');
        else dot.classList.remove('active');
    });
}

function goToSlide(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    currentIndex = index;
    wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateDots();
    resetAutoSlide();
}

function nextSlide() { goToSlide(currentIndex + 1); }
function prevSlide() { goToSlide(currentIndex - 1); }

function resetAutoSlide() {
    clearInterval(autoInterval);
    autoInterval = setInterval(() => nextSlide(), 5000);
}

prevBtn.addEventListener('click', () => { prevSlide(); resetAutoSlide(); });
nextBtn.addEventListener('click', () => { nextSlide(); resetAutoSlide(); });

createDots();
resetAutoSlide();

// ==================== GALERÍA INFINITA ====================
const galleryImages = [
    "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1758691462848-31a39258dbd8?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1538108149393-fbbd81895907?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1598257006458-087169a1f08d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1758691462858-f1286e5daf40?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
];

const galleryWrapper = document.getElementById('galleryCarouselWrapper');
let galleryCurrentIndex = 0;
let galleryInterval;

function buildInfiniteGallery() {
    galleryWrapper.innerHTML = '';
    const duplicated = [...galleryImages, ...galleryImages, ...galleryImages];
    duplicated.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = "Clínica médica";
        galleryWrapper.appendChild(img);
    });
    galleryCurrentIndex = galleryImages.length;
    galleryWrapper.style.transform = `translateX(-${galleryCurrentIndex * 100}%)`;
}
buildInfiniteGallery();

function updateGallery(animate = true) {
    if (animate) {
        galleryWrapper.style.transition = 'transform 0.5s ease-in-out';
    } else {
        galleryWrapper.style.transition = 'none';
    }
    galleryWrapper.style.transform = `translateX(-${galleryCurrentIndex * 100}%)`;
}

function nextGallery() {
    galleryCurrentIndex++;
    updateGallery(true);
    if (galleryCurrentIndex >= galleryImages.length * 2) {
        setTimeout(() => {
            galleryCurrentIndex = galleryImages.length;
            updateGallery(false);
        }, 500);
    }
    resetGalleryAuto();
}

function prevGallery() {
    galleryCurrentIndex--;
    updateGallery(true);
    if (galleryCurrentIndex < galleryImages.length) {
        setTimeout(() => {
            galleryCurrentIndex = galleryImages.length * 2 - 1;
            updateGallery(false);
        }, 500);
    }
    resetGalleryAuto();
}

function resetGalleryAuto() {
    clearInterval(galleryInterval);
    galleryInterval = setInterval(() => nextGallery(), 4000);
}

document.getElementById('galleryPrev').addEventListener('click', () => { prevGallery(); resetGalleryAuto(); });
document.getElementById('galleryNext').addEventListener('click', () => { nextGallery(); resetGalleryAuto(); });
resetGalleryAuto();

// ==================== FAQ ACCORDION ====================
document.querySelectorAll('.faq-item').forEach(item => {
    // Asegurar que todos comiencen cerrados
    item.classList.remove('faq-open');

    const question = item.querySelector('.faq-question');
    question.addEventListener('click', (e) => {
        e.preventDefault();
        // Alternar la clase faq-open (sin conflictos con scroll reveal)
        item.classList.toggle('faq-open');
    });
});
// ==================== SCROLL REVEAL ====================
const revealElements = document.querySelectorAll('.reveal');

function checkReveal() {
    const windowHeight = window.innerHeight;
    revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const revealPoint = 120;
        if (rect.top < windowHeight - revealPoint) {
            el.classList.add('active');
        }
    });
}

window.addEventListener('scroll', checkReveal);
window.addEventListener('load', checkReveal);

// ==================== BACK TO TOP BUTTON ====================
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        backToTopBtn.style.display = 'flex';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
// ==================== MOBILE MENU ====================
const toggleBtn = document.getElementById('mobile-toggle');
const navMenu = document.getElementById('nav-menu');

// Abrir/cerrar al hacer clic en el botón hamburguesa
toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Evita que este clic se propague al document y cierre el menú recién abierto
    navMenu.classList.toggle('active');
});

// Cerrar menú cuando se hace clic en cualquier enlace de navegación
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Cerrar menú si se hace clic fuera de él y fuera del botón
document.addEventListener('click', (event) => {
    // Si el menú está abierto y el clic no ocurrió dentro del menú ni en el botón
    if (navMenu.classList.contains('active') &&
        !navMenu.contains(event.target) &&
        !toggleBtn.contains(event.target)) {
        navMenu.classList.remove('active');
    }
});
// ==================== STICKY HEADER ====================
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.08)';
    } else {
        header.style.boxShadow = '0 2px 15px rgba(0,0,0,0.05)';
    }
});

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === "#" || targetId === "") return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            const offset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
    });
});

// ==================== FORMULARIO DE CONTACTO ====================
const form = document.getElementById('appointmentForm');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();

    if (!nombre || !email || !telefono) {
        alert('Por favor, completa los campos obligatorios (nombre, email, teléfono).');
        return;
    }

    // Construir el cuerpo del correo con formato atractivo
    const subject = `Solicitud de cita - ${nombre}`;
    const body = `
Hola Dr. Carlos Méndez,

Me pongo en contacto para solicitar una cita médica.

--- DATOS DEL PACIENTE ---
Nombre completo: ${nombre}
Correo electrónico: ${email}
Teléfono: ${telefono}
${mensaje ? `Mensaje adicional:\n${mensaje}` : ''}

Quedo atento a su confirmación.

Saludos cordiales.
    `;

    // Crear el enlace mailto
    const mailtoLink = `mailto:teeninformatics@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Abrir el cliente de correo predeterminado
    window.location.href = mailtoLink;

    // Opcional: mostrar un mensaje de éxito
    alert('Se abrirá tu cliente de correo para enviar la solicitud. Por favor, revisa y envía el mensaje.');
});