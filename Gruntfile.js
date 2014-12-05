module.exports = function (grunt) {
    'use strict';

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        jshint: {
            files: ['gruntfile.js', 'src/**/*.js', 'test/**/*.js', 'cli/**/*.js']
        },
        concat: {
            lib: {
                src: 'src/**/*.js',
                dest: 'publish.js'
            }
        },
        jscs: {
            src: ['gruntfile.js', 'src/**/*.js', 'test/**/*.js', 'cli/**/*.js'],
            options: {
                config: '.jscsrc'
            }

        }
    });

    grunt.registerTask('test', ['jshint', 'jscs']);
    grunt.registerTask('default', ['test', 'concat']);
};
