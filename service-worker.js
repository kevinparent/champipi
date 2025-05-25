const CACHE_NAME = 'champipi-offline-cache-v1-2025-05-25-1542';
const FILES_TO_CACHE = [
  '/champipi/',
  '/champipi/index.html',
  '/champipi/aide.html',
  '/champipi/synonymes.html',
  '/champipi/synonymes.js',
  '/champipi/observations.js',
  '/champipi/recherche.html',
  '/champipi/favoris.html',
  '/champipi/donnees_chiffrees.js',
  '/champipi/arbre_guide.js',
  '/champipi/observations.html',
  '/champipi/inaturalist.html',
  '/champipi/glossaire.html',
  '/champipi/guide.html',
  '/champipi/app.js',
  '/champipi/data.js',
  '/champipi/leaflet.css',
  '/champipi/leaflet.js',
  '/champipi/manifest.json',
  '/champipi/styles.css',
  '/champipi/icon.png',
  '/champipi/img/icon.jpg',
  '/champipi/img/ascomycota.png',
  '/champipi/img/basidiomycota.png',
  '/champipi/img/entomophtoromycota.png',
  '/champipi/img/eumycetozoa.png',
  '/champipi/img/glomeromycota.png',
  '/champipi/img/mucoromycota.png',
  '/champipi/img/mushroom_unselected_32.png',
  '/champipi/img/mushroom_selected_32.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', event => {
  const request = event.request;

  // Gestion spécifique pour les pages HTML (navigate mode)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(networkResponse => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(request, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // Gère les requêtes vers le répertoire /img dynamiquement
  if (request.url.includes('/img/')) {
    event.respondWith(
      caches.open(CACHE_NAME).then(cache =>
        cache.match(request).then(response => {
          if (response) return response;

          return fetch(request).then(networkResponse => {
            if (networkResponse.status === 200) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          }).catch(() => {
            return caches.match('/img/icon.png');
          });
        })
      )
    );
    return;
  }

  // Par défaut : cache-first pour les autres fichiers (CSS, JS, images, etc.)
  event.respondWith(
    caches.match(request).then(response => {
      return response || fetch(request).then(networkResponse => {
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(request, networkResponse.clone());
          return networkResponse;
        });
      });
    })
  );
});
