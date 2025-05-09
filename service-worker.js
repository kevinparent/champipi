const CACHE_NAME = 'champipi-offline-cache-v1';
const FILES_TO_CACHE = [
  '/',
  '/champipi_parsed.js',
  '/index.html',
  '/synonymes.js',
  '/app.js',
  '/data.js',
  '/manifest.json',
  '/bootstrap/css/bootstrap.min.css',
  '/bootstrap/css/bootstrap-grid.min.css',
  '/bootstrap/js/bootstrap.min.js',
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