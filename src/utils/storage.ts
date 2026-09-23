export function getFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) return defaultValue;
    return JSON.parse(item) as T;
  } catch (error) {
    console.warn(`Error reading localStorage key "${key}":`, error);
    return defaultValue;
  }
}

export function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Error saving to localStorage key "${key}":`, error);
  }
}

/**
 * Trigger immediate real file download in the browser using Blob.
 */
export function downloadFile(filename: string, content: string, mimeType: string = 'text/plain;charset=utf-8'): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

/**
 * Visitor counter helper
 */
export interface VisitorStats {
  online: number;
  today: number;
  month: number;
  total: number;
}

export function getVisitorStats(): VisitorStats {
  const stored = getFromStorage<VisitorStats>('sdn305_visitor_stats', {
    online: 14,
    today: 92,
    month: 1435,
    total: 12876
  });

  // Increment total and today by 1 per session
  const sessionKey = 'sdn305_visited_session';
  if (!sessionStorage.getItem(sessionKey)) {
    sessionStorage.setItem(sessionKey, 'true');
    const updated = {
      online: Math.floor(Math.random() * 8) + 12,
      today: stored.today + 1,
      month: stored.month + 1,
      total: stored.total + 1
    };
    saveToStorage('sdn305_visitor_stats', updated);
    return updated;
  }

  return stored;
}
