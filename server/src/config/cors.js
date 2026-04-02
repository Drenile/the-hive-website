const allowedOrigins = [
  'https://thehivecommunity.ca',
  'https://www.thehivecommunity.ca',
  /https:\/\/.*\.vercel\.app$/,
  /https:\/\/.*\.railway\.app$/,
  /https:\/\/.*\.app\.github\.dev$/,
  'http://localhost:5173',
  'http://localhost:5174',
];

export const corsOptions = {
  origin: (origin, callback) => {
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
