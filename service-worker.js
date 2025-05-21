// This is a minimal service worker for PWA installability and offline support.
self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  self.clients.claim();
});

// Optionally, cache files for offline use (not required for notifications)
// self.addEventListener('fetch', event => {});
