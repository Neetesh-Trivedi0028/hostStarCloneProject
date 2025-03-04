export const setLanguage = (req, res, next) => {
  res.locals.__ = req.__;
  next();
};
