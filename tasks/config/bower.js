/**
 * Install bower components.
 *
 * ---------------------------------------------------------------
 *
 * Installs bower components and copies the required files into the assets folder structure.
 *
 */

 module.exports = function(grunt) {

  grunt.config.set('bower', {
    install: {
      dest: 'assets/vendor',
      js_dest: 'assets/vendor/js',
      // scss_dest: 'assets/styles/vendor',
      // fonts_dest: 'assets/vendor/fonts/', //covers font types ['svg','eot', 'ttf', 'woff', 'woff2', 'otf']
      options: {
        keepExpandedHierarchy: false,
        ignorePackages: ['bootstrap-sass']
      }
    }

  });

  grunt.loadNpmTasks('grunt-bower');
};
