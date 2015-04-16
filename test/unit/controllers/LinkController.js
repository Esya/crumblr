var request = require('supertest');

describe.only('LinksController', function() {
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
