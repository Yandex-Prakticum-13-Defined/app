import brick from './img/brick.png';
import leaderboardSortButton from './img/leaderboard-sort-button.svg';
import modalGameOver from './img/modal-game-over.jpg';
import pause from './img/pause.png';
import somethingGoneWrong from './img/something-gone-wrong.png';
import righteousFontWoff2 from './vendor/fonts/righteous-regular.woff2';
import righteousFontWoff from './vendor/fonts/righteous-regular.woff';
import { ERoutes } from './utils/constants/routes';

const CACHE_NAME = 'app-v1';
const STATIC_CACHE_NAME = `s-${CACHE_NAME}`;
const DYNAMIC_CACHE_NAME = `d-${CACHE_NAME}`;

const staticURLs = [
  '/sw.js',
  '/index.html',
  ERoutes.START,
  ERoutes.REGISTER,
  ERoutes.LOGIN,
  ERoutes.GAME,
  ERoutes.LEADERBOARD,
  ERoutes.PROFILE,
  ERoutes.FORUM,
  ERoutes.ERROR_500,
  ERoutes.OFFLINE,
  brick,
  leaderboardSortButton,
  modalGameOver,
  pause,
  somethingGoneWrong,
  righteousFontWoff2,
  righteousFontWoff
];

const dynamicURLs = [
  '/app.css',
  '/app.js'
];

declare const self: ServiceWorkerGlobalScope;

self.addEventListener('install', async () => {
  const staticCache = await caches.open(STATIC_CACHE_NAME);
  await staticCache.addAll(staticURLs);

  const dynamicCache = await caches.open(DYNAMIC_CACHE_NAME);
  await dynamicCache.addAll(dynamicURLs);
});

self.addEventListener('activate', async () => {
  const cacheNames = await caches.keys();

  await Promise.all(
    cacheNames
      .filter((name) => name !== STATIC_CACHE_NAME)
      .filter((name) => name !== DYNAMIC_CACHE_NAME)
      .map((name) => caches.delete(name))
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  const url = new URL(request.url);

  const isDynamicUrl = dynamicURLs.some((dynamicURL) => request.url.endsWith(dynamicURL));
  // eslint-disable-next-line no-restricted-globals
  if (url.origin === location.origin && !isDynamicUrl) {
    event.respondWith(cacheFirst(request));
  } else {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    event.respondWith(networkFirst(request));
  }
});

async function cacheFirst(request: RequestInfo) {
  const cached = await caches.match(request);

  return cached ?? await fetch(request);
}

async function networkFirst(request: RequestInfo) {
  const cache = await caches.open(DYNAMIC_CACHE_NAME);
  try {
    const response = await fetch(request);
    await cache.put(request, response.clone());

    return response;
  } catch (e) {
    const cached = await cache.match(request);

    return cached ?? await caches.match(ERoutes.OFFLINE);
  }
}
