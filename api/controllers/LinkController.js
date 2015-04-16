/**
 * LinkController
 *
 * @description :: Server-side logic for managing links
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  redirect: function(req,res, next) {
    var shorturl = req.params.shorturl;
    Link.findOne({ shorturl: shorturl, active: true }, function(err,link) {
      if(err) {
        sails.error(err);
        res.end(500);
      } else if(!link) {
        next();
      } else {
        link.hits.add({ip: req.ip});
        link.save(function(err,link) {
          if(err) {
            return sails.log.error(err);
          }
          res.redirect(link.target);
        });
      }
    })
  }
};

