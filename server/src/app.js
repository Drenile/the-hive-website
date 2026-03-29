import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

dotenv.config();

import { validateEnv }  from './config/validateEnv.js';
import { corsOptions }  from './config/cors.js';
import { logger }       from './middleware/logger.js';
import eventsRouter     from './routes/events.js';
import articlesRouter   from './routes/articles.js';
import contactRouter    from './routes/contact.js';
import newsletterRouter from './routes/newsletter.js';
import profilesRouter   from './routes/profiles.js';
import statsRouter      from './routes/stats.js';
import auditLogsRouter  from './routes/auditLogs.js';

validateEnv();

const app = express();

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc:  ["'self'"],
      scriptSrc:   ["'self'", "'unsafe-inline'"],
      styleSrc:    ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc:     ["'self'", "https://fonts.gstatic.com"],
      imgSrc:      ["'self'", "data:", "blob:", "https://*.supabase.co"],
      connectSrc:  ["'self'", "https://*.supabase.co", "https://*.app.github.dev"],
      frameSrc:    ["'none'"],
      objectSrc:   ["'none'"],
    },
  },
  crossOriginEmbedderPolicy: false,
}));

app.use(cors(corsOptions));

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: process.env.NODE_ENV === 'production' ? 100 : 1000,
  message: { error: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => process.env.NODE_ENV === 'development',
});
app.use('/api', globalLimiter);

app.use(logger);
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'The Hive API is running' });
});

app.use('/api/events',     eventsRouter);
app.use('/api/articles',   articlesRouter);
app.use('/api/contact',    contactRouter);
app.use('/api/newsletter', newsletterRouter);
app.use('/api/profiles',   profilesRouter);
app.use('/api/stats',      statsRouter);
app.use('/api/audit-logs', auditLogsRouter);

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : err.message,
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

export default app;
