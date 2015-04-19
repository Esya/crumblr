/**
 * LinkController
 *
 * @description :: Server-side logic for managing links
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

 module.exports = {
  me: function(req,res) {
    var user = req.session.passport.user;
    return res.json({
        username: user.username,
        email: user.email,
        is_admin: user.is_admin,
        is_active: user.is_active
    });
  }
};

