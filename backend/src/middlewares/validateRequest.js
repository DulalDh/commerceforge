export const validateRequest = (schema) => (req, _res, next) => {
  const result = schema.safeParse({
    body: req.body,
    params: req.params,
    query: req.query
  });

  if (!result.success) {
    const error = new Error('Invalid request payload');
    error.statusCode = 400;
    error.details = result.error.flatten();
    return next(error);
  }

  req.validated = result.data;
  return next();
};
