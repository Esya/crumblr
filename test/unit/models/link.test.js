describe('LinkModel', function() {

  describe('#save()', function() {
    it('should reject incorrect target URL', function (done) {
      Link.create({
        target: 'incorrectlink',
        shorturl: 'iWuh2',
        active: true
      }).exec(function(err,link) {
        err.should.exist;
        err.invalidAttributes.should.exist;
        err.invalidAttributes.target[0].message.should.match(/"url" validation rule failed/);
        done();
      });
    });

    it('should not generate a shorturl if the shortlink is specified', function (done) {
      Link.create({
        target: 'http://www.google.fr',
        shorturl: 'X85fW',
        active: true
      }).exec(function(err,link) {
        if(err)
          throw err;

        link.shorturl.should.match(/X85fW/);
        done();
      });
    });

    it('should generate a shorturl if the shortlink is not specified', function (done) {
      Link.create({
        target: 'http://www.google.fr',
        shorturl: null,
        active: true
      }).exec(function(err,link) {
        if(err)
          throw err;

        link.shorturl.should.match(/[a-fA-F0-9]{4}/);
        done();
      });
    });
  });

});
