// Shared offline cache policy — SAFEGUARDING / PRIVACY (§2B, §3.10).
//
// Only LEARNING content (the Resources Hub) and neutral app CHROME / build
// assets may persist on a user's device. People & personal data (the directory
// roster, member profiles — which include individually-fetchable MINOR profiles)
// and operational data (campaigns) are NEVER written to the cache: they are
// fetched live and left on no device. This closes the shared-device exposure
// loop. Loaded by sw.js via importScripts and exercised by
// tests/offline-privacy.test.ts (single source of truth — do not fork the rule).
(function (scope) {
  scope.OFFLINE_CACHEABLE = function (pathname) {
    if (pathname === "/") return true; // app shell / landing (public + aggregate only)
    if (pathname === "/resources") return true; // learning hub index
    if (pathname.startsWith("/resources/")) return true; // learning articles
    if (pathname === "/manifest.webmanifest") return true;
    if (pathname === "/icon.svg") return true;
    if (pathname.startsWith("/_next/")) return true; // JS/CSS/font build assets — code, no PII
    // Everything else — /directory, /profile/*, /campaigns/*, any future API —
    // is people/personal/operational data and must never persist on-device.
    return false;
  };
})(typeof self !== "undefined" ? self : globalThis);
