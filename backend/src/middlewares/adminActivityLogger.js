import { ROLES } from '../constants/roles.js';
import { AdminActivityLog } from '../models/AdminActivityLog.js';

const WRITE_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

export const adminActivityLogger = (req, res, next) => {
  if (!WRITE_METHODS.has(req.method)) return next();

  res.on('finish', () => {
    if (!req.user || req.user.role !== ROLES.ADMIN || res.statusCode >= 400) return;

    AdminActivityLog.create({
      admin: req.user.id,
      method: req.method,
      path: req.originalUrl,
      statusCode: res.statusCode,
      ip: req.ip,
      userAgent: req.get('user-agent'),
      metadata: {
        params: req.params,
        query: req.query
      }
    }).catch((error) => {
      console.error('Failed to write admin activity log:', error.message);
    });
  });

  return next();
};
