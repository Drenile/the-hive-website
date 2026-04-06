// Client-side sanitization utilities
// Note: React already escapes all rendered output preventing XSS
// These are additional hygiene measures

// Trim whitespace from all string fields in a form object
export const trimFormFields = (formObj) => {
  return Object.fromEntries(
    Object.entries(formObj).map(([key, value]) => [
      key,
      typeof value === 'string' ? value.trim() : value
    ])
  );
};

// Check if a string contains suspicious patterns
export const containsSuspiciousContent = (str) => {
  if (!str) return false;
  const patterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /data:text\/html/i,
  ];
  return patterns.some(p => p.test(str));
};
