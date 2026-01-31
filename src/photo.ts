// Photos are in public/photos/ so they're copied as-is during build
// Load photos list - cached after first load
let photosCache: string[] | null = null;

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

// Get a random photo URL
export async function getRandomPhoto(): Promise<string> {
  const photos = await loadPhotos();
  if (photos.length === 0) {
    throw new Error('No photos found');
  }
  return photos[Math.floor(Math.random() * photos.length)];
}

