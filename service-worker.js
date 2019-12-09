const CACHE_NAME = "premier-league-v1.1";
var urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/club.html",
  "/icon.png",
  "/icon512.png",
  "/manifest.json",
  "/pages/home.html",
  "/pages/favorite.html",
  "/pages/topscore.html",
  "/css/materialize.min.css",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/js/api.js",
  "/js/helper.js",
  "/js/idb.js",
  "/js/db.js",
];

self.addEventListener("install", function (event) {
  console.log("ServiceWorker: Menginstall..");

  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("ServiceWorker: Membuka cache..");
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('activate', function (event) {
  console.log('Aktivasi service worker baru');
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName !== CACHE_NAME && cacheName.startsWith("premier-league-app")) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", function (event) {
  var base_url = "https://api.football-data.org/v2/";
  if (event.request.url.indexOf(base_url) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function (cache) {
        return fetch(event.request).then(function (response) {
          cache.put(event.request.url, response.clone());
          return response;
        })
      })
    );
  } else {
    event.respondWith(
        caches.match(event.request, { ignoreSearch: true }).then(function(response) {
            return response || fetch (event.request);
        })
    )
  }
});


self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});