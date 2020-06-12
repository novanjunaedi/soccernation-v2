importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if(workbox){

  workbox.precaching.precacheAndRoute([
      { url: "/", revision: '1' },
      { url: "/index.html", revision: '1' },
      { url: "/manifest.json", revision: '1' },
      { url: "/nav.html", revision: '1' },
      { url: "/package-lock.json", revision: '1' },
      { url: "/package.json", revision: '1' },
      { url: "/push.js", revision: '1' },
      { url: "/teamdetail.html", revision: '1' },
      { url: "/service-worker.js", revision: '1' },
      { url: "/css/materialize.css", revision: '1' },
      { url: "/css/materialize.min.css", revision: '1' },
      { url: "/css/style.css", revision: '1' },
      { url: "/images/icon.png", revision: '1' },
      { url: "/images/banner.jpg", revision: '1' },
      { url: "/images/logo.png", revision: '1' },
      { url: "/images/jb-image.jpg", revision: '1' },
      { url: "/images/about-img.jpg", revision: '1' },
      { url: "/images/contact-img.jpg", revision: '1' },
      { url: "/images/favteam-img.jpg", revision: '1' },
      { url: "/images/matches-img.jpg", revision: '1' },
      { url: "/images/scorer-img.jpg", revision: '1' },
      { url: "/images/standings-img.jpg", revision: '1' },
      { url: "/images/teams-img.jpg", revision: '1' },
      { url: "/js/api.js", revision: '1' },
      { url: "/js/db.js", revision: '1' },
      { url: "/js/idb.js", revision: '1' },
      { url: "/js/functions.js", revision: '1' },
      { url: "/js/materialize.js", revision: '1' },
      { url: "/js/materialize.min.js", revision: '1' },
      { url: "/js/nav.js", revision: '1' },
      { url: "/js/savedata.js", revision: '1' },
      { url: "/pages/about.html", revision: '1' },
      { url: "/pages/contact.html", revision: '1' },
      { url: "/pages/favorite-team.html", revision: '1' },
      { url: "/pages/matches.html", revision: '1' },
      { url: "/pages/scorers.html", revision: '1' },
      { url: "/pages/standings.html", revision: '1' },
      { url: "/pages/teams.html", revision: '1' },
      { url: "/pages/home.html", revision: '1' }
  ]);

  console.log('Workbox is working!');

    workbox.routing.registerRoute(
            new RegExp('https://api.football-data.org/v2/'),
            workbox.strategies.staleWhileRevalidate({
            cacheName: 'soccernation-api',
            plugins: [
                new workbox.cacheableResponse.Plugin({
                  statuses: [200],
                }),
                new workbox.expiration.Plugin({
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                  maxEntries: 30,
                }),
              ]
            })
        );

        workbox.routing.registerRoute(
            /.*(?:png|gif|jpg|jpeg|svg|ico|webp)$/,
            workbox.strategies.cacheFirst({
              cacheName: 'soccernation-images',
              plugins: [
                new workbox.cacheableResponse.Plugin({
                  statuses: [0, 200]
                }),
                new workbox.expiration.Plugin({
                  maxEntries: 100,
                  maxAgeSeconds: 30 * 24 * 60 * 60,
                }),
              ]
            })
        );
    
        workbox.routing.registerRoute(
            /\.(?:js|css|html)$/,
            new workbox.strategies.StaleWhileRevalidate({
              cacheName: 'soccernation-static-resource',
            })
        );

        workbox.routing.registerRoute(
          new RegExp('/teamdetail'),
            workbox.strategies.staleWhileRevalidate({
                cacheName: 'teamdetail'
            })
        );

    } else {
        console.log(`Workbox is not working`);
    }


self.addEventListener('push', event => {
    var body;

    console.log(event);

    if (event.data) {
      body = event.data.text();
    } else {
      body = 'Push message no payload';
    }
    var options = {
      body: body,
      icon: 'icon.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };
    event.waitUntil(
      self.registration.showNotification('Welcome to Soccer Nation', options)
    );
});



/*
const CACHE_NAME = "soccernation-v2";
var urlsToCache = [
  "/",
  "/icon.png",
  "/index.html",
  "/manifest.json",
  "/package-lock.json",
  "/package.json",
  "/push.js",
  "/nav.html",
  "/service-worker.js",
  "/teamdetail.html",
  "/css/materialize.css",
  "/css/materialize.min.css",
  "/images/banner.jpg",
  "/images/logo.png",
  "/images/PL-Lion.png",
  "/js/api.js",
  "/js/functions.js",
  "/js/db.js",
  "/js/idb.js",
  "/js/materialize.js",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/pages/about.html",
  "/pages/contact.html",
  "/pages/favorite-team.html",
  "/pages/matches.html",
  "/pages/scorers.html",
  "/pages/standings.html",
  "/pages/teams.html"
];

self.addEventListener("install", function(event){
	event.waitUntil(
		caches.open(CACHE_NAME).then(function(cache){
			return cache.addAll(urlsToCache);
		})
	);
});

self.addEventListener("fetch", function(event) {
  var base_url ="https://api.football-data.org/v2/";
  if (event.request.url.indexOf(base_url) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return fetch(event.request).then(function(response) {
          cache.put(event.request.url, response.clone());
          return response;
        })
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch (event.request);
      })
    )
  }
});

self.addEventListener("activate", function(event) {
	event.waitUntil(
		caches.keys().then(function(cacheName) {
			return Promise.all(
				cacheNames.map(function(cacheName) {
					if (cacheName != CACHE_NAME && cacheName.startsWith("soccernation-v")) {
						console.log("ServiceWorker: cache " + "dihapus");
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
});

self.addEventListener('push', event => {
  var body;

  console.log(event);

  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: 'icon.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Welcome to Soccer Nation', options)
  );
});

*/