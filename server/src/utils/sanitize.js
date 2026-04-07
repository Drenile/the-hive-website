import { JSDOM } from 'jsdom';
import DOMPurify from 'dompurify';

const window = new JSDOM('').window;
const purify = DOMPurify(window);

// Strip all HTML from plain text fields
export const sanitizeText = (str) => {
  if (!str) return str;
  return purify.sanitize(str, { ALLOWED_TAGS: [] }).trim();
};

// Allow safe HTML for rich content fields (articles)
export const sanitizeHTML = (str) => {
  if (!str) return str;
  return purify.sanitize(str, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'ul', 'ol', 'li', 'h2', 'h3', 'a', 'blockquote'],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
  }).trim();
};
