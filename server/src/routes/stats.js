import { Router } from 'express';
import supabase from '../config/db.js';
import { statsLimiter } from '../middleware/rateLimits.js';

const router = Router();

// GET /api/stats — public, rate limited
router.get('/', statsLimiter, async (req, res) => {
  try {
    const [profilesRes, eventsRes, projectsRes] = await Promise.all([
      supabase.from('profiles').select('id', { count: 'exact', head: true }),
      supabase.from('events').select('id', { count: 'exact', head: true }),
      supabase.from('projects').select('id', { count: 'exact', head: true }),
    ]);

    res.json({
      data: {
        members:  profilesRes.count || 0,
        events:   eventsRes.count   || 0,
        projects: projectsRes.count || 0,
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

export default router;
