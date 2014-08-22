module.exports = function( grunt ) {

  // load tasks
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-svgmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-stylestats');
	grunt.loadNpmTasks('grunt-webfont');
	
  grunt.initConfig({

    copy: {
      main: {
        files: [ 
          { expand: true, cwd: 'bower_components/',src: [ '**/*.js' ], dest: 'assets/js/vendor/' },
          { expand: true, cwd: 'bower_components/',src: [ '**/*.scss' ], dest: 'assets/sass/vendor/' },
          { expand: true, cwd: 'bower_components/',src: [ '**/*.css' ], dest: 'assets/sass/vendor/' }, 
        ]
      },
    },
    // concatenation and minification all in one
    uglify: {
      dist: {
        files: {
          'assets/js/prod.js': [ 'assets/js/dev.js' ]
        }
      },
    },
          
    // concatenation
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
  		
  	// build icon font
  	webfont: {
  		icons: {
  			src: 'assets/icons/*.svg',
  			dest: 'assets/css/fonts',
  			destCss: 'assets/sass/type/',
  			options: {
  				font: 'icons',
  				hashes: false,
  				htmlDemo: false,
  				stylesheet: 'scss',
  				styles: 'font,icon',
  				template: 'assets/icons/icon-template.css',
  				relativeFontPath: 'fonts/'
  			}
  		}
  	},
  		
    // Imagemin
    imagemin: {
      files: {
        expand: true, 
        cwd: 'assets/img/',
        src: [ '**/*.{png,gif,jpg}' ],
        dest: 'assets/img/'
      }
    },

    // SVG Min
    svgmin: {
      options: {
        plugins: [{
          removeViewBox: false
        }]
      },
      dist: {
        files: [{
          expand: true, 
          cwd: 'assets/img/',
          src: [ '**/*.svg' ],
          dest: 'assets/img/'
        }]
      }
    },

		sass: {
			dist: {
				options: {
					loadPath: require('node-bourbon').includePaths,
					require: 'sass-globbing'
				},
				files: {
					'assets/css/main.css': 'assets/scss/main.scss'
				}
			}
		},

    // watch our project for changes
    watch: {
				css: {
					files: "assets/scss/main.scss",
					tasks: ['sass']
				},
      js: {
        files: [
          'assets/js/plugins.js',
          'assets/js/classes/*.js', 
          'assets/js/main.dev.js'
        ],
        tasks: ['concat']
      }
    },

    stylestats: {
      src: [ 'assets/css/main.css' ]
    }
  
  });

  grunt.registerTask('default', ['concat', 'watch']);
  grunt.registerTask('icons', ['webfont']);
	grunt.registerTask('copydeps', ['copy']);
	grunt.registerTask('stats', ['stylestats']);
  grunt.registerTask('prod', ['sass:dist', 'concat', 'uglify', 'imagemin', 'svgmin', 'stylestats' ]);

};
