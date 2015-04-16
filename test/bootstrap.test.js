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
  var fixtureOrder = ['user','passport'];
  var result = q();

  fixtureOrder.forEach(function (f) {
    result = result.then(loadOneFixture.bind(null,f));
  });

  result
  .then(function() {
    sails.log.silly("Fixtures loaded");
    done();
  }).fail(function(err) {
    sails.log.error("Failed loading fixtures",err);
  });
}

var loadOneFixture = function(model) {
  var d = q.defer();
  barrels.populate([model], function(err) {
    if(err)
      d.reject(err);
    else {
      d.resolve();
    }
  },false);
  return d.promise;
}

before(function(done) {
  Sails.lift({
    // configuration for testing purposes
  }, function(err, server) {
    sails = server;
    if (err) return done(err);
    // done(err,sails);
    // Load the fixtures
    loadFixtures(done);
  });
});

after(function(done) {
  // here you can clear fixtures, etc.
  sails.lower(done);
});
