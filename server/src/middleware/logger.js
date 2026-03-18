import morgan from 'morgan';

// Custom token for user ID
morgan.token('user-id', (req) => req.user?.id || 'anonymous');

// Dev format: colored, concise
const devFormat = ':method :url :status :response-time ms — :user-id';

// Production format: JSON for log aggregators
const prodFormat = JSON.stringify({
  method: ':method',
  url: ':url',
  status: ':status',
  responseTime: ':response-time ms',
  userId: ':user-id',
  ip: ':remote-addr',
  date: ':date[iso]',
});

export const logger = morgan(
  process.env.NODE_ENV === 'production' ? prodFormat : devFormat
);
