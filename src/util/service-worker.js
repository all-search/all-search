/**
 * @file service-worker.js with workbox api
 * @desc [example](https://workbox-samples.glitch.me/examples/workbox-sw/)
 * @author jerryzhang
 */
// eslint-disable-next-line
importScripts('https://g.alicdn.com/kg/workbox/3.6.3/workbox-sw.js')

workbox.setConfig({
  modulePathPrefix: 'https://g.alicdn.com/kg/workbox/3.6.3/'
})

/* globals workbox */
workbox.core.setCacheNameDetails({
  prefix: 'pwa-cache',
  suffix: 'v1',
  precache: 'install-time',
  runtime: 'run-time',
  googleAnalytics: 'ga'
})

// workbox.skipWaiting();
workbox.clientsClaim()

workbox.precaching.precacheAndRoute(self.__precacheManifest || [])

self.addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting()
        .then(() => replyPort.postMessage({ error: null }))
        .catch(error => replyPort.postMessage({ error }))
    )
  }
})

workbox.routing.registerRoute(
  /^https:\/\/endday.github.io\/pwa-vue-cli-demo\//i,
  workbox.strategies.networkFirst({
    cacheName: 'pwa-static-cache'
  })
)

/**
 * example runningCache with api
 */
// workbox.routing.registerRoute(/^https:\/\/lavas\.baidu\.com\/some\/api/,
//     workbox.strategies.networkFirst());

/**
 * example runningCache with resources from CDN
 * including maxAge, maxEntries
 * cacheableResponse is important for CDN
 */
/*workbox.routing.registerRoute(/^https:\/\/cdn\.baidu\.com/i,
    workbox.strategies.cacheFirst({
        cacheName: 'lavas-cache-images',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 100,
                maxAgeSeconds: 7 * 24 * 60 * 60
            }),
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200]
            })
        ]
    })
);*/
