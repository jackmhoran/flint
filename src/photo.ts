// Photos are in public/photos/ so they're copied as-is during build
let photosCache: string[] | null = null;
const STORAGE_KEY = 'flint_shown_photos';

function getShownPhotos(): Set<string> {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    return stored ? new Set(JSON.parse(stored)) : new Set();
  } catch {
    return new Set();
  }
}

function saveShownPhotos(shown: Set<string>): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(shown)));
  } catch {
    // Ignore storage errors
  }
}

async function loadPhotos(): Promise<string[]> {
  if (photosCache) return photosCache;
  
  try {
    const response = await fetch('/photos.json');
    const filenames: string[] = await response.json();
    photosCache = filenames.map(filename => `/photos/${encodeURIComponent(filename)}`);
    return photosCache;
  } catch (e) {
    console.error('Failed to load photos list:', e);
    return [];
  }
}

// Get a random photo URL that hasn't been shown yet
export async function getRandomPhoto(): Promise<string> {
  const allPhotos = await loadPhotos();
  if (allPhotos.length === 0) {
    throw new Error('No photos found');
  }
  
  let shownPhotos = getShownPhotos();
  let availablePhotos = allPhotos.filter(photo => !shownPhotos.has(photo));
  
  // If all photos have been shown, reset
  if (availablePhotos.length === 0) {
    shownPhotos = new Set();
    availablePhotos = allPhotos;
  }
  
  // Pick random photo and mark as shown
  const randomPhoto = availablePhotos[Math.floor(Math.random() * availablePhotos.length)];
  shownPhotos.add(randomPhoto);
  saveShownPhotos(shownPhotos);
  
  return randomPhoto;
}

