/* global workbox, self */
/* eslint-disable no-restricted-globals */

// This runs only in the browser, no require nor import allowed

// For some reason I need to add the root to my serviceWorker, because it's not working with globPatterns

const entries = ['/', ...self.__precacheManifest]

workbox.precaching.precacheAndRoute(entries)
// No console.log at all!!!
workbox.core.setLogLevel(workbox.core.LOG_LEVELS.silent)

const ExpirationPlugin = workbox.expiration.Plugin

workbox.routing.registerRoute(
  /\.(?:png|gif|jpeg|jpg|svg)$/,
  workbox.strategies.cacheFirst({
    cacheName: 'refiro-images',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 20,
        maxAgeSeconds: 60 * 60 * 24 * 30
      })
    ]
  })
)
