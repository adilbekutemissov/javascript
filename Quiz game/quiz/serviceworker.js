const CACHE = 'cache-and-update-v1';
const PRECACHE_URLS = [
    'index.html',
    'game.html',
    'highscores.html',
    'end.html',
    'app.css',
    'game.css',
    'highscores.css',
    'game.js',
    'highscores.js',
    'end.js'
];

// When installing the worker, we must cache part of the data (statics).
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE).then((cache) =>
            cache.addAll(PRECACHE_URLS))
    );
});

// when the fetch event, we use the cache, and only then update it with data from the server
self.addEventListener('fetch', function(event) {
    // We use `respondWith ()` to instantly respond without waiting for a response from the server.
    event.respondWith(fromCache(event.request));
    // `waitUntil ()` is needed to prevent the worker from stopping before the cache is updated.
    event.waitUntil(update(event.request));
});

function fromCache(request) {
    return caches.open(CACHE).then((cache) =>
        cache.match(request).then((matching) =>
            matching || Promise.reject('no-match')
        ));
}

function update(request) {
    return caches.open(CACHE).then((cache) =>
        fetch(request).then((response) =>
            cache.put(request, response)
        )
    );
}