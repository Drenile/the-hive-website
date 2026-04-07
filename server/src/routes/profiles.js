import { Router } from 'express';
import supabase from '../config/db.js';
import { requireAuth } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/rbac.js';
import { logAudit, AUDIT_ACTIONS, AUDIT_ENTITIES } from '../middleware/audit.js';
import { sanitizeText } from '../utils/sanitize.js';

const router = Router();

router.get('/me', requireAuth, async (req, res) => {
  res.json({ data: req.user });
});

router.patch('/me', requireAuth, async (req, res) => {
  try {
    const allowed = ['full_name', 'bio', 'avatar_url', 'linkedin_url', 'github_url', 'portfolio_url'];
    const updates = Object.fromEntries(
      Object.entries(req.body)
        .filter(([key]) => allowed.includes(key))
        .map(([key, value]) => [key, typeof value === 'string' ? sanitizeText(value) : value])
    );
    const { data, error } = await supabase
      .from('profiles').update(updates).eq('id', req.user.id).select().single();
    if (error) throw error;
    await logAudit({ user: req.user, action: AUDIT_ACTIONS.UPDATE, entityType: AUDIT_ENTITIES.PROFILE, entityId: req.user.id, newData: updates, req });
    res.json({ data });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

router.get('/', requireAuth, requireAdmin, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('profiles').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    res.json({ data });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch profiles' });
  }
});

router.patch('/:id/role', requireAuth, requireAdmin, async (req, res) => {
  try {
    const { role } = req.body;
    const validRoles = ['admin', 'member', 'mentor', 'partner'];
    if (!validRoles.includes(role)) return res.status(400).json({ error: 'Invalid role' });
    const { data: oldProfile } = await supabase.from('profiles').select('role, email').eq('id', req.params.id).single();
    const { data, error } = await supabase.from('profiles').update({ role }).eq('id', req.params.id).select().single();
    if (error) throw error;
    await logAudit({ user: req.user, action: AUDIT_ACTIONS.ROLE_CHANGE, entityType: AUDIT_ENTITIES.USER, entityId: req.params.id, oldData: { role: oldProfile?.role, email: oldProfile?.email }, newData: { role, email: oldProfile?.email }, req });
    res.json({ data });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update role' });
  }
});

router.delete('/me', requireAuth, async (req, res) => {
  try {
    const { error: profileError } = await supabase.from('profiles').delete().eq('id', req.user.id);
    if (profileError) throw profileError;
    const { error: authError } = await supabase.auth.admin.deleteUser(req.user.id);
    if (authError) throw authError;
    await logAudit({ user: req.user, action: 'DELETE', entityType: 'profile', entityId: req.user.id, req });
    res.json({ message: 'Account deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete account' });
  }
});

export default router;
