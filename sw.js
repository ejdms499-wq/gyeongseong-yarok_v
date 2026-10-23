/* =========================================================
   경성야록 서비스 워커 (Service Worker) - PWA & 캐시 정비
   버전: 20261019
   전략: HTML/JS/CSS 네트워크 우선(Network-First, fallback to Cache)
   ========================================================= */

const CACHE_NAME = 'gsyr-pwa-20261020-v9';

const PRECACHE_ASSETS = [
  './index.html',
  './opening.html',
  './manifest.json',
  './shared/case-navigator.css?v=20261020',
  './shared/case-navigator.js?v=20261020',
  './shared/icons/icon-192.png',
  './shared/icons/icon-512.png'
];

// 설치 단계: 핵심 에셋 프리캐싱
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(PRECACHE_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// 활성화 단계: 구버전 캐시(gsyr-pwa-v1 등) 자동 일괄 정리
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key.startsWith('gsyr-pwa-') && key !== CACHE_NAME).map(key => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// 페치 이벤트: HTML 및 JS/CSS는 최신 반영을 위해 네트워크 우선, 실패 시 캐시 폴백
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // 식자실 3D 게임은 독립 스코프(/sikjasil/) 서비스워커(game-pwa-sw.js)가 전담하므로 간섭하지 않음
  if (url.pathname.includes('/sikjasil/')) return;

  const isHtml = req.headers.get('accept') && req.headers.get('accept').includes('text/html');
  const isCode = url.pathname.endsWith('.js') || url.pathname.endsWith('.css') || url.search.includes('v=');

  // 1. HTML 및 스크립트/스타일(JS/CSS): 네트워크 우선(Network-First) 전략
  // 파일 수정 시 브라우저 새로고침만으로 즉시 최신본이 적용되도록 보장
  if (isHtml || isCode) {
    event.respondWith(
      fetch(req).then(res => {
        if (res && res.status === 200) {
          const copy = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
        }
        return res;
      }).catch(() => {
        // 네트워크 실패 시에만 캐시 폴백
        return caches.match(req).then(cached => {
          if (cached) return cached;
          if (isHtml) return caches.match('./index.html');
          return Response.error();
        });
      })
    );
    return;
  }

  // 2. 기타 정적 미디어(이미지, 폰트, 사운드): 캐시 우선(Cache-First) 후 백그라운드 갱신
  event.respondWith(
    caches.match(req).then(cached => {
      if (cached) return cached;
      return fetch(req).then(res => {
        if (!res || res.status !== 200 || (res.type !== 'basic' && res.type !== 'cors')) {
          return res;
        }
        const copy = res.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
        return res;
      }).catch(() => {
        return Response.error();
      });
    })
  );
});
