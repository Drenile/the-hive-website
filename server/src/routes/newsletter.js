import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import supabase from '../config/db.js';
import { requireAuth } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/rbac.js';
import { formLimiter } from '../middleware/rateLimits.js';

const router = Router();

// POST /api/newsletter — public, strict rate limit
router.post('/',
  formLimiter,
  [body('email').isEmail().normalizeEmail()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .upsert({ email: req.body.email, subscribed: true }, { onConflict: 'email' });
      if (error) throw error;
      res.status(201).json({ message: 'Subscribed successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to subscribe' });
    }
  }
);

// GET /api/newsletter — admin only
router.get('/', requireAuth, requireAdmin, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .select('*')
      .eq('subscribed', true)
      .order('created_at', { ascending: false });
    if (error) throw error;
    res.json({ data });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch subscribers' });
  }
});

export default router;
