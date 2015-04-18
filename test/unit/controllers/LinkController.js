var request = require('supertest');
var user1;

describe('LinkController', function() {
  before(function(done) {
    Link.create({
      shorturl: 'existing',
      target: 'http://www.google.com'
    },function(err) {
      if(err)
        throw err;
      else {
        done();
      }
    });
  });

  before(function(done) {
    user1 = request.agent(sails.hooks.http.app);
    user1
    .post('/auth/local')
    .send({ identifier: 'testuser1', password: 'testpassword1234' })
    .expect(302,done);
  });


  describe('#create()', function() {
    it('should require auth', function(done) {
      request(sails.hooks.http.app)
      .post('/link/create?shorturl=abcdef&target=example.com')
      .expect(403,done)
    });

    it('should create the link with auth', function(done) {
      user1
      .post('/link/create?shorturl=abcdef&target=example.com')
      .expect(201,done)
    });
  })

  describe('#redirect()', function() {
    it('should 404 with nonexisting link', function (done) {
      request(sails.hooks.http.app)
      .get('/1kGhU')
      .expect(404,done)
    });

    it('should create a hit and increase the hitcount', function(done) {
      request(sails.hooks.http.app)
      .get('/existing')
      .expect('Location','http://www.google.com')
      .expect(302,function() {
        Link.findOne({shorturl: 'existing'})
        .populate('hits')
        .exec(function(err,link) {
          if(err) {
            sails.log.error(err);
            throw err;
          }

          link.hitcount.should.be.equal(1);
          link.hits.length.should.be.equal(1);
          link.hits[0].ip.should.be.equal("127.0.0.1");
          done();
        });
      });
    });

    it('should redirect for existing link', function (done) {
      request(sails.hooks.http.app)
      .get('/existing')
      .expect('Location','http://www.google.com')
      .expect(302,done)
    });

  });


  after(function(done) {
    Link.destroy({shorturl: 'existing'},done);
  });
});
