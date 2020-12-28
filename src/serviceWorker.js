const CACHE_NAME = "site-static";
let staticAssets = [
  "/",
  "/styles.css",
  "/1.styles.css",
  "/main.js",
  "/vendors~main.js",
  "/assets/images/juggle-72x72.png",
  "/assets/images/juggle-96x96.png",
  "/assets/images/juggle-128x128.png",
  "/assets/images/juggle-144x144.png",
  "/assets/images/background.webp",
  "/assets/images/background_mobile.webp",
  "/manifest.webmanifest",
  "https://kit.fontawesome.com/2628210dc1.js",
  "https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;700&display=swap",
  "https://fonts.gstatic.com/s/quicksand/v21/6xKtdSZaM9iE8KbpRA_hK1QN.woff2",
  "https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,400&display=swap",
  "https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxK.woff2",
  "https://ka-f.fontawesome.com/releases/v5.15.1/css/free.min.css",
  "https://ka-f.fontawesome.com/releases/v5.15.1/css/free-v4-shims.min.css",
  "https://ka-f.fontawesome.com/releases/v5.15.1/css/free-v4-font-face.min.css",
];

// handle "caching" here
self.addEventListener("install", (event) => {
  console.log("installed");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(staticAssets))
  );
  // self.skipWaiting(); // makes the new service-worker take effect immediately
});

self.addEventListener("activate", (event) => {
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME, "api");

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then(function (response) {
        if (response) {
          console.log("returning from cache " + event.request.url);
          return response;
        }
        console.log("actually fetching... " + event.request.url);
        return fetch(event.request);
      })
      .catch((err) => console.log(err))
  );
});
