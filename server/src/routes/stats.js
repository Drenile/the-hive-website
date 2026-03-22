import { Router } from 'express';
import supabase from '../config/db.js';

const router = Router();

// GET /api/stats — public, returns community stats
router.get('/', async (req, res) => {
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
