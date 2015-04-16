/**
* Link.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  attributes: {
    'active'  : {
      type:       'boolean',
      required:   true,
      defaultsTo: true
    },
    'target'  : {
      type:       'string',
      required:   true,
      url:        true,
    },
    'shorturl': {
      type:       'string',
      required:   false
    },
    hits: {
      collection: 'hit',
      via: 'link'
    }
  },
  beforeCreate: function(values, next) {
    if(!values.shorturl) {
      require('crypto').randomBytes(2, function(ex, buf) {
        values.shorturl = buf.toString('hex');
        return next();
      });
    } else {
      return next();
    }
  }
};

