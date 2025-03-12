const CACHE_NAME = 'mi-app-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

// Evento de instalación: guarda en caché los recursos especificados
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cargando en caché los recursos...');
        return cache.addAll(urlsToCache);
      })
      .catch(error => console.error('Error al cachear archivos:', error))
  );
  self.skipWaiting(); // Activa inmediatamente el nuevo Service Worker
});

// Evento fetch: intercepta las peticiones y sirve desde la caché si está disponible
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request)
          .catch(() => console.error('Fallo en la red y no encontrado en caché:', event.request.url));
      })
  );
});

// Evento activate: limpia cachés antiguas y toma control de las páginas abiertas
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log('Borrando caché antigua:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim(); // Toma el control inmediato de las pestañas abiertas
});
