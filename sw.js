const CACHE_NAME = "cocacola-fem-v17";
const DYNAMIC_CACHE = "cocacola-dynamic-v17";
const IMAGE_CACHE = "cocacola-images-v17";

const ASSETS_TO_CACHE = [
  "./",
  "./index.html",
  "./style.css?v=17",
  "./script.js?v=17",
  "./ui.js?v=17",
  "./manifest.json",
  "./favicon.ico",
  "./icons/icon-192.png",
  "./icons/icon-512x512.png"
];

function getCleanUrl(url) {
  const cleanUrl = new URL(url);
  if (cleanUrl.hostname.includes("firebasestorage.googleapis.com") || cleanUrl.hostname.includes("firebasestorage.app")) {
    cleanUrl.search = ""; 
  }
  return cleanUrl.toString();
}

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.map((key) => {
        if (key !== CACHE_NAME && key !== DYNAMIC_CACHE && key !== IMAGE_CACHE) {
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  // Solo procesar peticiones GET y protocolos http/https
  if (event.request.method !== 'GET' || !event.request.url.startsWith('http')) {
    return;
  }

  const url = new URL(event.request.url);

  if (url.hostname.includes("firebasestorage.googleapis.com") || url.hostname.includes("firebasestorage.app")) {
    const cleanUrl = getCleanUrl(event.request.url);
    
    // STALE-WHILE-REVALIDATE: Sirve la caché al instante,
    // pero actualiza en segundo plano para la próxima vez
    event.respondWith(
      caches.open(IMAGE_CACHE).then((cache) => {
        return cache.match(cleanUrl).then((cachedResponse) => {
          // Siempre intentar descargar la nueva versión en segundo plano
          const fetchPromise = fetch(event.request).then((networkResponse) => {
            if (networkResponse && (networkResponse.status === 200 || networkResponse.status === 0)) {
              const responseToCache = networkResponse.clone();
              cache.put(cleanUrl, responseToCache);
            }
            return networkResponse;
          }).catch(() => null); 

          // Si hay caché, devolverla al instante (la actualización ocurre en segundo plano)
          // Si NO hay caché, esperar a la red. Si la red falla, dejar que el navegador maneje el error
          return cachedResponse || fetchPromise || fetch(event.request);
        });
      })
    );
    return;
  }

  if (url.hostname.includes("firestore.googleapis.com") || url.hostname.includes("identitytoolkit.googleapis.com")) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(DYNAMIC_CACHE).then((cache) => cache.put(event.request, responseToCache));
        }
        return networkResponse;
      }).catch(() => {
        if (event.request.mode === 'navigate') return caches.match('./index.html');
      });
      return cachedResponse || fetchPromise;
    })
  );
});