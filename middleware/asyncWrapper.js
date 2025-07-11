/**
 * Wraps an async route handler to catch errors and pass them to next()
 * @param {Function} asyncFn - The async route handler
 * @returns {Function}
 */
export default (asyncFn) => {
  return (req, res, next) => {
    asyncFn(req, res, next).catch((err) => {
      next(err);
    });
  };
};
