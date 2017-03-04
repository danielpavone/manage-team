module.exports = function (grunt) {
	'use strict';

	grunt.config('clean', {
	    build: [
            'app/'
        ]
	});
	grunt.loadNpmTasks('grunt-contrib-clean');
};