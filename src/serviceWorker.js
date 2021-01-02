const CACHE_NAME = "site-static-v2.1";
let staticAssets = [
  "/",
  "/styles.css",
  "/1.styles.css",
  "/main.js",
  "/vendors~main.js",
  "https://res.cloudinary.com/rdaahal/image/upload/v1609246223/FootballStats/Icons/juggle-72x72_vcok59.png",
  "https://res.cloudinary.com/rdaahal/image/upload/v1609246223/FootballStats/Icons/juggle-96x96_ueyfhp.png",
  "https://res.cloudinary.com/rdaahal/image/upload/v1609246224/FootballStats/Icons/juggle-128x128_qvntqj.png",
  "https://res.cloudinary.com/rdaahal/image/upload/v1609246224/FootballStats/Icons/juggle-144x144_dwpb3x.png",
  "https://res.cloudinary.com/rdaahal/image/upload/v1609246224/FootballStats/Icons/juggle-152x152_j1c8rz.png",
  "https://res.cloudinary.com/rdaahal/image/upload/v1609246224/FootballStats/Icons/juggle-192x192_jbowkw.png",
  "https://res.cloudinary.com/rdaahal/image/upload/v1609243801/FootballStats/background_egtbrw.webp",
  "https://res.cloudinary.com/rdaahal/image/upload/v1609243890/FootballStats/background_mobile_hlw9ao.webp",
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
  self.skipWaiting(); // makes the new service-worker take effect immediately
});

self.addEventListener("activate", (event) => {
  console.log("is activated");
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
  const { request } = event;
  const { host, href, pathname } = new URL(request.url);
  const fetchAndCache = [/:\/\/crests/];

  return event.respondWith(
    caches
      .match(request)
      .then(function (response) {
        if (response) {
          console.log("returning from cache ", pathname);
          return response;
        }
        if (fetchAndCache.some((regex) => regex.test(href))) {
          console.log("about to fetch and cache");
          return caches
            .open("api")
            .then((cache) => {
              return fetch(request)
                .then((response) => {
                  console.log("fetching and caching " + href);
                  cache.put(request, response.clone());
                  return response;
                })
                .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
        }

        console.log("actually fetching... " + href);
        return fetch(event.request);
      })
      .catch((err) => console.log(err))
  );
});
