importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox) {
  console.log(`Workbox berhasil dimuat`);
} else {
  console.log(`Workbox gagal dimuat`);
}

workbox.precaching.precacheAndRoute([
  {url: '/', revision: '2'},
  {url: '/nav.html',  revision: '2'},
  {url: '/index.html',  revision: '2'},
  {url: '/manifest.json',  revision: '2'},
  {url: '/club.html',  revision: '2'},
  {url: '/icon.png',  revision: '2'},
  {url: '/icon512',  revision: '2'},
  {url: "/pages/home.html", revision: '2'},
  {url: "/pages/favorite.html", revision: '2'},
  {url: "/pages/topscore.html", revision: '2'},
  {url: "/css/materialize.min.css", revision: '2'},
  {url: "/js/materialize.min.js", revision: '2'},
  {url: "/js/nav.js", revision: '2'},
  {url: "/js/api.js", revision: '2'},
  {url: "/js/helper.js", revision: '2'},
  {url: "/js/idb.js", revision: '2'},
  {url: "/js/db.js", revision: '2'},
]);

workbox.routing.registerRoute(  
  new RegExp('/'),
  workbox.strategies.staleWhileRevalidate()
)

workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.cacheFirst({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
      }),
    ],
  }),
);

workbox.routing.registerRoute(
  new RegExp('https://api.football-data.org/v2/'),
  workbox.strategies.staleWhileRevalidate()
)

workbox.routing.registerRoute(
  new RegExp('.*\.js'),
  workbox.strategies.cacheFirst()
);

workbox.routing.registerRoute(
  new RegExp('/css/materialize.min.css'),
  workbox.strategies.cacheFirst()
);

workbox.routing.registerRoute(
  new RegExp('.*\.png'),
  workbox.strategies.cacheFirst()
);

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