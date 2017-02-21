module.exports = function(grunt) {
    'use strict';

    grunt.loadTasks('tasks/');

    grunt.registerTask('start', [
        'clean:build',
        'dev'
    ]);

    grunt.registerTask('dev', [
        'copy:hapi',
        'hapi:async',
        'watch'
    ]);
};