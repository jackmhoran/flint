// Dynamically import all photos from assets/photos directory
const photoModules = import.meta.glob('/src/assets/photos/*', { eager: true }) as Record<string, { default: string }>

// Extract photo URLs from the imported modules
export const photos = Object.values(photoModules).map(module => module.default);

// Get a random photo URL
export function getRandomPhoto(): string {
  if (photos.length === 0) {
    throw new Error('No photos found in assets/photos directory');
  }
  return photos[Math.floor(Math.random() * photos.length)];
}

