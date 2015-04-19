var request = require('supertest');
var user1;

describe('UserController', function() {

  it.skip("should require is_admin for CRUD methods");

  before(function(done) {
    user1 = request.agent(sails.hooks.http.app);
    user1
    .post('/auth/local')
    .send({ identifier: 'testuser1', password: 'testpassword1234' })
    .expect(302,done);
  });
  describe("#me",function() {
    it("should 401 if the user is not logged in",function(done) {
      request(sails.hooks.http.app)
      .get('/me')
      .expect(401,done)
    });

    it("should return the user's details",function(done) {
      user1
      .get('/me')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res){
        if (err) return done(err);
        var user = res.body;

        user.username.should.be.equal("testuser1");
        user.is_admin.should.be.falsy;
        user.is_active.should.be.truthy;
        user.email.should.be.equal("testuser1@example.com");

        Object.keys(user).length.should.be.equal(4);

        done();
      });
    });
  });
  describe("#edit", function() {
    it.skip("should allow the user to edit his profile");
  });

});
