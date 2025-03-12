const CACHE_NAME = 'mi-app-cache-v1';
const urlsToCache = [
  '/cocacola/',
  '/cocacola/index.html',
  '/cocacola/style.css',
  '/cocacola/manifest.json',
  '/cocacola/icons/icon-192.png',
  '/cocacola/icons/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Cargando en caché los recursos');
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
