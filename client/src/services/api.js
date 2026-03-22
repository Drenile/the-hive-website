// api.js — all API calls to the Express backend go through here

const BASE_URL = import.meta.env.VITE_API_URL;

// Get auth token from Supabase session
const getToken = async () => {
  const { createClient } = await import('@supabase/supabase-js');
  const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
  );
  const { data: { session } } = await supabase.auth.getSession();
  return session?.access_token || null;
};

// Base fetch wrapper
const apiFetch = async (endpoint, options = {}, requireAuth = false) => {
  const headers = { 'Content-Type': 'application/json', ...options.headers };

  if (requireAuth) {
    const token = await getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });
  const data = await res.json();

  if (!res.ok) throw { status: res.status, ...data };
  return data;
};

// ─── Contact ──────────────────────────────────────────
export const submitContact = (form) =>
  apiFetch('/contact', {
    method: 'POST',
    body: JSON.stringify(form),
  });

// ─── Newsletter ───────────────────────────────────────
export const subscribeNewsletter = (email) =>
  apiFetch('/newsletter', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });

// ─── Events ───────────────────────────────────────────
export const getEvents = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return apiFetch(`/events${query ? `?${query}` : ''}`);
};

export const getEvent = (id) => apiFetch(`/events/${id}`);

export const createEvent = (data) =>
  apiFetch('/events', { method: 'POST', body: JSON.stringify(data) }, true);

export const updateEvent = (id, data) =>
  apiFetch(`/events/${id}`, { method: 'PATCH', body: JSON.stringify(data) }, true);

export const deleteEvent = (id) =>
  apiFetch(`/events/${id}`, { method: 'DELETE' }, true);

// ─── Articles ─────────────────────────────────────────
export const getArticles = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return apiFetch(`/articles${query ? `?${query}` : ''}`);
};

export const getArticle = (id) => apiFetch(`/articles/${id}`);

export const createArticle = (data) =>
  apiFetch('/articles', { method: 'POST', body: JSON.stringify(data) }, true);

export const updateArticle = (id, data) =>
  apiFetch(`/articles/${id}`, { method: 'PATCH', body: JSON.stringify(data) }, true);

export const deleteArticle = (id) =>
  apiFetch(`/articles/${id}`, { method: 'DELETE' }, true);

// ─── Profiles ─────────────────────────────────────────
export const getMyProfile = () => apiFetch('/profiles/me', {}, true);

export const updateMyProfile = (data) =>
  apiFetch('/profiles/me', { method: 'PATCH', body: JSON.stringify(data) }, true);

export const getAllProfiles = () => apiFetch('/profiles', {}, true);

export const updateUserRole = (id, role) =>
  apiFetch(`/profiles/${id}/role`, { method: 'PATCH', body: JSON.stringify({ role }) }, true);
