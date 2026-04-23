const CACHE_NAME = "cocacola-fem-v4";
const DYNAMIC_CACHE = "cocacola-dynamic-v4";
const IMAGE_CACHE = "cocacola-images-v4";

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

// Install Event - Precache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Precaching App Shell");
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate Event - Clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME && key !== DYNAMIC_CACHE && key !== IMAGE_CACHE) {
            console.log("Removing old cache", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Fetch Event - Handle requests
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // 1. Firebase Storage Images (Estrategia Cache-First para Offline Total)
  if (url.hostname.includes("firebasestorage.googleapis.com")) {
    event.respondWith(
      caches.match(event.request, { ignoreSearch: true }).then((cachedResponse) => {
        // Si está en caché, la devolvemos inmediatamente
        if (cachedResponse) {
          return cachedResponse;
        }

        // Si no está, la buscamos en la red y la guardamos
        return fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(IMAGE_CACHE).then((cache) => {
              // Guardamos la imagen ignorando el token en la clave si es posible
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        }).catch(() => {
          // Si falla red y no hay caché, podemos devolver un placeholder si quisiéramos
          console.error("Imagen no disponible offline");
        });
      })
    );
    return;
  }

  // 2. Firebase API Calls (Firestore/Auth) - Ignorar
  if (url.hostname.includes("firestore.googleapis.com") || url.hostname.includes("identitytoolkit.googleapis.com")) {
    return;
  }

  // 3. Static Assets (Stale-While-Revalidate)
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200 && (networkResponse.type === 'basic' || networkResponse.type === 'cors')) {
          caches.open(DYNAMIC_CACHE).then((cache) => {
            cache.put(event.request, networkResponse.clone());
          });
        }
        return networkResponse;
      }).catch(() => {
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
      });

      return cachedResponse || fetchPromise;
    })
  );
});