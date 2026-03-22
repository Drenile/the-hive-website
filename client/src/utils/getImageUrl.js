// Handles both Supabase Storage URLs and local asset filenames
export const getImageUrl = (url) => {
  if (!url) return null;

  // Already a full URL (Supabase Storage)
  if (url.startsWith('http')) return url;

  // Local asset filename
  try {
    return new URL(`../assets/${url}`, import.meta.url).href;
  } catch {
    return null;
  }
};
