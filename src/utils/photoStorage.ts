export interface CustomPhotoEntry {
  url?: string;
  beforeUrl?: string;
  source?: 'default' | 'uploaded' | 'url' | 'alternative';
}

const STORAGE_KEY = 'estudio_piel_custom_photos_v4';
const LISTENERS = new Set<() => void>();

// In-memory cache ensures changes always reflect immediately in React,
// even if localStorage quota is exceeded or disabled.
let inMemoryStore: Record<string, CustomPhotoEntry> = {};

// Clean any legacy storage versions
['estudio_piel_custom_photos_v1', 'estudio_piel_custom_photos_v2', 'estudio_piel_custom_photos_v3'].forEach((k) => {
  try {
    localStorage.removeItem(k);
  } catch {}
});

// Initialize from localStorage
try {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    inMemoryStore = JSON.parse(raw);
  }
} catch (e) {
  console.warn('Could not read photos from localStorage', e);
}

export const getCustomPhotos = (): Record<string, CustomPhotoEntry> => {
  return { ...inMemoryStore };
};

/**
 * Compresses an image file on an off-screen HTML5 canvas to keep size under ~100-200KB,
 * preventing localStorage quota exceptions and improving performance.
 */
export const compressImageFile = (
  file: File,
  maxDimension = 1200,
  quality = 0.82
): Promise<string> => {
  return new Promise((resolve) => {
    // If not a standard browser image, fallback to standard FileReader
    if (!file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = () => resolve('');
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const rawDataUrl = e.target?.result as string;
      const img = new Image();

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          resolve(rawDataUrl);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        try {
          const compressed = canvas.toDataURL('image/jpeg', quality);
          resolve(compressed);
        } catch {
          resolve(rawDataUrl);
        }
      };

      img.onerror = () => {
        resolve(rawDataUrl);
      };

      img.src = rawDataUrl;
    };

    reader.onerror = () => resolve('');
    reader.readAsDataURL(file);
  });
};

export const saveCustomPhoto = (
  id: string,
  url: string,
  isBefore: boolean = false,
  source: 'uploaded' | 'url' | 'alternative' = 'uploaded'
) => {
  const existing = inMemoryStore[id] || {};
  const updated = isBefore
    ? { ...existing, beforeUrl: url, source }
    : { ...existing, url, source };

  inMemoryStore[id] = updated;

  // Persist to localStorage if possible
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(inMemoryStore));
  } catch (err) {
    console.warn('LocalStorage quota limit reached, maintaining in memory store', err);
  }

  // ALWAYS notify listeners
  LISTENERS.forEach((cb) => {
    try {
      cb();
    } catch {}
  });
};

export const resetCustomPhoto = (id: string, isBefore: boolean = false) => {
  const existing = inMemoryStore[id];
  if (!existing) return;

  const updated = { ...existing };
  if (isBefore) {
    delete updated.beforeUrl;
  } else {
    delete updated.url;
  }

  if (!updated.url && !updated.beforeUrl) {
    delete inMemoryStore[id];
  } else {
    inMemoryStore[id] = updated;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(inMemoryStore));
  } catch (err) {
    console.warn('Could not update localStorage on reset', err);
  }

  LISTENERS.forEach((cb) => {
    try {
      cb();
    } catch {}
  });
};

export const resetAllCustomPhotos = () => {
  inMemoryStore = {};
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
  LISTENERS.forEach((cb) => {
    try {
      cb();
    } catch {}
  });
};

export const subscribeToPhotoChanges = (callback: () => void) => {
  LISTENERS.add(callback);
  return () => {
    LISTENERS.delete(callback);
  };
};
