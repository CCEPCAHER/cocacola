// ui.js - Lógica de Interfaz de Usuario (Modo Oscuro, PWA, Toasts)

document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
  initPWAInstall();
  initNetworkStatus();
});

// ========================
// 1. MODO OSCURO
// ========================
function initDarkMode() {
  const darkModeBtn = document.getElementById('dark-mode-btn');
  if (!darkModeBtn) return;

  // Comprobar preferencia guardada o preferencia del sistema
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
    darkModeBtn.textContent = '☀️';
  } else {
    darkModeBtn.textContent = '🌙';
  }

  // Alternar tema
  darkModeBtn.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
      darkModeBtn.textContent = '🌙';
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      darkModeBtn.textContent = '☀️';
    }
  });
}

// ========================
// 2. INSTALACIÓN PWA
// ========================
let deferredPrompt;

function initPWAInstall() {
  const installBtn = document.getElementById('install-btn');
  if (!installBtn) return;

  // Escuchar el evento de Chrome para instalar
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevenir que aparezca el mini-infobar por defecto
    e.preventDefault();
    // Guardar el evento
    deferredPrompt = e;
    // Mostrar el botón
    installBtn.classList.remove('hidden');
  });

  installBtn.addEventListener('click', async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('Usuario aceptó instalar la PWA');
      }
      deferredPrompt = null;
      installBtn.classList.add('hidden');
    }
  });

  // Ocultar el botón si ya se instaló
  window.addEventListener('appinstalled', () => {
    installBtn.classList.add('hidden');
    showToast('¡App instalada con éxito!', 'success');
  });
}

// ========================
// 3. TOASTS & ESTADO DE RED
// ========================
export function showToast(message, type = 'info') {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = message;
  
  // Colores según el tipo
  if (type === 'error') toast.style.background = 'rgba(229, 62, 62, 0.9)';
  else if (type === 'success') toast.style.background = 'rgba(72, 187, 120, 0.9)';
  else toast.style.background = 'rgba(44, 122, 123, 0.9)'; // Primary

  toast.classList.add('show');

  // Ocultar después de 3.5 segundos
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

function initNetworkStatus() {
  window.addEventListener('offline', () => {
    showToast('🚫 Sin conexión. Usando modo offline.', 'error');
  });

  window.addEventListener('online', () => {
    showToast('✅ Conexión recuperada. Actualizando...', 'success');
    // Forzar actualización de imágenes si es necesario
    if (typeof window.updateProductImages === 'function') {
      window.updateProductImages();
    }
  });
}

window.showToast = showToast; // Hacerlo global por si script.js lo necesita
