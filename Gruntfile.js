module.exports = function (grunt) {
    'use strict';

    require('load-grunt-tasks')(grunt);

    var files = [
        'templates/render.js'
    ];

    grunt.initConfig({
        jshint: {
            files: files
        },
        jscs: {
            src: files,
            options: {
                config: '.jscsrc'
            }

        },
        jscoverage: {
            render: {
                expand: true,
                cwd: 'templates/',
                src: 'render.js',
                dest: 'cov/',
                ext: '.js'
            }
        },
        mochacov: {
            html: {
                options: {
                    reporter: 'html-cov',
                    require: ['should'],
                    output: 'cov.html'
                }
            },
            cov: {
                options: {
                    require: ['should'],
                    coveralls: true
                }
            },
            test: {
                options: {
                    reporter: 'dot',
                    require: ['should']
                }
            }
        }
    });

    grunt.registerTask('test', ['jshint', 'jscs', 'jscoverage', 'mochacov:test']);
    grunt.registerTask('html', ['mochacov:html']);
    grunt.registerTask('travis', ['test', 'mochacov:cov']);
    grunt.registerTask('default', ['test']);
};
