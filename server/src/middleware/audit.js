import supabase from '../config/db.js';

// Actions
export const AUDIT_ACTIONS = {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  LOGIN:  'LOGIN',
  LOGOUT: 'LOGOUT',
  ROLE_CHANGE: 'ROLE_CHANGE',
};

// Entity types
export const AUDIT_ENTITIES = {
  EVENT:    'event',
  ARTICLE:  'article',
  PROFILE:  'profile',
  CONTACT:  'contact',
  USER:     'user',
};

// Log an audit event
export const logAudit = async ({ user, action, entityType, entityId = null, oldData = null, newData = null, req = null }) => {
  try {
    await supabase.from('audit_logs').insert({
      user_id:     user?.id    || null,
      user_email:  user?.email || null,
      action,
      entity_type: entityType,
      entity_id:   entityId,
      old_data:    oldData,
      new_data:    newData,
      ip_address:  req?.ip || req?.headers?.['x-forwarded-for'] || null,
    });
  } catch (err) {
    // Never let audit logging break the main request
    console.error('Audit log failed:', err.message);
  }
};
