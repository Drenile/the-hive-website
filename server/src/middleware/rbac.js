// Require a specific role or higher
export const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        error: 'Insufficient permissions',
        required: roles,
        current: req.user.role,
      });
    }
    next();
  };
};

// Shorthand helpers
export const requireAdmin   = requireRole('admin');
export const requireMember  = requireRole('admin', 'member');
export const requireMentor  = requireRole('admin', 'mentor');
export const requirePartner = requireRole('admin', 'partner');
