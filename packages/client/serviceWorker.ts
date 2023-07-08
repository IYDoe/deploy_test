/// <reference lib="WebWorker" />

// export empty type because of tsc --isolatedModules flag
export type {}
declare const self: ServiceWorkerGlobalScope

const CACHE_NAME = 'the-lost-vikings-v2'
const urlsToCache = [
    '/',
    '/login',
    '/register',
    '/profile',
    '/edit-profile',
    '/edit-password',
    '/feed',
    '/start-screen',
    '/end-screen-success',
    '/end-screen-fail',
    '/leader-board',
    '/game',
    '/error',
]

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(
            cache => {
                return cache.addAll(urlsToCache)
            },
            error => console.log(error)
        )
    )
})

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(function (keys) {
            return Promise.all(
                keys.map(key => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key)
                    }
                })
            )
        })
    )
})

const tryNetwork = (
    req: RequestInfo | URL,
    timeout: number | undefined
): Promise<Response> => {
    if (req instanceof Request && req.url.startsWith('chrome-extension://')) {
        return fetch(req)
    }

    return new Promise<Response>((resolve, reject) => {
        const timeoutId = setTimeout(reject, timeout)
        fetch(req)
            .then(res => {
                clearTimeout(timeoutId)
                const responseClone = res.clone()
                caches.open(CACHE_NAME).then(cache => {
                    if (
                        !(req instanceof Request) ||
                        !req.url.startsWith('chrome-extension://')
                    ) {
                        cache.put(req, responseClone)
                    }
                })
                resolve(res)
            })
            .catch(reject)
    })
}

const getFromCache = async (req: RequestInfo | URL): Promise<Response> => {
    const cache = await caches.open(CACHE_NAME)
    const result = await cache.match(req)
    if (result) {
        return result
    }
    throw new Error('no-match')
}

self.addEventListener('fetch', event => {
    event.respondWith(
        tryNetwork(event.request, 400).catch(() => getFromCache(event.request))
    )
})
