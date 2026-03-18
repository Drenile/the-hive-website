import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import supabase from '../config/db.js';
import { requireAuth } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/rbac.js';
import { formLimiter } from '../middleware/rateLimits.js';

const router = Router();

// POST /api/contact — public, strict rate limit
router.post('/',
  formLimiter,
  [
    body('name').notEmpty().trim().isLength({ max: 100 }),
    body('email').isEmail().normalizeEmail(),
    body('message').notEmpty().trim().isLength({ min: 10, max: 2000 }),
    body('reason').optional().trim().isLength({ max: 100 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
      const { name, email, reason, message } = req.body;
      const { error } = await supabase
        .from('contact_submissions')
        .insert({ name, email, reason, message });
      if (error) throw error;
      res.status(201).json({ message: 'Message sent successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to send message' });
    }
  }
);

// GET /api/contact — admin only
router.get('/', requireAuth, requireAdmin, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    res.json({ data });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch submissions' });
  }
});

// PATCH /api/contact/:id/read — admin only
router.patch('/:id/read', requireAuth, requireAdmin, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('contact_submissions')
      .update({ read: true })
      .eq('id', req.params.id)
      .select()
      .single();
    if (error) throw error;
    res.json({ data });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update submission' });
  }
});

export default router;
