module.exports = function (grunt) {
    'use strict';
    grunt.config('watch', {
        hapi: {
            files: ['src/**/*.*', '!assets/**/*.js'],
            tasks: ['copy:hapi', 'hapi:async'],
            options: {
                nospawn: true
            }
        },
    });
    grunt.loadNpmTasks('grunt-contrib-watch');
};