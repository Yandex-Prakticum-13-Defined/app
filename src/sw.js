const CACHE_NAME = 'app-v1';
const STATIC_CACHE_NAME = `s-${CACHE_NAME}`;
const DYNAMIC_CACHE_NAME = `d-${CACHE_NAME}`;

const URLS = [
  '/',
  '/sw',
  '/index.html',
  '/game',
  '/register',
  '/leaderboard',
  '/login',
  '/profile',
  '/Error404',
  '/Error500'
];

// eslint-disable-next-line no-restricted-globals
self.addEventListener('install', async () => {
  const cache = await caches.open(STATIC_CACHE_NAME);
  await cache.addAll(URLS);
});
// eslint-disable-next-line no-restricted-globals
self.addEventListener('activate', async () => {
  const cacheNames = await caches.keys();

  await Promise.all(
    cacheNames
      .filter((name) => name !== STATIC_CACHE_NAME)
      .filter((name) => name !== DYNAMIC_CACHE_NAME)
      .map((name) => caches.delete(name))
  );
});
// eslint-disable-next-line no-restricted-globals
self.addEventListener('fetch', (event) => {
  const { request } = event;

  const url = new URL(request.url);

  // eslint-disable-next-line no-restricted-globals
  if (url.origin === location.origin) {
    event.respondWith(cacheFirst(request));
  } else {
    event.respondWith(networkFirst(request));
  }
});

async function cacheFirst(request) {
  const cached = await caches.match(request);

  return cached ?? await fetch(request);
}

async function networkFirst(request) {
  const cache = await caches.open(DYNAMIC_CACHE_NAME);
  try {
    const response = await fetch(request);
    await cache.put(request, response.clone());

    return response;
  } catch (e) {
    const cached = await cache.match(request);
    const fetchRequest = request.clone();

    return cached ?? await cacheFirst(fetchRequest);
  }
}
