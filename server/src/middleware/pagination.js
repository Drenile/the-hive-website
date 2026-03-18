export const validatePagination = (req, res, next) => {
  let { limit = 20, offset = 0 } = req.query;

  limit  = parseInt(limit);
  offset = parseInt(offset);

  if (isNaN(limit) || limit < 1)   limit  = 20;
  if (isNaN(offset) || offset < 0) offset = 0;
  if (limit > 100) limit = 100; // max 100 per request

  req.query.limit  = limit;
  req.query.offset = offset;

  next();
};
