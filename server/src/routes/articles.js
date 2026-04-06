import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import supabase from '../config/db.js';
import { requireAuth, optionalAuth } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/rbac.js';
import { validatePagination } from '../middleware/pagination.js';
import { logAudit, AUDIT_ACTIONS, AUDIT_ENTITIES } from '../middleware/audit.js';
import { sanitizeText, sanitizeHTML } from '../utils/sanitize.js';

const router = Router();

// GET /api/articles — public
router.get('/', optionalAuth, validatePagination, async (req, res) => {
  try {
    const { tag, limit, offset } = req.query;
    const isAdmin = req.user?.role === 'admin';
    let query = supabase
      .from('articles')
      .select('*, profiles(full_name, avatar_url)')
      .order('published_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (!isAdmin) query = query.eq('published', true);
    if (tag) query = query.eq('tag', tag);
    const { data, error } = await query;
    if (error) throw error;
    res.json({ data });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
});

// GET /api/articles/:id — public
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const isAdmin = req.user?.role === 'admin';
    let query = supabase
      .from('articles')
      .select('*, profiles(full_name, avatar_url)')
      .eq('id', req.params.id).single();
    if (!isAdmin) query = query.eq('published', true);
    const { data, error } = await query;
    if (error) return res.status(404).json({ error: 'Article not found' });
    res.json({ data });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch article' });
  }
});

// POST /api/articles — admin only
router.post('/',
  requireAuth, requireAdmin,
  [
    body('title').notEmpty().trim().isLength({ max: 200 }),
    body('tag').isIn(['spotlight', 'event', 'resource']),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
      const payload = {
        title:   req.body.title   ? sanitizeText(req.body.title)   : undefined,
        excerpt: req.body.excerpt ? sanitizeText(req.body.excerpt) : undefined,
        content: req.body.content ? sanitizeHTML(req.body.content) : undefined,
        ...req.body,
        author_id:    req.user.id,
        published_at: req.body.published ? new Date().toISOString() : null,
      };
      const { data, error } = await supabase
        .from('articles').insert(payload).select().single();
      if (error) throw error;

      await logAudit({
        user:       req.user,
        action:     AUDIT_ACTIONS.CREATE,
        entityType: AUDIT_ENTITIES.ARTICLE,
        entityId:   data.id,
        newData:    data,
        req,
      });

      res.status(201).json({ data });
    } catch (err) {
      res.status(500).json({ error: 'Failed to create article' });
    }
  }
);

// PATCH /api/articles/:id — admin only
router.patch('/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    const { data: oldData } = await supabase
      .from('articles').select('*').eq('id', req.params.id).single();

    const payload = {
        title:   req.body.title   ? sanitizeText(req.body.title)   : undefined,
        excerpt: req.body.excerpt ? sanitizeText(req.body.excerpt) : undefined,
        content: req.body.content ? sanitizeHTML(req.body.content) : undefined, ...req.body };
    if (req.body.published) payload.published_at = new Date().toISOString();

    const { data, error } = await supabase
      .from('articles').update(payload).eq('id', req.params.id).select().single();
    if (error) throw error;

    await logAudit({
      user:       req.user,
      action:     AUDIT_ACTIONS.UPDATE,
      entityType: AUDIT_ENTITIES.ARTICLE,
      entityId:   data.id,
      oldData,
      newData:    data,
      req,
    });

    res.json({ data });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update article' });
  }
});

// DELETE /api/articles/:id — admin only
router.delete('/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    const { data: oldData } = await supabase
      .from('articles').select('*').eq('id', req.params.id).single();

    const { error } = await supabase.from('articles').delete().eq('id', req.params.id);
    if (error) throw error;

    await logAudit({
      user:       req.user,
      action:     AUDIT_ACTIONS.DELETE,
      entityType: AUDIT_ENTITIES.ARTICLE,
      entityId:   req.params.id,
      oldData,
      req,
    });

    res.json({ message: 'Article deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete article' });
  }
});

export default router;
