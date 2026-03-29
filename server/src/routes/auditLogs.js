import { Router } from 'express';
import supabase from '../config/db.js';
import { requireAuth } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/rbac.js';
import { validatePagination } from '../middleware/pagination.js';

const router = Router();

// GET /api/audit-logs — admin only
router.get('/', requireAuth, requireAdmin, validatePagination, async (req, res) => {
  try {
    const { entity_type, action, limit, offset } = req.query;

    let query = supabase
      .from('audit_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (entity_type) query = query.eq('entity_type', entity_type);
    if (action)      query = query.eq('action', action);

    const { data, error } = await query;
    if (error) throw error;
    res.json({ data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch audit logs' });
  }
});

export default router;
