importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

workbox.skipWaiting();
workbox.clientsClaim();

if (workbox) {
  console.log(`Workbox berhasil dimuat`);
}else {
  console.log(`Workbox gagal dimuat`);
}

workbox.precaching.precacheAndRoute([
    { url: '/index.html', revision: '1' },
    { url: '/nav.html', revision: '1' },
    { url: '/info-team.html', revision: '1' },
    { url: '/css/materialize.min.css', revision: '1' },
    { url: '/css/custom.css', revision: '1' },
    { url: '/js/materialize.min.js', revision: '1' },
    { url: '/js/nav.js', revision: '1' },
    { url: '/js/api.js', revision: '1' },
    { url: '/js/idb.js', revision: '1' },
    { url: '/js/db.js', revision: '1' },
    { url: '/manifest.json', revision: '1' },
    { url: '/icons/icon-96x96.png', revision: '1' },
    { url: '/icons/icon-192x192.png', revision: '1' },
    { url: '/icons/icon-512x512.png', revision: '1' },
], {
  // Ignore all URL parameters.
  ignoreURLParametersMatching: [/.*/]
});


workbox.routing.registerRoute(
  new RegExp('/pages/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'content-halaman'
  })
);

workbox.routing.registerRoute(
  new RegExp('/info-team.html'),
  workbox.strategies.staleWhileRevalidate({
      cacheName: 'info-team',
  })
);

workbox.routing.registerRoute(
  new RegExp('\.css$'),
  workbox.strategies.cacheFirst({
    cacheName: 'css',
    plugins: [
    new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 7, // cache for one week
        maxEntries: 20, // only cache 20 request
        purgeOnQuotaError: true
      })
    ]
  })
);

workbox.routing.registerRoute(
  new RegExp('\.js$'),
  workbox.strategies.cacheFirst({
      cacheName: 'js',
      plugins: [
          new workbox.expiration.Plugin({
              maxAgeSeconds: 60 * 60 * 24 * 7, // cache for one week
              maxEntries: 20, // only cache 20 request
              purgeOnQuotaError: true
          })
      ]
  })
);

workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.cacheFirst({
    cacheName: 'images-icons',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
      }),
    ],
  }),
);

workbox.routing.registerRoute(
  /^https:\/\/api\.football-data\.org\/v2\//,
  workbox.strategies.staleWhileRevalidate({
      cacheName: 'api-content',
  plugins:[
      new workbox.cacheableResponse.Plugin({statuses:[0,200]}),
      new workbox.expiration.Plugin({maxAgeSeconds: 60 * 30}),
  ]
  })
);

// Menyimpan cache dari CSS Google Fonts
workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  })
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
    icon: 'icons/icon-512x512.png',
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