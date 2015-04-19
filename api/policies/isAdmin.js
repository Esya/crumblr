module.exports = function(req, res, next) {
  if (req.session.passport.user.is_admin) {
    return next();
  }

  return res.forbidden("You don't have sufficient privileges");
};
