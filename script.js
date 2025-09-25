// JavaScript para controlar la barra lateral en pantallas pequeñas y redimensionamiento
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebar = document.querySelector('.sidebar');
let isSidebarHidden = false; // Variable para rastrear el estado de la barra lateral

sidebarToggle.addEventListener('click', () => {
    if (isSidebarHidden) {
        sidebar.style.width = '250px'; // Mostrar barra lateral con ancho fijo
    } else {
        sidebar.style.width = '0'; // Ocultar barra lateral
    }
    isSidebarHidden = !isSidebarHidden; // Invertir el estado
});

// Redimensionamiento de la barra lateral (opcional)
let isResizing = false;
let startX;
let startWidth;

sidebar.addEventListener('mousedown', (e) => {
    if (window.innerWidth > 768) { // Solo permitir redimensionar en pantallas grandes
        isResizing = true;
        startX = e.clientX;
        startWidth = sidebar.offsetWidth;
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }
});

function handleMouseMove(e) {
    if (!isResizing) return;
    const newWidth = startWidth + e.clientX - startX;
    sidebar.style.width = `${newWidth}px`;
}

function handleMouseUp() {
    isResizing = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
}

// Ocultar la barra lateral en pantallas pequeñas al cargar la página
if (window.innerWidth <= 768) {
    sidebar.style.width = '0';
    isSidebarHidden = true;
}