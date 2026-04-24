const CACHE_NAME = "cocacola-fem-v5";
const DYNAMIC_CACHE = "cocacola-dynamic-v5";
const IMAGE_CACHE = "cocacola-images-v5";

const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/admin.html",
  "/style.css",
  "/script.js",
  "/ui.js",
  "/manifest.json",
  "/icons/icon-192.png",
  "/icons/icon-512.png"
];

// Función para limpiar la URL de Firebase (quitar tokens y parámetros)
function getCleanUrl(url) {
  const cleanUrl = new URL(url);
  if (cleanUrl.hostname.includes("firebasestorage.googleapis.com")) {
    cleanUrl.search = ""; // Eliminar ?alt=media&token=...
  }
  return cleanUrl.toString();
}

// Install Event
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

// Activate Event
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME && key !== DYNAMIC_CACHE && key !== IMAGE_CACHE) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Fetch Event
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // 1. Firebase Storage Images - Estrategia: Cache First con URL Limpia
  if (url.hostname.includes("firebasestorage.googleapis.com")) {
    const cleanUrl = getCleanUrl(event.request.url);
    
    event.respondWith(
      caches.match(cleanUrl).then((cachedResponse) => {
        // Si está en caché (con la URL limpia), la devolvemos
        if (cachedResponse) {
          return cachedResponse;
        }

        // Si no está, la descargamos de la red
        return fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(IMAGE_CACHE).then((cache) => {
              // IMPORTANTE: Guardamos la respuesta usando la URL limpia como llave
              cache.put(cleanUrl, responseToCache);
            });
          }
          return networkResponse;
        }).catch(() => {
          console.error("Imagen no disponible offline:", cleanUrl);
        });
      })
    );
    return;
  }

  // 2. Firebase API Calls - Ignorar
  if (url.hostname.includes("firestore.googleapis.com") || url.hostname.includes("identitytoolkit.googleapis.com")) {
    return;
  }

  // 3. Otros Assets - Stale-While-Revalidate
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200 && (networkResponse.type === 'basic' || networkResponse.type === 'cors')) {
          caches.open(DYNAMIC_CACHE).then((cache) => cache.put(event.request, networkResponse.clone()));
        }
        return networkResponse;
      }).catch(() => {
        if (event.request.mode === 'navigate') return caches.match('/index.html');
      });
      return cachedResponse || fetchPromise;
    })
  );
});