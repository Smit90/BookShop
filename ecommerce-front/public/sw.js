// console.info("%c SW loaded from public folder", 'background: #222; color: #bada55')

let cacheData = 'appV1'

this.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cacheData).then((cache) => {
            cache.addAll([
                'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
                '/static/js/bundle.js',
                '/static/js/main.chunk.js',
                // '/static/js/main.chunk.js.map',
                '/static/js/vendors~main.chunk.js',
                '/static/js/vendors.js',
                '/index.html',
                '/manifest.json',
                'https://res.cloudinary.com/dv1pxme9o/image/upload/v1670304077/BookShopLogo_dd3kwu.jpg',
                '/',
            ])
        }).catch(err => {
            console.error(err)
        })
    )
})

this.addEventListener('fetch', (event) => {

    if (!navigator.onLine) {
        if (event.request.url == 'http://localhost:3000/static/js/main.chunk.js') {

            event.waitUntil(
                this.registration.showNotification('BookShop', {
                    body: "Internet is not working!",
                    icon: "https://res.cloudinary.com/dv1pxme9o/image/upload/v1670304077/BookShopLogo_dd3kwu.jpg"
                })
            )
        }
        event.respondWith(
            caches.match(event.request).then(res => {
                if (res) {
                    return res
                }
                let requestURL = event.request.clone()
                return fetch(requestURL)
            })
        )
    }
})