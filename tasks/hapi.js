module.exports = function(grunt) {
    'use strict';
    var resolve = require('path').resolve;

    grunt.config('hapi', {
        async: {
            options: {
                server: resolve('./index')
            }
        }
    });
    grunt.loadNpmTasks('grunt-hapi');
};