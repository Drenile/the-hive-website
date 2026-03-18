import { Router } from 'express';
import supabase from '../config/db.js';
import { requireAuth } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/rbac.js';

const router = Router();

// GET /api/profiles/me — own profile
router.get('/me', requireAuth, async (req, res) => {
  res.json({ data: req.user });
});

// PATCH /api/profiles/me — update own profile
router.patch('/me', requireAuth, async (req, res) => {
  try {
    const allowed = ['full_name', 'bio', 'avatar_url', 'linkedin_url', 'github_url', 'portfolio_url'];
    const updates = Object.fromEntries(
      Object.entries(req.body).filter(([key]) => allowed.includes(key))
    );
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', req.user.id)
      .select()
      .single();
    if (error) throw error;
    res.json({ data });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// GET /api/profiles — admin only
router.get('/', requireAuth, requireAdmin, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    res.json({ data });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch profiles' });
  }
});

// PATCH /api/profiles/:id/role — admin only
router.patch('/:id/role', requireAuth, requireAdmin, async (req, res) => {
  try {
    const { role } = req.body;
    const validRoles = ['admin', 'member', 'mentor', 'partner'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }
    const { data, error } = await supabase
      .from('profiles')
      .update({ role })
      .eq('id', req.params.id)
      .select()
      .single();
    if (error) throw error;
    res.json({ data });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update role' });
  }
});

export default router;
