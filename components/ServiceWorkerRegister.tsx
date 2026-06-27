"use client";

import { useEffect } from "react";

/**
 * Registers the cache-first service worker (public/sw.js) for offline reads.
 * Production-only so the dev server isn't shadowed by a stale cache.
 */
export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (
      process.env.NODE_ENV !== "production" ||
      !("serviceWorker" in navigator)
    ) {
      return;
    }
    navigator.serviceWorker.register("/sw.js").catch(() => {
      // Registration is best-effort; the app works fine without it.
    });
  }, []);

  return null;
}
