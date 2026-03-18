import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import supabase from '../config/db.js';
import { requireAuth } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/rbac.js';
import { validatePagination } from '../middleware/pagination.js';

const router = Router();

// GET /api/events — public
router.get('/', validatePagination, async (req, res) => {
  try {
    const { status, limit, offset } = req.query;
    let query = supabase
      .from('events')
      .select('*')
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

// GET /api/events/:id — public
router.get('/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', req.params.id)
      .single();
    if (error) return res.status(404).json({ error: 'Event not found' });
    res.json({ data });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch event' });
  }
});

// POST /api/events — admin only
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
      const { data, error } = await supabase
        .from('events')
        .insert({ ...req.body, created_by: req.user.id })
        .select()
        .single();
      if (error) throw error;
      res.status(201).json({ data });
    } catch (err) {
      res.status(500).json({ error: 'Failed to create event' });
    }
  }
);

// PATCH /api/events/:id — admin only
router.patch('/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('events')
      .update(req.body)
      .eq('id', req.params.id)
      .select()
      .single();
    if (error) throw error;
    res.json({ data });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update event' });
  }
});

// DELETE /api/events/:id — admin only
router.delete('/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', req.params.id);
    if (error) throw error;
    res.json({ message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete event' });
  }
});

export default router;
