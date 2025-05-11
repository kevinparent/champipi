const CACHE_NAME = 'champipi-offline-cache-v1';
const FILES_TO_CACHE = [
  '/champipi/',
  '/champipi/index.html',
  '/champipi/aide.html',
  '/champipi/synonymes.html',
  '/champipi/favoris.html',
  '/champipi/observations.html',
  '/champipi/app.js',
  '/champipi/data.js',
  '/champipi/leaflet.css',
  '/champipi/leaflet.js',
  '/champipi/manifest.json',
  '/champipi/bootstrap/css/bootstrap.min.css',
  '/champipi/bootstrap/css/bootstrap-grid.min.css',
  '/champipi/bootstrap/js/bootstrap.min.js',
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