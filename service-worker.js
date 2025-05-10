const CACHE_NAME = 'champipi-offline-cache-v1';
const FILES_TO_CACHE = [
  '/',
  '/champipi_parsed.js',
  '/index.html',
  '/aide.html',
  '/synonymes.html',
  '/favoris.html',
  '/synonymes.js',
  '/app.js',
  '/data.js',
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
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});