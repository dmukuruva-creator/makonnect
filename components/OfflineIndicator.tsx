"use client";

import { useEffect, useState } from "react";

/**
 * Visible offline indicator (§3.10) — the real Zimbabwe value-prop made obvious.
 * The network-first service worker still serves saved pages from cache; this
 * just tells the user why writes (posting, giving) won't go through right now.
 */
export default function OfflineIndicator() {
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    const update = () => setOffline(!navigator.onLine);
    update();
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);

  if (!offline) return null;

  return (
    <div
      role="status"
      className="fixed inset-x-0 bottom-0 z-50 bg-secondary px-4 py-2.5 text-center text-sm font-semibold text-bg shadow-lift"
    >
      📴 You&apos;re offline — showing saved pages. Connecting and giving need a
      connection.
    </div>
  );
}
