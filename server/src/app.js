import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

dotenv.config();

import { validateEnv }    from './config/validateEnv.js';
import { corsOptions }    from './config/cors.js';
import { logger }         from './middleware/logger.js';
import eventsRouter       from './routes/events.js';
import articlesRouter     from './routes/articles.js';
import contactRouter      from './routes/contact.js';
import newsletterRouter   from './routes/newsletter.js';
import profilesRouter     from './routes/profiles.js';
import statsRouter        from './routes/stats.js';

validateEnv();

const app = express();

app.use(helmet());
app.use(cors(corsOptions));

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
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
