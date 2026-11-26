export function readStorageJson<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeStorageJson<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* Ignore quota/private-mode storage restrictions */
  }
}

export function removeStorageKey(key: string): void {
  try {
    window.localStorage.removeItem(key);
  } catch {
    /* Ignore storage errors */
  }
}
