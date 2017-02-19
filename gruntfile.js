module.exports = function(grunt) {
    'use strict';

    grunt.loadTasks('tasks/');

    grunt.registerTask('dev', [
        'copy:hapi',
        'hapi:async',
        'watch'
    ]);
};