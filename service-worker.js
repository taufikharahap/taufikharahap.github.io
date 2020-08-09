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
    { url: '/asset/css/materialize.min.css', revision: '1' },
    { url: '/asset/css/custom.css', revision: '1' },
    { url: '/asset/js/materialize/materialize.min.js', revision: '1' },
    { url: '/asset/js/view/nav.js', revision: '1' },
    { url: '/asset/js/data/api.js', revision: '1' },
    { url: '/asset/js/data/idb.js', revision: '1' },
    { url: 'asset/js/data/db.js', revision: '1' },
    { url: 'asset/js/view/main.js', revision: '1' },
    { url: '/manifest.json', revision: '1' },
    { url: '/asset/icons/icon-96x96.png', revision: '1' },
    { url: '/asset/icons/icon-192x192.png', revision: '1' },
    { url: '/asset/icons/icon-512x512.png', revision: '1' },
    { url: '/asset/icons/favicon-32x32.png', revision: '1' },
    { url: '/asset/icons/favicon-16x16.png', revision: '1' },
    { url: '/asset/icons/logo-notfound.png', revision: '1' },
], {
  // Ignore all URL parameters.
  ignoreUrlParametersMatching: [/.*/]
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
  ({url}) => url.origin === 'https://api.football-data.org',
  workbox.strategies.staleWhileRevalidate({
      cacheName: 'api-content',
  plugins:[
      new workbox.cacheableResponse.Plugin({statuses:[0,200]}),
      new workbox.expiration.Plugin({maxAgeSeconds: 60 * 30}),
  ]
  })
);
workbox.routing.registerRoute(
  ({url}) => url.origin === 'https://fonts.googleapis.com',
  workbox.strategies.staleWhileRevalidate({
      cacheName: 'asset-google',
  plugins:[
      new workbox.cacheableResponse.Plugin({statuses:[0,200]}),
      new workbox.expiration.Plugin({maxAgeSeconds: 60 * 30}),
  ]
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