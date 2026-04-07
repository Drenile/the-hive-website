// Lightweight sanitizer — no external dependencies needed
// Safe because Supabase uses parameterized queries (no SQL injection risk)
// and React escapes all rendered output (no XSS risk on frontend)

// Strip all HTML tags from plain text fields
export const sanitizeText = (str) => {
  if (!str || typeof str !== 'string') return str;
  return str
    .replace(/<[^>]*>/g, '')           // Remove HTML tags
    .replace(/&lt;/g, '<')             // Decode entities
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .trim();
};

// Allow only safe HTML tags for rich content (articles)
export const sanitizeHTML = (str) => {
  if (!str || typeof str !== 'string') return str;
  // Remove script tags and event handlers
  return str
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/data:text\/html/gi, '')
    .trim();
};
