const CACHE_NAME = "cocacola-fem-v2";
const DYNAMIC_CACHE = "cocacola-dynamic-v2";
const IMAGE_CACHE = "cocacola-images-v2";

const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/admin.html",
  "/style.css",
  "/script.js",
  "/admin.js",
  "/admin-promotions.js",
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

  // 1. Firebase Storage Images (Stale-While-Revalidate Strategy para que cambien al actualizarse)
  if (url.hostname.includes("firebasestorage.googleapis.com")) {
    event.respondWith(
      caches.match(event.request, { ignoreSearch: true }).then((cachedResponse) => {
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          if (networkResponse && (networkResponse.status === 200 || networkResponse.status === 0)) {
            caches.open(IMAGE_CACHE).then(async (cache) => {
              // Limpiar versiones anteriores de esta misma imagen (mismo pathname, distinto token)
              const keys = await cache.keys();
              const reqPathname = new URL(event.request.url).pathname;
              for (const req of keys) {
                if (new URL(req.url).pathname === reqPathname) {
                  await cache.delete(req);
                }
              }
              cache.put(event.request, networkResponse.clone());
            });
          }
          return networkResponse;
        }).catch((e) => {
          console.log('Offline: Usando imagen de Firebase en caché');
        });

        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // 2. Firebase API Calls (Firestore) - Let them pass through
  // Firestore has its own robust offline persistence cache
  if (url.hostname.includes("firestore.googleapis.com") || url.hostname.includes("identitytoolkit.googleapis.com")) {
    return; // Fallback to default browser fetch behavior
  }

  // 3. Static Assets & App Shell (Stale-While-Revalidate Strategy)
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        // Solo cachear respuestas válidas y seguras
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
          });
        }
        return networkResponse;
      }).catch(() => {
        // Fallback offline si el fetch falla y no está en caché
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
      });

      return cachedResponse || fetchPromise;
    })
  );
});