// ===================================
// Configuración de WhatsApp
// ===================================
const WHATSAPP_NUMBER = '3172121745'; // Reemplazar con el número real del spa (sin +, espacios ni guiones)

// ===================================
// Menú Hamburguesa
// ===================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle menú
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
});

// Cerrar menú al hacer click en un enlace
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Cerrar menú al hacer click fuera
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// ===================================
// Header Scroll Effect
// ===================================
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// ===================================
// Smooth Scroll
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Formulario de Reserva
// ===================================
const reservaForm = document.getElementById('reservaForm');

reservaForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Obtener valores del formulario
    const nombre = document.getElementById('nombre').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const servicio = document.getElementById('servicio').value;
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;
    const comentarios = document.getElementById('comentarios').value.trim();
    
    // Validación
    if (!nombre || !telefono || !servicio || !fecha || !hora) {
        mostrarAlerta('Por favor, completa todos los campos obligatorios.', 'error');
        return;
    }
    
    // Validar que la fecha no sea pasada
    const fechaSeleccionada = new Date(fecha);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    
    if (fechaSeleccionada < hoy) {
        mostrarAlerta('Por favor, selecciona una fecha válida.', 'error');
        return;
    }
    
    // Formatear fecha para mensaje
    const fechaFormateada = formatearFecha(fecha);
    const horaFormateada = formatearHora(hora);
    
    // Crear mensaje para WhatsApp
    const mensaje = `
🌸 *NUEVA RESERVA - Bella Nails Spa* 🌸

👤 *Nombre:* ${nombre}
📱 *Teléfono:* ${telefono}
💅 *Servicio:* ${servicio}
📅 *Fecha:* ${fechaFormateada}
⏰ *Hora:* ${horaFormateada}
${comentarios ? `\n💬 *Comentarios:* ${comentarios}` : ''}

_Esperamos confirmar tu cita pronto._
    `.trim();
    
    // Enviar a WhatsApp
    enviarWhatsApp(mensaje);
});

// ===================================
// Funciones de WhatsApp
// ===================================
function enviarWhatsApp(mensaje) {
    const mensajeCodificado = encodeURIComponent(mensaje);
    const url = `https://wa.me/${3172121745}?text=${mensajeCodificado}`;
    window.open(url, '_blank');
    
    // Limpiar formulario después de enviar
    setTimeout(() => {
        reservaForm.reset();
        mostrarAlerta('¡Redirigiendo a WhatsApp! Te contactaremos pronto.', 'success');
    }, 500);
}

// Botones de WhatsApp
const whatsappNavBtn = document.getElementById('whatsappNavBtn');
const whatsappContactBtn = document.getElementById('whatsappContactBtn');
const whatsappFloat = document.getElementById('whatsappFloat');

function abrirWhatsApp() {
    const mensaje = '¡Hola! Me gustaría obtener más información sobre sus servicios de spa de uñas.';
    const mensajeCodificado = encodeURIComponent(mensaje);
    const url = `https://wa.me/${3172121745}?text=${mensajeCodificado}`;
    window.open(url, '_blank');
}

whatsappNavBtn.addEventListener('click', (e) => {
    e.preventDefault();
    abrirWhatsApp();
});

whatsappContactBtn.addEventListener('click', (e) => {
    e.preventDefault();
    abrirWhatsApp();
});

whatsappFloat.addEventListener('click', (e) => {
    e.preventDefault();
    abrirWhatsApp();
});

// ===================================
// Funciones Auxiliares
// ===================================
function formatearFecha(fecha) {
    const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const fechaObj = new Date(fecha + 'T00:00:00');
    return fechaObj.toLocaleDateString('es-ES', opciones);
}

function formatearHora(hora) {
    const [horas, minutos] = hora.split(':');
    const horasNum = parseInt(horas);
    const periodo = horasNum >= 12 ? 'PM' : 'AM';
    const horas12 = horasNum > 12 ? horasNum - 12 : (horasNum === 0 ? 12 : horasNum);
    return `${horas12}:${minutos} ${periodo}`;
}

function mostrarAlerta(mensaje, tipo = 'info') {
    // Crear elemento de alerta
    const alerta = document.createElement('div');
    alerta.className = `alerta alerta-${tipo}`;
    alerta.innerHTML = `
        <span>${mensaje}</span>
        <button class="alerta-cerrar">&times;</button>
    `;
    
    // Estilos de la alerta
    alerta.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${tipo === 'success' ? '#4CAF50' : tipo === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 15px;
        animation: slideInRight 0.3s ease;
        max-width: 350px;
        font-size: 14px;
    `;
    
    // Botón cerrar
    const btnCerrar = alerta.querySelector('.alerta-cerrar');
    btnCerrar.style.cssText = `
        background: transparent;
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    `;
    
    btnCerrar.addEventListener('click', () => {
        alerta.remove();
    });
    
    document.body.appendChild(alerta);
    
    // Auto-remover después de 5 segundos
    setTimeout(() => {
        alerta.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => alerta.remove(), 300);
    }, 5000);
}

// Agregar animaciones CSS dinámicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===================================
// Animaciones al Scroll
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar elementos
document.querySelectorAll('.servicio-card, .galeria-item, .testimonio-card, .contacto-card, .info-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ===================================
// Validación de Fecha Mínima
// ===================================
const inputFecha = document.getElementById('fecha');
const hoy = new Date().toISOString().split('T')[0];
inputFecha.setAttribute('min', hoy);

// ===================================
// Prevenir envío de formulario con Enter
// ===================================
reservaForm.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
    }
});

// ===================================
// Lazy Loading para Imágenes
// ===================================
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback para navegadores que no soportan lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ===================================
// Mostrar/Ocultar botón flotante de WhatsApp
// ===================================
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        whatsappFloat.style.opacity = '1';
        whatsappFloat.style.visibility = 'visible';
    } else {
        whatsappFloat.style.opacity = '0';
        whatsappFloat.style.visibility = 'hidden';
    }
});

// ===================================
// Inicialización
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('✨ Bella Nails Spa - Website cargado correctamente');
    
    // Ocultar botón flotante inicialmente
    whatsappFloat.style.opacity = '0';
    whatsappFloat.style.visibility = 'hidden';
    whatsappFloat.style.transition = 'all 0.3s ease';
});

// ===================================
// Manejo de errores global
// ===================================
window.addEventListener('error', (e) => {
    console.error('Error detectado:', e.message);
});

// ===================================
// Prevenir zoom en inputs (móvil)
// ===================================
document.querySelectorAll('input, select, textarea').forEach(input => {
    input.addEventListener('focus', () => {
        if (window.innerWidth < 768) {
            const viewport = document.querySelector('meta[name=viewport]');
            viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
        }
    });
    
    input.addEventListener('blur', () => {
        if (window.innerWidth < 768) {
            const viewport = document.querySelector('meta[name=viewport]');
            viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
        }
    });
});