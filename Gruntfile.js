module.exports = function(grunt) {

// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		// CONFIG

		// sass: {
		// 	dist: {
		// 		options: {
		// 			style: 'expanded'
		// 		},
		// 		files: {
		// 			'main.css': 'main.scss'
		// 		}
		// 	}
		// },

		compass: {
			dist: {
				options: {
					// config: 'html/user_data/packages/default/sass/config.rb',
					sassDir: '.',
					cssDir: '.',
					environment: 'production',
					outputStyle: 'expanded'
				}
			} 
		},

	 autoprefixer: {
			options: {
				browsers: ['last 2 version']
			},
			build: {
				src: 'main.css'
			},
		},

		// cssmin: {
		// 	build: {
		// 		files: {
		// 			'build/dist/style.css': ['build/dev/*.css']
		// 		}
		// 	}
		// },

		watch: {
			stylesheets: {
				files: 'main.scss',
				tasks: [ 'default' ]
			}
		}
	 
	});

// DEPENDENT PLUGINS

	// grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	// grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-autoprefixer');

// TASKS

	grunt.registerTask(
		'default', 
		[ 'compass', 'autoprefixer', 'watch' ] // 'cssmin', 
	);

};
