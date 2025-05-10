const CACHE_NAME = 'champipi-offline-cache-v1';
const FILES_TO_CACHE = [
  '/',
  '/champipi_parsed.js',
  '/index.html',
  '/aide.html',
  '/synonymes.html',
  '/favoris.html',
  '/synonymes.js',
  '/observations.html',
  '/app.js',
  '/data.js',
  '/leaflet.css',
  '/leaflet.js',
  '/manifest.json',
  '/bootstrap/css/bootstrap.min.css',
  '/bootstrap/css/bootstrap-grid.min.css',
  '/bootstrap/js/bootstrap.min.js',
  '/icon.png',
  '/img/mushroom_unselected_32.png',
  '/img/mushroom_selected_32.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

self.addEventListener('fetch', event => {
const request = event.request;

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
            // Optionnel : retourner une image par défaut si offline
            return caches.match('/img/icon.png');
          });
        })
      )
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});