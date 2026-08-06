"use client";

import { useCallback, useSyncExternalStore } from "react";

function subscribe(query: string, callback: (e: MediaQueryListEvent) => void) {
  const mql = window.matchMedia(query);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getSnapshot(query: string) {
  return window.matchMedia(query).matches;
}

const empty = () => false;

/**
 * useMediaQuery — reactive matchMedia wrapper backed by useSyncExternalStore.
 * Tracks a media query across renders and SSR (defaults to false on the server).
 */
export function useMediaQuery(query: string): boolean {
  const matches = useCallback(() => getSnapshot(query), [query]);
  const onChange = useCallback(
    (cb: () => void) => subscribe(query, cb),
    [query]
  );

  return useSyncExternalStore(onChange, matches, empty);
}
