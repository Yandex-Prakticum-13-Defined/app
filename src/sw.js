import brick from './img/brick.png';
import registerFon from './img/register_fon.png';
import leaderboardFon from './img/leaderboard-background.png';

// import leaderboardSort from './img/leaderboard-sort-button.svg';
// @ts-ignore
// import modalGameOver from './img/modal-game-over.jpg';
import pause from './img/pause.png';
import goneWrong from './img/something-gone-wrong.png';

// type TConfig = {
//   onSuccess?: (registration: ServiceWorkerRegistration) => void;
//   onUpdate?: (registration: ServiceWorkerRegistration) => void;
// };

const CACHE_NAME = 'app-v2';
const STATIC_CACHE_NAME = `s-${CACHE_NAME}`;
const DYNAMIC_CACHE_NAME = `d-${CACHE_NAME}`;

const URLS = [
  '/',
  '/sw.js',
  '/app.css',
  '/app.js',
  '/index.html',
  '/game',
  '/forum',
  '/register',
  '/leaderboard',
  '/login',
  '/profile',
  '/Error404',
  '/Error500',
  '/offline',
  brick,
  registerFon,
  leaderboardFon,
  // './img/leaderboard-sort-button.svg',
  // leaderboardSort,
  // modalGameOver,
  pause,
  goneWrong,
  // './img/modal-game-over.jpg'
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
    // return cached ? await cacheFirst(fetchRequest) : caches.match('/offline');
  }
}
