module.exports = function (grunt) {

    // load tasks
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-svgmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-stylestats');
    grunt.loadNpmTasks('grunt-fontsmith');
    grunt.loadNpmTasks('grunt-env');

    // register tasks
    grunt.registerTask('default', ['concat', 'sass:dev', 'watch']);
    grunt.registerTask('icons', ['env:build', 'font']);
    grunt.registerTask('copydeps', ['copy']);
    grunt.registerTask('stats', ['stylestats']);
    grunt.registerTask('prod', ['sass:dist', 'concat', 'uglify', 'imagemin', 'svgmin', 'stylestats' ]);

    grunt.initConfig({

        copy: {
            main: {
                files: [
                    { expand: true, cwd: 'bower_components/', src: ['**/*.js'], dest: 'assets/js/vendor/' },
                    { expand: true, cwd: 'bower_components/', src: ['**/*.scss'], dest: 'assets/scss/vendor/' },
                    { expand: true, cwd: 'bower_components/', src: ['**/*.css'], dest: 'assets/scss/vendor/' }
                ]
            }
        },

        uglify: {
            dist: {
                files: {
                    'assets/js/prod.js': ['assets/js/dev.js']
                }
            }
        },

        concat: {
            options: {
                separator: ''
            },
            dist: {
                src: [
                    'assets/js/plugins.js',
                    'assets/js/classes/*.js',
                    'assets/js/main.js'
                ],
                dest: 'assets/js/dev.js'
            }
        },

        font: {
            all: {
                src: ['assets/icons/*.svg'],
                destCss: 'assets/scss/site/type/_icons.scss',
                destFonts: 'assets/css/fonts/icons.{svg,woff,eot,ttf}',
                fontFamily: 'icons',
                cssRouter: function (fontpath) {
                    return "./fonts/icons." + fontpath.substring(fontpath.lastIndexOf(".") + 1);
                }
            }
        },

        imagemin: {
            files: {
                expand: true,
                cwd: 'assets/img/',
                src: ['**/*.{png,gif,jpg}'],
                dest: 'assets/img/'
            }
        },

        svgmin: {
            options: {
                plugins: [
                    {
                        removeViewBox: false
                    }
                ]
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'assets/img/',
                        src: ['**/*.svg'],
                        dest: 'assets/img/'
                    }
                ]
            }
        },

        sass: {
            dist: {
                options: {
                    loadPath: require('node-bourbon').includePaths,
                    require: 'sass-globbing'
                },
                files: {
                    'assets/css/prod.css': 'assets/scss/main.scss'
                }
            },
            dev: {
                options: {
                    loadPath: require('node-bourbon').includePaths,
                    require: 'sass-globbing',
                    lineNumbers: true
                },
                files: {
                    'assets/css/dev.css': 'assets/scss/main.scss'
                }
            }
        },

        watch: {
            css: {
                files: "assets/scss/**/*.scss",
                tasks: ['sass:dev']
            },
            js: {
                files: [
                    'assets/js/plugins.js',
                    'assets/js/classes/*.js',
                    'assets/js/main.js'
                ],
                tasks: ['concat']
            }
        },

        stylestats: {
            src: ['assets/css/prod.css']
        },

        env: {
            build: {
                concat: {
                    PATH: {
                        'value': 'node_modules/.bin',
                        'delimiter': ':'
                    }
                }
            }
        }

    });

};
