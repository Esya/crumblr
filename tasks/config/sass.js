module.exports = function(grunt) {

  grunt.config.set('sass', {
    dev: {
      files: [{
        expand: true,
        cwd: 'assets/styles/',
        src: ['importer.scss'],
        dest: '.tmp/public/styles/',
        ext: '.css'
      }],
      options: {
        loadPath: [
        'bower_components/bootstrap-sass/assets/stylesheets'
        ]
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
};
