var Barrels = require('barrels');
var barrels = new Barrels();
var fixtures = barrels.data;

var q = require('q');
var Sails = require('sails'),
sails;

/**
 * Load fixtures sequentially
 * @param  {Function} done callback
 * @return {void}
 */
 var loadFixtures = function(done) {
  var fixtureOrder = ['user'];
  var result = q();

  fixtureOrder.forEach(function (f) {
    result = result.then(loadOneFixture.bind(null,f));
  });

  result.then(addPermissions)
  .then(function() {
    User.findOne({}).exec(function(err,user) {
      console.log(user);
    });
    sails.log.silly("Fixtures loaded");
    // done();
  }).fail(function(err) {
    sails.log.error("Failed loading fixtures",err);
  });
}

var addPermissions = function() {
  var d = q.defer();
  User.findOne({ username: 'tjwebb' })
  .then(function (user) {
    return Role.create({
      name: 'collaborator',
      users: [ user.id ]
    });
    .then(function (role) {
      d.resolve();
    })
    .catch(function (error) {
      console.error(error);
    });
    return d.promise;
  }

  var loadOneFixture = function(name) {
    var d = q.defer();
    barrels.populate([name],function(err) {
      if(err)
        d.reject(err);
      else
        console.log(name+" loaded");
      d.resolve();
    })
    return d.promise;
  }

  before(function(done) {
    Sails.lift({
    // configuration for testing purposes
  }, function(err, server) {
    sails = server;
    if (err) return done(err);

    // Load the fixtures
    loadFixtures(done);
  });
  });

  after(function(done) {
  // here you can clear fixtures, etc.
  sails.lower(done);
});
