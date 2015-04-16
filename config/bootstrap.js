/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  sails.services.passport.loadStrategies();
  User.find({is_admin: true}).exec(function(err, adminUser) {
    if (adminUser && adminUser.length > 0) { return cb(); }
    User.create({username: 'admin', is_active: true, is_admin: true}).exec(function(err,user) {
      if(err) {
        sails.log.error("Could not create first admin user",err);
      }

      user.passports.add({
        'protocol': 'local',
        'provider': 'local',
        'password': 'admin1234'
      });

      user.save(function(err) {
        if(err) {
          sails.log.error("Could not add passport-local auth to the first admin",err);
        }

        sails.log.info("Created the first user admin/admin1234");
        cb();
      })
    });
  });
};
