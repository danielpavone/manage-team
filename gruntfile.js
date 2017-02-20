module.exports = function(grunt) {
    'use strict';

    grunt.loadTasks('tasks/');

    grunt.registerTask('dev', [
        'clean:build',
        'copy:hapi',
        'hapi:async',
        'watch'
    ]);
};