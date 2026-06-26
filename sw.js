const CACHE_NAME = "cocacola-fem-v31";
const DYNAMIC_CACHE = "cocacola-dynamic-v31";
const IMAGE_CACHE = "cocacola-images-v31";

const ASSETS_TO_CACHE = [
  "./",
  "./index.html",
  "./style.css?v=31",
  "./script.js?v=31",
  "./ui.js?v=31",
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
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Forzar descargas frescas saltándose la caché HTTP del navegador
      const reloadPromises = ASSETS_TO_CACHE.map((url) => {
        return fetch(new Request(url, { cache: 'reload' }))
          .then((response) => {
            if (response.ok) {
              return cache.put(url, response);
            }
            throw new Error(`Error al cachear ${url}: ${response.statusText}`);
          });
      });
      return Promise.all(reloadPromises);
    }).catch(err => console.error("❌ Fallo en instalación del SW:", err))
  );
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
    // Si no es una descarga de archivo/media (ej. es metadatos del SDK), no interceptar ni cachear
    if (url.searchParams.get("alt") !== "media") {
      return;
    }
    
    // CACHE-FIRST para imágenes de Firebase Storage usando la URL completa como clave
    // De esta forma, cuando la imagen cambia (y con ella su token), se baja la nueva versión.
    const cacheKey = event.request.url;
    
    event.respondWith(
      caches.open(IMAGE_CACHE).then((cache) => {
        return cache.match(cacheKey).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }

          // Si NO hay caché, ir a la red forzando CORS
          return fetch(event.request.url, { mode: 'cors' }).then((networkResponse) => {
            if (networkResponse && (networkResponse.status === 200 || networkResponse.status === 0)) {
              cache.put(cacheKey, networkResponse.clone()).catch(() => {});
            }
            return networkResponse;
          }).catch(() => {
            // Fallback si falla el fetch CORS (ej. offline o bloqueo CORS)
            return fetch(event.request).then((networkResponse) => {
              if (networkResponse && (networkResponse.status === 200 || networkResponse.status === 0)) {
                cache.put(cacheKey, networkResponse.clone()).catch(() => {});
              }
              return networkResponse;
            });
          });
        });
      })
    );
    return;
  }

  if (url.hostname.includes("firestore.googleapis.com") || url.hostname.includes("identitytoolkit.googleapis.com")) {
    return;
  }

  // STALE-WHILE-REVALIDATE seguro para recursos estáticos y dinámicos de la app
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Actualizar en caché dinámico en segundo plano
        fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(DYNAMIC_CACHE).then((cache) => cache.put(event.request, networkResponse.clone()));
          }
        }).catch(() => {/* Ignorar errores */});
        return cachedResponse;
      }

      // Si no está en caché, buscar en red y guardar copia
      return fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(DYNAMIC_CACHE).then((cache) => cache.put(event.request, responseToCache).catch(() => {}));
        }
        return networkResponse;
      }).catch((err) => {
        // En caso de fallo de red de navegación (ej. recargar la página offline), servir index.html
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
        throw err; // Propagar error para que la petición falle de forma controlada en el navegador
      });
    })
  );
});