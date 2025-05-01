// sw.js
self.addEventListener('fetch', function(event) {
    // Empty service worker to enable background audio
});
// Service Worker for background playback
const CACHE_NAME = 'radioyoo-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/assets/logo.webp'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

// Media Session handling for notifications
self.addEventListener('message', event => {
  if (event.data.type === 'SET_MEDIA_SESSION') {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: 'Radio Yoo',
      artist: 'Live Streaming • 24/7',
      artwork: [
        { src: 'assets/logo.webp', sizes: '96x96', type: 'image/webp' },
        { src: 'assets/logo.webp', sizes: '128x128', type: 'image/webp' },
        { src: 'assets/logo.webp', sizes: '192x192', type: 'image/webp' },
        { src: 'assets/logo.webp', sizes: '256x256', type: 'image/webp' },
        { src: 'assets/logo.webp', sizes: '384x384', type: 'image/webp' },
        { src: 'assets/logo.webp', sizes: '512x512', type: 'image/webp' }
      ]
    });

    navigator.mediaSession.setActionHandler('play', () => {
      event.source.postMessage({ type: 'PLAY' });
    });
    
    navigator.mediaSession.setActionHandler('pause', () => {
      event.source.postMessage({ type: 'PAUSE' });
    });
    
    navigator.mediaSession.setActionHandler('stop', () => {
      event.source.postMessage({ type: 'STOP' });
    });
  }
});