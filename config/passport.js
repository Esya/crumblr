/**
 * Passport configuration
 *
 * This is the configuration for your Passport.js setup and where you
 * define the authentication strategies you want your application to employ.
 *
 * I have tested the service with all of the providers listed below - if you
 * come across a provider that for some reason doesn't work, feel free to open
 * an issue on GitHub.
 *
 * Also, authentication scopes can be set through the `scope` property.
 *
 * For more information on the available providers, check out:
 * http://passportjs.org/guide/providers/
 */

module.exports.passport = {
  local: {
    strategy: require('passport-local').Strategy
  },

  bearer: {
    strategy: require('passport-http-bearer').Strategy
  },

  github: {
    name: 'GitHub',
    protocol: 'oauth2',
    strategy: require('passport-github').Strategy,
    options: {
      clientID: '3855730c736a83e496df',
      clientSecret: '6fa45fc1066dbd30bcf5487af90352440769b9b5'
    }
  },

};
