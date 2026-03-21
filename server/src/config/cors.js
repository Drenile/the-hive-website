const allowedOrigins = [
  // Production — add your real domain here when deploying
  // 'https://thehive.com',

  // Development — Codespaces pattern
  /https:\/\/.*\.app\.github\.dev$/,

  // Local development
  'http://localhost:5173',
  'http://localhost:5174',
];

export const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (curl, Postman, mobile apps)
    if (!origin) return callback(null, true);

    const allowed = allowedOrigins.some(o =>
      typeof o === 'string' ? o === origin : o.test(origin)
    );

    if (allowed) {
      callback(null, true);
    } else {
      callback(new Error(`CORS blocked: ${origin}`));
    }
  },
  credentials: true,
};
