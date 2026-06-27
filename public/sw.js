// MaKonnect service worker — cache-first READS only.
//
// v1 offline strategy (PROJECT_DESCRIPTION / overview memory): cache-first for
// reads, NO write-queue or background sync. The app shell and visited pages are
// served from cache when offline; nothing is ever queued for later upload.

const CACHE = "makonnect-v1";
const APP_SHELL = [
  "/",
  "/directory",
  "/resources",
  "/manifest.webmanifest",
  "/icon.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Reads only — never intercept or queue writes.
  if (request.method !== "GET") return;

  // Only handle same-origin requests; let the browser fetch everything else.
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;

      return fetch(request)
        .then((response) => {
          // Cache successful same-origin responses for next time.
          if (response.ok && response.type === "basic") {
            const copy = response.clone();
            caches.open(CACHE).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => {
          // Offline and uncached: fall back to the app shell for navigations.
          if (request.mode === "navigate") {
            return caches.match("/");
          }
          return new Response("", { status: 504, statusText: "Offline" });
        });
    }),
  );
});
