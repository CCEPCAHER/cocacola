const CACHE_NAME = "cocacola-fem-v11";
const DYNAMIC_CACHE = "cocacola-dynamic-v11";
const IMAGE_CACHE = "cocacola-images-v11";

const ASSETS_TO_CACHE = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./ui.js",
  "./manifest.json",
  "./icons/icon-192.png"
];

function getCleanUrl(url) {
  const cleanUrl = new URL(url);
  if (cleanUrl.hostname.includes("firebasestorage.googleapis.com")) {
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
  const url = new URL(event.request.url);

  if (url.hostname.includes("firebasestorage.googleapis.com")) {
    const cleanUrl = getCleanUrl(event.request.url);
    
    event.respondWith(
      caches.match(cleanUrl).then((cachedResponse) => {
        if (cachedResponse) {
          console.log("📦 [SW] Imagen servida desde CACHÉ:", cleanUrl);
          return cachedResponse;
        }

        console.log("🌐 [SW] Imagen no en caché, descargando de RED:", cleanUrl);
        return fetch(event.request).then((networkResponse) => {
          // Guardamos si es 200 (CORS OK) o 0 (Opaque/CORS fallando pero visible)
          if (networkResponse && (networkResponse.status === 200 || networkResponse.status === 0)) {
            const responseToCache = networkResponse.clone();
            caches.open(IMAGE_CACHE).then((cache) => {
              cache.put(cleanUrl, responseToCache);
              console.log("✅ [SW] Imagen guardada en CACHÉ exitosamente");
            });
          }
          return networkResponse;
        }).catch((err) => {
          console.error("❌ [SW] Error descargando imagen y no hay caché:", err);
          throw err;
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