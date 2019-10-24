const CACHE_NAME = "pursuit-cache-v0.1.0",
    ASSETS = ["./", "index.html", "icon.png"]

self.addEventListener("install", event => {
    event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)))
})

self.addEventListener("activate", event =>
    event.waitUntil(caches.keys().then(keys => Promise.all(keys.map(key => { if (key !== CACHE_NAME) return caches.delete(key) }))))
)

self.addEventListener("fetch", event => {
    let request = event.request
    event.respondWith(caches.match(request).then(cacheResponse => cacheResponse || fetchReq(request)))
})

function fetchReq(request) {
    return fetch(request).then(netRes => {
        let resClone = netRes.clone()
        if (resClone.ok)
            caches.open(CACHE_NAME).then(cache => cache.put(request, resClone))
        else
            console.log(response.statusText)
        return netRes
    })
}