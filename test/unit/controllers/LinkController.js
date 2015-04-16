var request = require('supertest');

describe('LinksController', function() {
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

  describe('#create()', function() {
    it('should require auth', function(done) {
      request(sails.hooks.http.app)
      .post('/link/create?shorturl=abcdef&targeturl=example.com')
      .expect(403,done)
    });

    it('should create the link with auth', function(done) {
      request(sails.hooks.http.app)
      .post('/link/create?shorturl=abcdef&targeturl=example.com')
      .set("Authorization", "basic " + new Buffer("testuser1:testpassword1").toString("base64"))
      .expect(200,done)
    });
  })

  describe('#redirect()', function() {
    it('should 404 with nonexisting link', function (done) {
      request(sails.hooks.http.app)
      .get('/1kGhU')
      .expect(404,done)
    });

    it('should create a hit', function(done) {
      request(sails.hooks.http.app)
      .get('/existing')
      .expect('Location','http://www.google.com')
      .expect(302,function() {
        Link.findOne({shorturl: 'existing'})
        .populate('hits')
        .exec(function(err,link) {
          if(err) {
            console.log(err);
            throw err;
          }

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
