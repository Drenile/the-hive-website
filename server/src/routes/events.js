import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import supabase from '../config/db.js';
import { requireAuth } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/rbac.js';
import { validatePagination } from '../middleware/pagination.js';
import { logAudit, AUDIT_ACTIONS, AUDIT_ENTITIES } from '../middleware/audit.js';
import { sanitizeText } from '../utils/sanitize.js';

const router = Router();

router.get('/', validatePagination, async (req, res) => {
  try {
    const { status, limit, offset } = req.query;
    let query = supabase
      .from('events').select('*')
      .order('event_date', { ascending: false })
      .range(offset, offset + limit - 1);
    if (status) query = query.eq('status', status);
    const { data, error } = await query;
    if (error) throw error;
    res.json({ data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('events').select('*').eq('id', req.params.id).single();
    if (error) return res.status(404).json({ error: 'Event not found' });
    res.json({ data });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch event' });
  }
});

router.post('/',
  requireAuth, requireAdmin,
  [
    body('title').notEmpty().trim().isLength({ max: 200 }),
    body('event_date').isISO8601(),
    body('status').isIn(['upcoming', 'past', 'cancelled']),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
      const payload = {
        ...req.body,
        title:       sanitizeText(req.body.title),
        description: sanitizeText(req.body.description),
        location:    sanitizeText(req.body.location),
        created_by:  req.user.id,
      };
      const { data, error } = await supabase
        .from('events').insert(payload).select().single();
      if (error) throw error;
      await logAudit({ user: req.user, action: AUDIT_ACTIONS.CREATE, entityType: AUDIT_ENTITIES.EVENT, entityId: data.id, newData: data, req });
      res.status(201).json({ data });
    } catch (err) {
      res.status(500).json({ error: 'Failed to create event' });
    }
  }
);

router.patch('/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    const { data: oldData } = await supabase.from('events').select('*').eq('id', req.params.id).single();
    const payload = {
      ...req.body,
      title:       req.body.title       ? sanitizeText(req.body.title)       : undefined,
      description: req.body.description ? sanitizeText(req.body.description) : undefined,
      location:    req.body.location    ? sanitizeText(req.body.location)    : undefined,
    };
    const { data, error } = await supabase.from('events').update(payload).eq('id', req.params.id).select().single();
    if (error) throw error;
    await logAudit({ user: req.user, action: AUDIT_ACTIONS.UPDATE, entityType: AUDIT_ENTITIES.EVENT, entityId: data.id, oldData, newData: data, req });
    res.json({ data });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update event' });
  }
});

router.delete('/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    const { data: oldData } = await supabase.from('events').select('*').eq('id', req.params.id).single();
    const { error } = await supabase.from('events').delete().eq('id', req.params.id);
    if (error) throw error;
    await logAudit({ user: req.user, action: AUDIT_ACTIONS.DELETE, entityType: AUDIT_ENTITIES.EVENT, entityId: req.params.id, oldData, req });
    res.json({ message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete event' });
  }
});

export default router;
