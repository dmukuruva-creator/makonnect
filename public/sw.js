// MaKonnect service worker — NETWORK-FIRST reads, offline-capable, privacy-scoped.
//
// v1 offline goal (PROJECT_DESCRIPTION §3.10 / overview memory): the app stays
// readable offline, but the live server is ALWAYS preferred while online, so a
// new deploy is picked up immediately — no stale shell. Cache is a fallback,
// never the source of truth. Reads only: no write-queue or background sync.
//
// SAFEGUARDING (§2B): only LEARNING content + neutral app chrome/build assets
// may persist on-device. People & personal data (directory, profiles incl.
// minors) and operational data (campaigns) are NEVER written to the cache — see
// offline-cache-policy.js. Bumping VERSION purges any cache an older worker
// wrote (incl. profiles cached by the v2 cache-everything worker) on activate.
importScripts("/offline-cache-policy.js");

const VERSION = "v3";
const CACHE = `makonnect-${VERSION}`;
// Pre-cache learning content + chrome only — never the directory/profiles/campaigns.
const APP_SHELL = ["/", "/resources", "/manifest.webmanifest", "/icon.svg"];

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
      // Delete every cache that isn't the current version. This purges anything
      // an older worker stored — including personal pages the v2 worker cached.
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

  // PRIVACY GATE: only learning content + chrome may ever touch the cache.
  const cacheable = self.OFFLINE_CACHEABLE(url.pathname);

  // Network-first. Cacheable responses are stored for offline reads; everything
  // else (directory, profiles, campaigns) is fetched live and never persisted.
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (cacheable && response.ok && response.type === "basic") {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put(request, copy));
        }
        return response;
      })
      .catch(async () => {
        if (cacheable) {
          const cached = await caches.match(request);
          if (cached) return cached;
        }
        // Offline on a non-cached page: fall back to the neutral app shell —
        // never serve a stale personal page from disk.
        if (request.mode === "navigate") {
          const shell = await caches.match("/");
          if (shell) return shell;
        }
        return new Response("", { status: 504, statusText: "Offline" });
      }),
  );
});
