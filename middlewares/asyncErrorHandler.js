module.exports = (fn) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
