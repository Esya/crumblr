module.exports = function(req, res, next) {
  if (req.session.passport.user.is_active) {
    return next();
  }

  return res.forbidden('Your account is not yet active.');
};
