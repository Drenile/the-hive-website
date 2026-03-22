import supabase from './supabase';

const BUCKET = 'hive-assets';

// Upload a file and return the public URL
export const uploadImage = async (file, folder = 'general') => {
  // Validate file type
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Invalid file type. Only JPEG, PNG, WebP and GIF are allowed.');
  }

  // Validate file size — max 5MB
  const MAX_SIZE = 5 * 1024 * 1024;
  if (file.size > MAX_SIZE) {
    throw new Error('File too large. Maximum size is 5MB.');
  }

  // Generate unique filename
  const ext      = file.name.split('.').pop();
  const filename = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(filename, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) throw error;

  // Get public URL
  const { data } = supabase.storage
    .from(BUCKET)
    .getPublicUrl(filename);

  return data.publicUrl;
};

// Delete an image by its public URL
export const deleteImage = async (publicUrl) => {
  const path = publicUrl.split(`${BUCKET}/`)[1];
  if (!path) throw new Error('Invalid image URL');

  const { error } = await supabase.storage
    .from(BUCKET)
    .remove([path]);

  if (error) throw error;
};
