'use strict';

var webpack = require('webpack');

module.exports = function (grunt) {

    grunt.initConfig({
        watch: {
            options: {
                livereload: true
            },
            frontend: {
                files: [
                    'css/{,**/}*.css',
                    'images/{,**/}*',
                    'js/*bundle.js'
                ]
            },
            js: {
                files: [
                    'js/src/{,**/}*.js'
                ],
                tasks: ['webpack:local'],
                livereload: false
            },
            sass: {
                files: ['scss/{,**/}*.scss'],
                tasks: ['sass:local', 'postcss:local'],
                options: {
                    livereload: false
                }
            },
            handlebars: {
                files: [
                    'hbs/{,**/}*.hbs'
                ],
                tasks: ['handlebars:compile']
            }
        },
        sass: {
            options: {
                sourceMap: true,
                includePaths: [
                    'scss'
                ]
            },
            local: {
                outputStyle: 'nested',
                files: {
                    'css/style.css': 'scss/style.scss'
                }
            },
            dist: {
                outputStyle: 'compressed',
                files: {
                    'css/styles.css': 'scss/styles.scss'
                }
            }
        },
        postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer-core')({
                        browsers: 'last 3 version',
                        remove: 'false'
                    })
                ]
            },
            dist: {
                src: 'css/*.css',
                options: {
                    processors: [
                        require('autoprefixer-core')({
                            browsers: 'last 3 version',
                            remove: 'false'
                        }),
                        require('csswring')
                    ]
                }
            },
            local: {
                src: 'css/*.css'
            }
        },
        webpack: {
            options: {
                context: __dirname + '/js/src',
                entry: 'index.js',
                resolve: {
                    root: [
                        __dirname + '/js/src',
                        __dirname + '/js/vendor'
                    ],
                    alias: {
                        handlebars: __dirname + '/js/vendor/handlebars.runtime.min.js'  
                    }
                },
                output: {
                    filename: 'js/main.js'
                }
            },
            local: {
                devtool: 'source-map'
            },
            dist: {
                plugins: [
                    new webpack.optimize.UglifyJsPlugin()
                ]
            }
        },
        handlebars: {
            options: {
                amd: true,
                processName: function (filePath) {
                    return filePath.replace(/hbs\/(.*?).hbs/, '$1');
                }
            },
            compile: {
                files: {
                    'js/src/templates.js': [
                        'hbs/{,**/}*.hbs'
                    ]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-handlebars');

    grunt.task.registerTask('default', ['sass:local', 'postcss:local', 'webpack:local', 'watch']);
};
