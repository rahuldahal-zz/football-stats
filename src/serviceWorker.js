const cacheName = "dist";

// handle "caching" here
self.addEventListener("install", (event) => {
  console.log("installed");
  self.skipWaiting(); // makes the new service-worker take effect immediately
});

// clean up old cache

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames
          .filter(function (cache) {
            return cache !== cacheName;
          })
          .map(function (cacheName) {
            return caches.delete(cacheName);
          })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  console.log("Service worker: Fetching");

  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});
