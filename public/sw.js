// MaKonnect service worker — NETWORK-FIRST reads, offline-capable.
//
// v1 offline goal (PROJECT_DESCRIPTION §3.10 / overview memory): the app stays
// readable offline, but the live server is ALWAYS preferred while online, so a
// new deploy is picked up immediately — no stale shell. Cache is a fallback,
// never the source of truth. Reads only: no write-queue or background sync.
//
// This replaces an earlier cache-first worker whose hard-coded cache key pinned
// returning visitors to an old shell forever. Bumping VERSION below purges that
// cache on activate, so already-stuck browsers self-heal on their next visit.

const VERSION = "v2";
const CACHE = `makonnect-${VERSION}`;
const APP_SHELL = [
  "/",
  "/directory",
  "/resources",
  "/campaigns",
  "/manifest.webmanifest",
  "/icon.svg",
];

self.addEventListener("install", (event) => {
  // Pre-cache the shell as an OFFLINE FALLBACK only, then take over at once.
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      // Delete every cache that isn't the current version — this is what clears
      // the old cache-first "makonnect-v1" shell that caused the staleness.
      const keys = await caches.keys();
      await Promise.all(
        keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)),
      );
      await self.clients.claim();

      // De-stick any tab still showing the old shell: reload it once so it pulls
      // the fresh build over the network. Safe from loops — activate only runs
      // when a new worker version takes over (i.e. on a deploy), not on reload.
      const windows = await self.clients.matchAll({ type: "window" });
      await Promise.all(
        windows.map((client) => {
          try {
            return client.navigate(client.url);
          } catch {
            return undefined;
          }
        }),
      );
    })(),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Reads only — never intercept or queue writes.
  if (request.method !== "GET") return;

  // Only handle same-origin requests; let the browser fetch everything else.
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Network-first: prefer the live server, refresh the cache, fall back to the
  // cache (then the app shell) only when the network is unavailable.
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok && response.type === "basic") {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put(request, copy));
        }
        return response;
      })
      .catch(async () => {
        const cached = await caches.match(request);
        if (cached) return cached;
        if (request.mode === "navigate") {
          const shell = await caches.match("/");
          if (shell) return shell;
        }
        return new Response("", { status: 504, statusText: "Offline" });
      }),
  );
});
