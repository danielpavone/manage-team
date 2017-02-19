module.exports = function(grunt){
    'use strict';

    grunt.config('copy', {
        hapi: {
            files: [{
                expand: true,
                cwd: 'src/',
                src: ['**/**/*.*', '!assets/**/*.*'],
                dest: 'app/'
            }]
        }
    });
    grunt.loadNpmTasks('grunt-contrib-copy');
};