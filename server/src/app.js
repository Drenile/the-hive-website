import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

dotenv.config();

import { validateEnv } from './config/validateEnv.js';
import { corsOptions } from './config/cors.js';
import { logger } from './middleware/logger.js';
import eventsRouter     from './routes/events.js';
import articlesRouter   from './routes/articles.js';
import contactRouter    from './routes/contact.js';
import newsletterRouter from './routes/newsletter.js';
import profilesRouter   from './routes/profiles.js';

validateEnv();

const app = express();

// ─── Security Middleware ───────────────────────────────
app.use(helmet());
app.use(cors(corsOptions));

// Global rate limiter
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', globalLimiter);

// ─── Logging ──────────────────────────────────────────
app.use(logger);

// ─── Body Parsing ─────────────────────────────────────
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// ─── Routes ───────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'The Hive API is running' });
});

app.use('/api/events',     eventsRouter);
app.use('/api/articles',   articlesRouter);
app.use('/api/contact',    contactRouter);
app.use('/api/newsletter', newsletterRouter);
app.use('/api/profiles',   profilesRouter);

// ─── 404 Handler ──────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ─── Global Error Handler ─────────────────────────────
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
