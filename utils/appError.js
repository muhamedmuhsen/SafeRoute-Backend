/**
 * Factory function to create an AppError
 * @param {string} message - Error message
 * @param {number} code - HTTP status code
 * @param {string} text - Status text
 * @returns {Error}
 */
function createAppError(message, code, text) {
  const err = new Error(message);
  err.code = code;
  err.text = text;
  return err;
}

export default { create: createAppError };
