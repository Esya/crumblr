module.exports = function (grunt) {
	grunt.registerTask('compileAssets', [
		'clean:dev',
        'bower:install',
		'sass:dev',
		'copy:dev'
	]);
};
