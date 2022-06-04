import brick from './images/brick.png';
import leaderboardSortButton from './images/leaderboard-sort-button.svg';
import modalGameOver from './images/modal-game-over.jpg';
import pause from './images/pause.png';
import somethingGoneWrong from './images/something-gone-wrong.png';
import mockProfilePicture from './images/mock-profile-picture.jpg';
import righteousFontWoff2 from './vendor/fonts/righteous-regular.woff2';
import righteousFontWoff from './vendor/fonts/righteous-regular.woff';
import playFontWoff2 from './vendor/fonts/play-regular.woff2';
import playFontWoff from './vendor/fonts/play-regular.woff';
import playBoldFontWoff2 from './vendor/fonts/play-700.woff2';
import playBoldFontWoff from './vendor/fonts/play-700.woff';
import badScriptFontWoff2 from './vendor/fonts/bad-script-regular.woff2';
import badScriptFontWoff from './vendor/fonts/bad-script-regular.woff';
import { ERoutes } from './utils/constants/routes';

const CACHE_NAME = 'app-v1';
const STATIC_CACHE_NAME = `s-${CACHE_NAME}`;
const DYNAMIC_CACHE_NAME = `d-${CACHE_NAME}`;

const staticURLs = [
  '/index.html',
  ERoutes.START,
  ERoutes.REGISTER,
  ERoutes.LOGIN,
  ERoutes.LOGOUT,
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
  mockProfilePicture,
  righteousFontWoff2,
  righteousFontWoff,
  playFontWoff2,
  playFontWoff,
  playBoldFontWoff2,
  playBoldFontWoff,
  badScriptFontWoff2,
  badScriptFontWoff
];

const dynamicURLs = [
  '/app.css',
  '/app.js',
  '/runtime.js'
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

async function cacheFirst(request: Request) {
  const cached = await caches.match(request);

  return cached ?? await fetch(request);
}

async function networkFirst(request: Request) {
  const cache = await caches.open(DYNAMIC_CACHE_NAME);
  try {
    const response = await fetch(request);

    if (request.method === 'GET') {
      await cache.put(request, response.clone());
    }

    return response;
  } catch (e) {
    const cached = await cache.match(request);

    return cached ?? await caches.match(ERoutes.OFFLINE);
  }
}
